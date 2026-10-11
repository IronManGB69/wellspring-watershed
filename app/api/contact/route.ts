import { NextRequest, NextResponse } from "next/server";
import {
  createHmac,
  randomBytes,
  timingSafeEqual,
  createHash,
} from "node:crypto";
export const runtime = "nodejs";
const devSecret = randomBytes(32).toString("hex");
const buckets = new Map<string, { count: number; reset: number }>();
const topics: Record<string, string> = {
  general: "General enquiry",
  "strategic-communications": "Public relations & strategic communications",
  "multi-agency-partnership": "Multi-agency partnership",
  "multi-agency-liaison": "Multi-agency liaison",
  "community-engagement": "Community integration & safeguarding",
  "crisis-reputation": "24/7 crisis response & sentiment monitoring",
  "public-consultation": "Statutory public consultation",
  partnership: "Partnership opportunity",
  policy: "Policies, privacy or accessibility",
};
const roles = [
  "Resident or community member",
  "Public body or local authority",
  "Healthcare or social care partner",
  "Infrastructure or development partner",
  "Other organisation or individual",
];
function secret() {
  return (
    process.env.CONTACT_FORM_SECRET ||
    (process.env.NODE_ENV !== "production" ? devSecret : "")
  );
}
function error(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}
function validToken(token: string) {
  if (!secret() || token.length > 300) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !/^[a-f0-9]{64}$/.test(signature)) return false;
  const expected = Buffer.from(sign(payload), "hex");
  const actual = Buffer.from(signature, "hex");
  if (!timingSafeEqual(expected, actual)) return false;
  const issued = Number(payload.split("-")[0]);
  const age = Date.now() - issued;
  return Number.isFinite(issued) && age >= 0 && age < 30 * 60 * 1000;
}
function limited(key: string) {
  const now = Date.now();
  for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
  if (buckets.size > 5000) return true;
  const b = buckets.get(key) || { count: 0, reset: now + 15 * 60 * 1000 };
  b.count++;
  buckets.set(key, b);
  return b.count > 5;
}
export async function GET() {
  if (!secret())
    return error(
      "The form is temporarily unavailable. Please contact us by email.",
      503,
    );
  const payload = `${Date.now()}-${randomBytes(16).toString("hex")}`;
  return NextResponse.json(
    { token: `${payload}.${sign(payload)}` },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  let sameOrigin = false;
  try {
    const incoming = new URL(origin || "");
    sameOrigin = process.env.NEXT_PUBLIC_SITE_URL
      ? incoming.origin === new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
      : incoming.host ===
        (request.headers.get("host") || new URL(request.url).host);
  } catch {
    return error("Please send your enquiry from our contact page.", 403);
  }
  if (!sameOrigin)
    return error("Please send your enquiry from our contact page.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return error("Unsupported request format.", 415);
  if (Number(request.headers.get("content-length") || 0) > 24000)
    return error("Your enquiry is too long.", 413);
  let data: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return error("Please complete the contact form.", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) {
        await reader.cancel();
        return error("Your enquiry is too long.", 413);
      }
      chunks.push(value);
    }
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return error("Please complete the contact form.", 400);
    data = parsed;
  } catch {
    return error("Please complete the contact form and try again.", 400);
  }
  if (typeof data.token !== "string" || !validToken(data.token))
    return error(
      "Your form session has expired. Please try sending again.",
      403,
    );
  if (data.website)
    return error(
      "Your enquiry could not be sent. Please email us directly.",
      400,
    );
  const str = (key: string) =>
    typeof data[key] === "string" ? (data[key] as string).trim() : "";
  const name = str("name"),
    email = str("email"),
    organisation = str("organisation"),
    message = str("message"),
    topic = str("topic"),
    role = str("role");
  if (
    !name ||
    name.length > 120 ||
    /[\r\n]/.test(name) ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    organisation.length > 160 ||
    message.length < 20 ||
    message.length > 5000 ||
    !Object.hasOwn(topics, topic) ||
    !roles.includes(role) ||
    data.consent !== "yes"
  )
    return error(
      "Please check all required fields and enter a valid email address and message.",
      400,
    );
  const client =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const emailKey = createHash("sha256")
    .update(`email:${email.toLowerCase()}`)
    .digest("hex");
  const ipKey = createHash("sha256").update(`ip:${client}`).digest("hex");
  if (limited(emailKey) || limited(ipKey))
    return error(
      "You’ve made several enquiries recently. Please wait a little before trying again, or email us directly.",
      429,
    );
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL)
    return error(
      "Your enquiry has not been sent because the form is temporarily unavailable.",
      503,
    );
  const idempotency = createHash("sha256")
    .update(
      `${data.token}:${JSON.stringify({ name, email, organisation, message, topic, role })}`,
    )
    .digest("hex");
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotency,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [
          process.env.CONTACT_TO_EMAIL || "contact@wellspring-watershed.com",
        ],
        reply_to: email,
        subject: `Website enquiry: ${topics[topic]}`,
        text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\nOrganisation: ${organisation || "Not provided"}\nEnquiring as: ${role}\nTopic: ${topics[topic]}\n\n${message}\n\nThe sender agreed to use of these details to respond to this enquiry.`,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!result.ok)
      return error(
        "We couldn’t send your enquiry just now. Please try again later or email us directly.",
        502,
      );
    const confirmation = await result.json();
    if (!confirmation.id)
      return error(
        "We couldn’t confirm your enquiry was sent. Please contact us by email.",
        502,
      );
    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return error(
      "We couldn’t confirm delivery. Please try again later or email us directly.",
      502,
    );
  }
}
