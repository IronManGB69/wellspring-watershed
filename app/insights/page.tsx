import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ContactCTA } from "@/components/Footer";
import { articles } from "@/lib/content";
export const metadata: Metadata = {
  title: "News & insights",
  description:
    "Perspectives on community engagement, shared accountability and clear communication from Wellspring & Watershed.",
};
export default function Insights() {
  return (
    <>
      <PageHero
        eyebrow="NEWS & INSIGHTS"
        title={
          <>
            Ideas for
            <br />
            <em>common ground.</em>
          </>
        }
        description="Perspectives on the conversations, relationships and practical choices that help communities and institutions move forward together."
      />
      <section className="section">
        <div className="container insight-grid">
          {articles.map((a) => (
            <Link
              className="insight-card"
              key={a.slug}
              href={`/insights/${a.slug}`}
            >
              <img src={`/images/${a.image}`} alt={a.alt} />
              <span className="eyebrow">
                {a.category.toUpperCase()} · {a.minutes} MIN READ
              </span>
              <h2>{a.title}</h2>
              <p>{a.summary}</p>
              <span className="text-link">Read perspective</span>
            </Link>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
