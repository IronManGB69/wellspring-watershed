import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/Footer";
import { articles } from "@/lib/content";
export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return { title: a?.title, description: a?.summary };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <>
      <article className="article">
        <header className="page-hero">
          <div className="container">
            <div className="breadcrumbs">
              <Link href="/insights">All insights</Link>
              <span>/</span>
              <span>Perspective</span>
            </div>
            <span className="eyebrow">{a.category.toUpperCase()}</span>
            <h1>{a.title}</h1>
            <div className="article-meta">
              <span>Wellspring &amp; Watershed</span>
              <span>{a.minutes} min read</span>
            </div>
          </div>
        </header>
        <div className="section article-section">
          <div className="container">
            <div className="prose narrow">
              <p className="article-intro">{a.intro}</p>
              {a.sections.map(([heading, copy]) => (
                <section key={heading}>
                  <h2>{heading}</h2>
                  <p>{copy}</p>
                </section>
              ))}
              <p style={{ marginTop: 40 }}>
                <Link href="/contact">
                  Let’s talk about what this means for your organisation.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </article>
      <ContactCTA />
    </>
  );
}
