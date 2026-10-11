"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Mark } from "./Brand";

type Service = { slug: string; title: string; label: string; summary: string; kicker: string };
const positions = [[50, 10], [82, 30], [82, 72], [50, 91], [18, 72], [18, 30]];
const paths = [
  "M300 260 C230 160 365 120 300 52",
  "M300 260 C360 165 435 225 492 156",
  "M300 260 C400 230 430 355 492 374",
  "M300 260 C365 355 245 410 300 473",
  "M300 260 C210 245 192 380 108 374",
  "M300 260 C235 170 145 235 108 156",
];
export default function ConnectionAtlas({ services }: { services: Service[] }) {
  const [active, setActive] = useState(1);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[active];
  return (
    <section className="connection-section" id="connections" aria-labelledby="connection-heading">
      <div className="container">
        <div className="chapter-heading"><span>02 / CONNECTED EXPERTISE</span><span>SIX DISCIPLINES. ONE SHARED PURPOSE.</span></div>
        <div className="connection-heading"><h2 id="connection-heading">Complexity,<br /><em>meet connection.</em></h2><p>No challenge exists in isolation.<br />Explore the connections that move things forward.</p></div>
        <div className="atlas-layout">
          <div className="atlas-map" role="group" aria-label="Choose an area of expertise">
            <svg className="atlas-lines" viewBox="0 0 600 520" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <ellipse cx="300" cy="260" rx="230" ry="190" />
              <ellipse cx="300" cy="260" rx="190" ry="230" transform="rotate(-48 300 260)" />
              <ellipse cx="300" cy="260" rx="120" ry="110" />
              <path className="atlas-axis" d="M300 0V520M0 260H600" />
              {paths.map((path, i) => <g key={path} className={active === i ? "route is-active" : "route"}><path d={path} /><path className="route-signal" d={path} /></g>)}
            </svg>
            <div className="atlas-centre"><Mark /><span>COMMON<br />GROUND</span></div>
            {services.map((s, i) => <button key={s.slug} ref={el => { buttons.current[i] = el; }} className={`atlas-node node-${i} ${active === i ? "is-active" : ""}`} style={{ left: `${positions[i][0]}%`, top: `${positions[i][1]}%` }} aria-pressed={active === i} aria-controls="connection-detail" onClick={() => setActive(i)} onKeyDown={e => {
              if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) {
                e.preventDefault(); const next = (i + (["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : -1) + services.length) % services.length;
                setActive(next); buttons.current[next]?.focus();
              }
            }}><span className="node-dot" /><span className="node-label"><small>0{i + 1}</small>{s.label}</span></button>)}
            <span className="atlas-instruction">SELECT A CONNECTION TO EXPLORE <span>↗</span></span>
          </div>
          <div className="atlas-detail" id="connection-detail" aria-live="polite" aria-atomic="true">
            <div key={service.slug} className="atlas-detail-inner">
              <div className="atlas-count"><span>0{active + 1}</span><small>/ 06</small></div>
              <span className="eyebrow">{service.kicker}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <Link href={`/expertise/${service.slug}`} className="arrow-link">Explore this expertise <span><ArrowUpRight size={20} /></span></Link>
            </div>
          </div>
        </div>
        <div className="atlas-footer"><span>People at the centre. Progress in every direction.</span><Link href="/expertise">View all expertise <ArrowUpRight size={17} /></Link></div>
      </div>
    </section>
  );
}
