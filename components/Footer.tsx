import Link from "next/link";
import Brand, { Mark } from "./Brand";
export function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow">
            EVERY TURNING POINT STARTS WITH A CONVERSATION
          </span>
          <h2>
            Let’s find a way <em>forward.</em>
          </h2>
        </div>
        <Link className="button button-light" href="/contact">
          Start a conversation
        </Link>
        <Mark className="cta-mark" />
      </div>
    </section>
  );
}
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>Turning points for better relations.</p>
            <p className="company-registration">UK-registered private limited company<br />Company number 17469585</p>
          </div>
          <div className="footer-column">
            <span>EXPLORE</span>
            <Link href="/about">Our story</Link>
            <Link href="/expertise">Our expertise</Link>
            <Link href="/sectors">Who we work with</Link>
          </div>
          <div className="footer-column">
            <span>CONNECT</span>
            <Link href="/contact">Contact hub</Link>
            <a href="tel:+442080402838" aria-label="Call our landline on 020 8040 2838">020 8040 2838</a>
            <Link href="/insights">News &amp; insights</Link>
            <Link href="/policies">Policies &amp; standards</Link>
          </div>
          <div className="footer-note">
            Stronger relationships.
            <br />
            More connected communities.
            <br />
            <span>A shared way forward.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Wellspring &amp; Watershed.</span>
          <div>
            <Link href="/policies#privacy">Privacy</Link>
            <Link href="/policies#accessibility">Accessibility</Link>
            <span>Built around people.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
