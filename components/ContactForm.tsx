"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
export default function ContactForm({
  initialTopic = "general",
}: {
  initialTopic?: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  async function refreshToken() {
    try {
      const r = await fetch("/api/contact", { cache: "no-store" });
      const data = await r.json();
      if (r.ok) setToken(data.token);
    } catch {
      /* Retry on submit. */
    }
  }
  useEffect(() => {
    void refreshToken();
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      let sendToken = token;
      if (!sendToken) {
        const t = await fetch("/api/contact", { cache: "no-store" });
        const b = await t.json();
        if (!t.ok)
          throw new Error(
            b.error ||
              "The form is temporarily unavailable. Please email us directly.",
          );
        sendToken = b.token;
        setToken(sendToken);
      }
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token: sendToken }),
      });
      const result = await r.json();
      if (!r.ok)
        throw new Error(
          result.error ||
            "Your enquiry could not be sent. Please try again or email us directly.",
        );
      setStatus("success");
      setMessage(
        "Thank you. Your enquiry has been sent to Wellspring & Watershed. We’ll be in touch using the email address you provided.",
      );
      formRef.current?.reset();
      setToken("");
      void refreshToken();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Your enquiry could not be sent. Please try again.",
      );
      void refreshToken();
    }
  }
  const options = [
    ["general", "General enquiry"],
    ["strategic-communications", "Public relations & strategic communications"],
    ["multi-agency-partnership", "Multi-agency partnership"],
    ["multi-agency-liaison", "Multi-agency liaison"],
    ["community-engagement", "Community integration & safeguarding"],
    ["crisis-reputation", "24/7 crisis response & sentiment monitoring"],
    ["public-consultation", "Statutory public consultation"],
    ["partnership", "Partnership opportunity"],
    ["policy", "Policies, privacy or accessibility"],
  ];
  return (
    <form ref={formRef} className="contact-form" onSubmit={submit}>
      <div className="form-heading form-full">
        <div className="form-heading-icon"><MessageSquare size={23} strokeWidth={1.5} /></div>
        <div><span className="form-eyebrow">LET’S CONNECT</span><h2>Your next conversation</h2><p>A little context helps us bring the right people together.</p></div>
      </div>
      <div className="form-field">
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={120}
          placeholder="Full name"
        />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@organisation.com"
        />
      </div>
      <div className="form-field">
        <label htmlFor="organisation">
          Organisation <span>(optional)</span>
        </label>
        <input
          id="organisation"
          name="organisation"
          autoComplete="organization"
          maxLength={160}
          placeholder="Organisation or community group"
        />
      </div>
      <div className="form-field">
        <label htmlFor="role">I’m getting in touch as</label>
        <select id="role" name="role" required defaultValue="">
          <option value="" disabled>
            Please select
          </option>
          <option>Resident or community member</option>
          <option>Public body or local authority</option>
          <option>Healthcare or social care partner</option>
          <option>Infrastructure or development partner</option>
          <option>Other organisation or individual</option>
        </select>
      </div>
      <div className="form-field form-full">
        <label htmlFor="topic">What would you like to discuss?</label>
        <select
          id="topic"
          name="topic"
          defaultValue={
            options.some((o) => o[0] === initialTopic)
              ? initialTopic
              : "general"
          }
        >
          {options.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field form-full">
        <label htmlFor="message">Tell us a little about it</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          placeholder="What’s the challenge, opportunity or conversation you have in mind?"
          aria-describedby="message-help"
        />
        <span id="message-help" className="form-help">
          Please use at least 20 characters. Avoid sharing sensitive personal
          details or information about someone else.
        </span>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" autoComplete="off" tabIndex={-1} />
      </div>
      <label className="form-consent form-full">
        <input name="consent" type="checkbox" required value="yes" />
        <span>
          I have read the{" "}
          <Link href="/policies#privacy" target="_blank" rel="noopener noreferrer" aria-label="Privacy information (opens in a new tab)">privacy information</Link> and agree
          that Wellspring &amp; Watershed can use these details to respond to my
          enquiry.
        </span>
      </label>
      <div className="form-bottom form-full">
        <button
          className="button"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending your enquiry…" : "Send your enquiry"}
          <ArrowUpRight size={19} aria-hidden="true" />
        </button>
        <span>A good conversation starts here.</span>
      </div>
      <div className="form-full" aria-live="polite" aria-atomic="true">
        {message && (
          <div
            role={status === "error" ? "alert" : "status"}
            className={`form-status ${status === "error" ? "error" : ""}`}
          >
            {message}
            {status === "error" && (
              <>
                {" "}
                You can also email{" "}
                <a href="mailto:contact@wellspring-watershed.com">
                  contact@wellspring-watershed.com
                </a>
                .
              </>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
