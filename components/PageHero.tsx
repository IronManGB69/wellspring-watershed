import Link from "next/link";
import FlowLines from "./FlowLines";
export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="page-hero">
      <FlowLines className="page-flow" />
      <div className="container">
        {breadcrumb && (
          <div className="breadcrumbs">
            <Link href="/expertise">Our expertise</Link>
            <span>/</span>
            <span>{breadcrumb}</span>
          </div>
        )}
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p className="lead">{description}</p>}
      </div>
    </section>
  );
}
