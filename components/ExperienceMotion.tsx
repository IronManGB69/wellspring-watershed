"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ExperienceMotion() {
  const path = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('reveal-entered');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal-pending'); observer.observe(el);
      }
    });
    const showAll = () => elements.forEach(el => el.classList.remove('reveal-pending'));
    const onMotionChange = () => { if (reduced.matches) { observer.disconnect(); showAll(); } };
    reduced.addEventListener('change', onMotionChange);
    return () => { observer.disconnect(); showAll(); reduced.removeEventListener('change', onMotionChange); };
  }, [path]);
  return null;
}
