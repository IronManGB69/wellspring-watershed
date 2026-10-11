import Link from "next/link";
export default function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">PAGE NOT FOUND</span>
      <h1>Let’s reconnect.</h1>
      <p>We couldn’t find that page. There’s a way forward from here.</p>
      <Link href="/" className="button">
        Return to the homepage
      </Link>
    </section>
  );
}
