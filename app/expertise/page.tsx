import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ContactCTA } from "@/components/Footer";
import { services } from "@/lib/content";
export const metadata: Metadata = {
  title: "Our expertise",
  description:
    "Public relations, community integration and safeguarding, multi-agency liaison and partnership, statutory consultation and 24/7 crisis response.",
};
export default function Expertise() {
  return (
    <>
      <PageHero
        eyebrow="OUR EXPERTISE"
        title={
          <>
            Complexity, met
            <br />
            with <em>clarity.</em>
          </>
        }
        description="Six connected areas of expertise. From frontline community engagement to statutory consultation and round-the-clock crisis response, we bring clarity to complex relationships."
      />
      <section className="section">
        <div className="container full-services">
          {services.map((s, i) => (
            <Link
              className="full-service"
              key={s.slug}
              href={`/expertise/${s.slug}`}
            >
              <div className="full-service-top">
                <s.icon size={37} strokeWidth={1.2} />
                <span>0{i + 1}</span>
              </div>
              <h2>{s.title}</h2>
              <p>{s.intro}</p>
              <span className="text-link">Explore our approach</span>
            </Link>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
