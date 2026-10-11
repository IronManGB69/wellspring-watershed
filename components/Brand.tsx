"use client";

import Link from "next/link";
import { useId } from "react";

const firstW = "M12 19L20 41L28 22L36 41L44 19";
const secondW = "M20 23L28 45L36 26L44 45L52 23";

export function Mark({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <clipPath id={`${id}-cross`}><rect x="29" y="27" width="7" height="13" /></clipPath>
        <mask id={`${id}-a`} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="white" />
          <path d={secondW} stroke="black" strokeWidth="5.5" strokeLinejoin="round" />
          <rect x="29" y="27" width="7" height="13" fill="white" />
        </mask>
        <mask id={`${id}-b`} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="white" />
          <path d={firstW} stroke="black" strokeWidth="5.5" strokeLinejoin="round" clipPath={`url(#${id}-cross)`} />
        </mask>
      </defs>
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.8" />
      <g stroke="currentColor" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round">
        <path d={firstW} mask={`url(#${id}-a)`} />
        <path d={secondW} mask={`url(#${id}-b)`} />
      </g>
    </svg>
  );
}
export default function Brand() {
  return (
    <Link href="/" className="brand brand-icon" aria-label="Wellspring and Watershed home">
      <Mark />
    </Link>
  );
}
