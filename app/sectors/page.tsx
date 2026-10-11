import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ContactCTA } from "@/components/Footer";
import { sectors } from "@/lib/content";
export const metadata: Metadata = {
  title: "Who we work with",
  description:
    "Connecting communities with local authorities, healthcare and social care, infrastructure partners and community safety organisations.",
};
export default function Sectors() {
  return (
    <>
      <PageHero
        eyebrow="WHO WE WORK WITH"
        title={
          <>
            Different worlds.
            <br />
            <em>Common ground.</em>
          </>
        }
        description="We work where institutional responsibilities meet community experience. Every context is different; the need for trust and understanding is shared."
      />
      <section className="section">
        <div className="container">
          {sectors.map((s, i) => (
            <article className="sector-block" id={s.id} key={s.id}>
              <div>
                <span className="eyebrow">SECTOR 0{i + 1}</span>
                <h2>{s.title}</h2>
              </div>
              <div>
                <h3>{s.intro}</h3>
                <p style={{ marginTop: 22 }}>{s.copy}</p>
                <div className="sector-tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <Link className="text-link" href={`/expertise/${s.service}`}>
                  Explore how we can help
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
