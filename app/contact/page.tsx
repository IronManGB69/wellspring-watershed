import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
export const metadata: Metadata = {
  title: "Contact hub",
  description:
    "Discuss public relations, community integration, multi-agency partnerships, statutory consultation or our 24/7 crisis-response desk.",
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="CONTACT HUB"
        title={
          <>
            A conversation can
            <br />
            <em>change what’s next.</em>
          </>
        }
        description="Tell us what’s on your mind. Whether you’re a resident, a public body or a prospective partner, we’ll help you find the right starting point."
      />
      <section className="section">
        <div className="container contact-layout">
          <div className="contact-intro">
            <h2>
              Let’s find
              <br />
              common ground.
            </h2>
            <p>
              Share a little about your challenge, your community or the
              partnership you have in mind. Your enquiry will go directly to our
              team.
            </p>
            <div className="contact-details">
              <span>CALL OUR LANDLINE</span>
              <a href="tel:+442080402838">020 8040 2838</a>
            </div>
            <div className="contact-details">
              <span>PREFER TO EMAIL?</span>
              <a href="mailto:contact@wellspring-watershed.com">
                contact@wellspring-watershed.com
              </a>
            </div>
            <p className="contact-note">
              For enquiries about our dedicated 24/7 rapid-response desk, select
              crisis response below. This form is for service enquiries and does
              not replace crisis-escalation or emergency-service channels. If
              there is an immediate danger to life, contact the emergency services.
            </p>
          </div>
          <ContactForm initialTopic={topic} />
        </div>
      </section>
    </>
  );
}
