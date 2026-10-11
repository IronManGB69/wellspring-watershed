import Link from "next/link";
import { ArrowUpRight, Landmark, HeartHandshake, Building2, ShieldCheck } from "lucide-react";
import { ContactCTA } from "@/components/Footer";
import ConnectionAtlas from "@/components/ConnectionAtlas";
import FlowLines from "@/components/FlowLines";
import HeroVideo from "@/components/HeroVideo";
import { services, sectors, articles } from "@/lib/content";

const sectorIcons = [Landmark, HeartHandshake, Building2, ShieldCheck];
const sectorDescriptions = [
  "Bringing residents, councils and partners into a clearer, more constructive conversation.",
  "Connecting services and communities through coordinated relationships and shared understanding.",
  "Making community voices part of the conversation, from early consultation to delivery.",
  "Helping communities and agencies build trust, address concerns and respond together.",
];

export default function Home() {
  return <div className="home-v2">
    <section className="opening-hero">
      <div className="container opening-grid">
        <div className="opening-copy">
          <span className="eyebrow">TURNING POINTS FOR BETTER RELATIONS</span>
          <h1>Progress<br />starts with<br /><em>people.</em></h1>
          <p>Public relations. Community relations.<br />A shared way through complex challenges.</p>
          <div className="opening-actions"><Link href="/contact" className="button">Let’s talk <ArrowUpRight size={19} /></Link><Link href="#connections" className="opening-work-link">Explore our work <span>↓</span></Link></div>
        </div>
        <div className="opening-visual">
          <HeroVideo />
          <div className="opening-photo-note"><span>PEOPLE AT THE HEART OF WHAT WE DO.</span><span>W&amp;W ↗</span></div>
        </div>
      </div>
    </section>

    <section className="purpose-bridge" id="our-purpose">
      <div className="container">
        <div className="purpose-bridge-heading" data-reveal><div><span className="eyebrow">01 / WHAT BRINGS US TOGETHER</span><h2>Better understanding.<br /><em>Real-world progress.</em></h2></div><p>We help communities, public bodies and partners build trust, navigate complexity and act together. Connecting people is where the work begins. Moving forward together is what makes it matter.</p></div>
        <div className="purpose-paths" aria-hidden="true"><svg viewBox="0 0 1200 90" fill="none" preserveAspectRatio="none"><path d="M0 45H250C320 45 335 12 400 12H640C710 12 735 72 800 72H1200" /><path d="M0 55H250C320 55 335 22 400 22H640C710 22 735 82 800 82H1200" /><circle cx="48" cy="45" r="5" /><circle cx="438" cy="12" r="5" /><circle cx="835" cy="72" r="5" /></svg></div>
        <div className="purpose-pillars" data-reveal>
          <div><span>WITH COMMUNITIES</span><h3>Every voice<br />has a place.</h3><p>Frontline engagement, safeguarding and inclusive advocacy that help people participate with confidence.</p></div>
          <div><span>ACROSS ORGANISATIONS</span><h3>Shared purpose.<br />Connected action.</h3><p>Multi-agency liaison and partnerships that bring institutions and resident communities together.</p></div>
          <div><span>THROUGH CRITICAL MOMENTS</span><h3>Clear thinking.<br />Steady relationships.</h3><p>Strategic communications, statutory consultation and 24/7 crisis response when clarity matters most.</p></div>
        </div>
        <Link href="/about" className="purpose-about-link">The thinking behind our work <ArrowUpRight size={18} /></Link>
      </div>
    </section>

    <ConnectionAtlas services={services.map(({ slug, title, label, summary, kicker }) => ({ slug, title, label, summary, kicker }))} />

    <section className="fieldwork-section">
      <div className="fieldwork-photo"><img src="/images/community.webp" alt="A facilitator listening to a group in conversation" loading="lazy" /><div className="fieldwork-caption"><span>IN THE ROOM.<br />ON THE GROUND.</span><span>Every voice<br />changes the conversation.</span></div><div className="photo-frame" aria-hidden="true" /></div>
      <div className="fieldwork-copy" data-reveal><span className="eyebrow">03 / FROM UNDERSTANDING TO ACTION</span><h2>Listen deeply.<br />Connect <em>meaningfully.</em><br />Move forward.</h2><p>Lasting change takes more than a message. It takes a way of working that makes people part of the process.</p><div className="fieldwork-steps">{[
        ['01', 'Listen with intention', 'Understand the people, the place and the challenge. Make room for voices that are too often unheard.'],
        ['02', 'Connect with purpose', 'Bring communities and agencies into the same conversation, with clear responsibilities and shared priorities.'],
        ['03', 'Turn dialogue into action', 'Support inclusive participation, practical coordination and accountable progress.'],
      ].map(([n, title, copy]) => <details key={n} name="approach" open={n === '01'}><summary><span>{n}</span><h3>{title}</h3><span className="step-toggle">+</span></summary><p>{copy}</p></details>)}</div><Link href="/expertise/community-engagement" className="arrow-link">Our work with communities <span><ArrowUpRight size={19} /></span></Link></div>
    </section>

    <section className="section sector-editorial" aria-labelledby="sector-heading">
      <div className="container">
        <div className="chapter-heading"><span>04 / WHO WE WORK WITH</span><span>DIFFERENT PERSPECTIVES. SHARED PROGRESS.</span></div>
        <div className="sector-editorial-heading" data-reveal>
          <h2 id="sector-heading">Different worlds.<br /><em>Common ground.</em></h2>
          <p>We bring people and organisations closer — connecting public priorities with the everyday experiences of the communities they serve.</p>
        </div>
        <div className="sector-cards">
          {sectors.map((s, i) => {
            const Icon = sectorIcons[i];
            return <Link href={`/sectors#${s.id}`} key={s.id} className="sector-card" data-reveal>
              <div className="sector-card-top"><span className="sector-card-icon"><Icon size={28} strokeWidth={1.3} aria-hidden="true" /></span><span className="sector-card-number">0{i + 1} /</span></div>
              <h3>{s.title}</h3>
              <p>{sectorDescriptions[i]}</p>
              <div className="sector-card-tags">{s.tags.slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="sector-card-bottom"><span>Explore our work</span><ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" /></div>
            </Link>;
          })}
        </div>
        <div className="sector-shared"><span className="sector-shared-dot" aria-hidden="true" /><p>Different responsibilities. One shared need for trust.</p><Link href="/sectors">See all sectors <ArrowUpRight size={17} /></Link></div>
      </div>
    </section>

    <section className="crisis-feature" aria-labelledby="crisis-heading">
      <FlowLines className="crisis-flow" />
      <div className="container crisis-layout">
        <div className="crisis-clock" role="img" aria-label="24 hours a day, seven days a week"><div className="clock-orbit orbit-one" /><div className="clock-orbit orbit-two" /><span>24<span>/</span>7</span><small>EVERY HOUR. EVERY DAY.</small><span className="clock-point" /></div>
        <div className="crisis-copy" data-reveal><span className="eyebrow"><span className="signal-dot" />OUR DEDICATED RAPID-RESPONSE DESK</span><h2 id="crisis-heading">When the moment<br />can’t <em>wait.</em></h2><p>Media management. Incident de-escalation. Proactive risk mitigation. Real-time public sentiment analysis. A coordinated response, around the clock.</p><Link href="/expertise/crisis-reputation" className="arrow-link">Explore crisis response <span><ArrowUpRight size={21} /></span></Link></div>
      </div>
    </section>

    <section className="section perspectives-editorial">
      <div className="container">
        <div className="chapter-heading"><span>05 / PERSPECTIVES</span><Link href="/insights">ALL INSIGHTS <ArrowUpRight size={16} /></Link></div>
        <h2 data-reveal>A little perspective.<br /><em>A different possibility.</em></h2>
        <div className="perspective-grid">{articles.map((a, i) => <Link key={a.slug} href={`/insights/${a.slug}`} className={`perspective-card perspective-${i}`} data-reveal><div className="perspective-image"><img src={`/images/${a.image}`} alt={a.alt} loading="lazy" /><span className="perspective-arrow"><ArrowUpRight /></span><span className="perspective-index">0{i + 1}</span></div><div className="perspective-meta">{a.category}<span>{a.minutes} MIN READ</span></div><h3>{a.title}</h3></Link>)}</div>
      </div>
    </section>
    <ContactCTA />
  </div>;
}
