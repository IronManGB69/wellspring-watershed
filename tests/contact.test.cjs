const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const { NextRequest } = require("next/server");
const source = path.join(__dirname, "../app/api/contact/route.ts");
const compiled = ts.transpileModule(fs.readFileSync(source, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
function setup() {
  process.env.CONTACT_FORM_SECRET =
    "test-only-secret-with-at-least-32-characters";
  process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_FROM_EMAIL;
  const mod = new Module(source, module);
  mod.filename = source;
  mod.paths = module.paths;
  mod._compile(compiled, source);
  return mod.exports;
}
function request(data, origin = "http://localhost:3000") {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
async function payload(route) {
  const { token } = await (await route.GET()).json();
  return {
    token,
    name: "Test Sender",
    email: "sender@example.com",
    organisation: "Example organisation",
    role: "Public body or local authority",
    topic: "partnership",
    message: "A test enquiry about a proposed community partnership.",
    consent: "yes",
    website: "",
  };
}
test("rejects cross-origin requests before processing", async () => {
  const r = setup();
  const p = await payload(r);
  assert.equal(
    (await r.POST(request(p, "https://unrelated.example"))).status,
    403,
  );
});
test("rejects tampered tokens", async () => {
  const r = setup();
  const p = await payload(r);
  p.token += "x";
  assert.equal((await r.POST(request(p))).status, 403);
});
test("rejects malformed, missing-consent and spam-trap submissions", async () => {
  const r = setup();
  for (const patch of [
    { email: "invalid" },
    { message: "short" },
    { consent: "no" },
    { website: "spam.example" },
    { topic: "__proto__" },
  ]) {
    const p = { ...(await payload(r)), ...patch };
    assert.equal((await r.POST(request(p))).status, 400);
  }
});
test("rejects oversized bodies even without content-length", async () => {
  const r = setup();
  const p = await payload(r);
  p.message = "a".repeat(30000);
  assert.equal((await r.POST(request(p))).status, 413);
});
test("never claims success when email delivery is unconfigured", async () => {
  const r = setup();
  const response = await r.POST(request(await payload(r)));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, undefined);
});
test("sends to the configured recipient with reply-to and idempotency", async () => {
  const r = setup();
  process.env.RESEND_API_KEY = "test-key";
  process.env.CONTACT_FROM_EMAIL = "Website <website@example.com>";
  process.env.CONTACT_TO_EMAIL = "contact@wellspring-watershed.com";
  const original = global.fetch;
  let calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ id: "test-email-id" });
  };
  try {
    const p = await payload(r);
    assert.equal((await r.POST(request(p))).status, 200);
    assert.equal((await r.POST(request(p))).status, 200);
    const sent = JSON.parse(calls[0].options.body);
    assert.deepEqual(sent.to, ["contact@wellspring-watershed.com"]);
    assert.equal(sent.reply_to, p.email);
    assert.match(sent.text, /Test Sender/);
    assert.equal(calls[0].url, "https://api.resend.com/emails");
    assert.equal(
      calls[0].options.headers["Idempotency-Key"],
      calls[1].options.headers["Idempotency-Key"],
    );
    for (const [topic, label] of [
      ["strategic-communications", "Public relations & strategic communications"],
      ["multi-agency-partnership", "Multi-agency partnership"],
    ]) {
      const enquiry = { ...(await payload(r)), topic };
      assert.equal((await r.POST(request(enquiry))).status, 200);
      const additional = JSON.parse(calls.at(-1).options.body);
      assert.equal(additional.subject, `Website enquiry: ${label}`);
      assert.deepEqual(additional.to, ["contact@wellspring-watershed.com"]);
    }
  } finally {
    global.fetch = original;
  }
});
test("reports email-provider failure without exposing provider details", async () => {
  const r = setup();
  process.env.RESEND_API_KEY = "test-key";
  process.env.CONTACT_FROM_EMAIL = "website@example.com";
  const original = global.fetch;
  global.fetch = async () =>
    Response.json({ error: "private provider details" }, { status: 403 });
  try {
    const response = await r.POST(request(await payload(r)));
    assert.equal(response.status, 502);
    assert.doesNotMatch(
      JSON.stringify(await response.json()),
      /private provider/,
    );
  } finally {
    global.fetch = original;
  }
});
test("throttles repeated submissions within an instance", async () => {
  const r = setup();
  const p = await payload(r);
  for (let i = 0; i < 5; i++) await r.POST(request(p));
  assert.equal((await r.POST(request(p))).status, 429);
});

test("accepts the browser host when a local server binds to all interfaces", async () => {
  const r = setup();
  delete process.env.NEXT_PUBLIC_SITE_URL;
  const p = await payload(r);
  const req = new NextRequest("http://0.0.0.0:3000/api/contact", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
      host: "localhost:3000",
      "content-type": "application/json",
    },
    body: JSON.stringify(p),
  });
  assert.equal((await r.POST(req)).status, 503);
});
