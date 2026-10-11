import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
export const metadata: Metadata = {
  title: "Policies & standards",
  description:
    "Information about contacting Wellspring & Watershed, safeguarding, accessibility and our policy documents.",
};
export default function Policies() {
  return (
    <>
      <PageHero
        eyebrow="POLICIES & STANDARDS"
        title={
          <>
            Trust begins
            <br />
            with <em>openness.</em>
          </>
        }
        description="Information about using this website and working with Wellspring & Watershed. For project-specific policies or documentation, please get in touch."
      />
      <section className="section">
        <div className="container narrow policy-list">
          <details id="privacy" open>
            <summary>Privacy & enquiries</summary>
            <div className="policy-body">
              <p>
                The contact form asks for your name, email address, enquiry type
                and message. Your organisation is optional. These details are
                used to understand your enquiry and respond to you. Sending an
                enquiry does not subscribe you to marketing emails.
              </p>
              <p>
                When you submit the form, your details are passed to our email
                delivery provider and sent to the Wellspring &amp; Watershed
                contact inbox. The website also uses short-lived form tokens and
                request information to help prevent automated abuse. No enquiry
                database is maintained by this website.
              </p>
              <p>
                Please do not include sensitive personal information, case files
                or confidential details about other people. We can discuss an
                appropriate way to share further information where needed.
              </p>
              <p>
                For our full privacy notice, information about how long
                correspondence is kept, or a request relating to your
                information, email{" "}
                <a href="mailto:contact@wellspring-watershed.com">
                  contact@wellspring-watershed.com
                </a>
                .
              </p>
            </div>
          </details>
          <details id="safeguarding" open>
            <summary>Safeguarding</summary>
            <div className="policy-body">
              <p>
                Safeguarding is part of our structured frontline engagement
                programmes, alongside social cohesion, legal empowerment,
                neighbourhood governance and inclusive advocacy. Responsibilities,
                reporting routes and relevant policies are addressed with the
                organisations involved in each engagement.
              </p>
              <p>
                This website is not a safeguarding referral service or an
                emergency response channel. Where someone may be at immediate
                risk, contact the appropriate emergency or statutory service.
              </p>
              <p>
                <Link href="/contact?topic=policy">
                  Request our safeguarding documentation
                </Link>{" "}
                for a proposed partnership or commission.
              </p>
            </div>
          </details>
          <details id="accessibility" open>
            <summary>Accessibility</summary>
            <div className="policy-body">
              <p>
                This website is designed to support keyboard navigation,
                readable text, responsive layouts and reduced-motion
                preferences. Images include text alternatives where they convey
                meaning, and form fields have descriptive labels.
              </p>
              <p>
                If you experience a barrier, please tell us which page you were
                using and what made it difficult. You can contact us at{" "}
                <a href="mailto:contact@wellspring-watershed.com">
                  contact@wellspring-watershed.com
                </a>{" "}
                and ask for information in a different format.
              </p>
            </div>
          </details>
          <details id="cookies" open>
            <summary>Cookies & website technology</summary>
            <div className="policy-body">
              <p>
                This website does not use analytics, advertising cookies or
                third-party marketing trackers. Fonts and photographs are served
                as part of the website. The contact form uses a temporary token
                held in the page while you compose your enquiry.
              </p>
              <p>
                The hosting and email providers may process technical
                information needed to operate their services. Additional
                technologies should be reflected in this information before they
                are introduced.
              </p>
            </div>
          </details>
          <details id="compliance" open>
            <summary>Working together & documentation</summary>
            <div className="policy-body">
              <p>
                Wellspring &amp; Watershed is a UK-registered private limited
                company, company number 17469585. Our work spans public relations,
                community integration and safeguarding, multi-agency liaison and
                partnership, statutory public consultation and 24/7 crisis response.
                Our role, working arrangements and responsibilities are agreed
                for each engagement. Crisis communications and legal empowerment
                do not replace emergency services or individual legal advice.
              </p>
              <p>
                Partners can request relevant safeguarding, privacy and
                compliance documentation before starting work.{" "}
                <Link href="/contact?topic=policy">
                  Contact us to discuss your requirements.
                </Link>
              </p>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
