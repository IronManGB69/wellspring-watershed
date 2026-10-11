import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import { ContactCTA } from "@/components/Footer";
import { services } from "@/lib/content";
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return { title: s?.title, description: s?.intro };
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageHero
        eyebrow={s.kicker}
        breadcrumb={s.title}
        title={s.headline}
        description={s.intro}
      />
      <section className="section">
        <div className="container service-details">
          <aside className="service-aside" aria-label="Other services">
            {services.map((item) => (
              <Link
                key={item.slug}
                href={`/expertise/${item.slug}`}
                aria-current={item.slug === slug ? "page" : undefined}
              >
                {item.title}
              </Link>
            ))}
          </aside>
          <div className="service-detail">
            <div className="prose">
              <h2>A connected approach.</h2>
              <p>{s.body}</p>
              <h2>How we work</h2>
              <p>{s.approach}</p>
            </div>
            <div className="deliverable-grid">
              {s.items.map(([title, copy]) => (
                <div className="deliverable" key={title}>
                  <Check strokeWidth={1.5} />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
            <div className="prose">
              <h2>What we work towards</h2>
              <p>{s.outcome}</p>
              {slug === "crisis-reputation" && (
                <p>
                  This contact hub is for enquiries about our services. It is
                  not an emergency response channel. If there is an immediate
                  danger to life, contact the emergency services.
                </p>
              )}
              <Link href={`/contact?topic=${slug}`}>
                Discuss your challenge with us
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
