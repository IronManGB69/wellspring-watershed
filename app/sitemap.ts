import type { MetadataRoute } from "next";
import { services, articles } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];
  return [
    "",
    "/about",
    "/expertise",
    "/sectors",
    "/contact",
    "/insights",
    "/policies",
    ...services.map((s) => `/expertise/${s.slug}`),
    ...articles.map((a) => `/insights/${a.slug}`),
  ].map((path) => ({ url: `${origin}${path}` }));
}
