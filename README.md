# Wellspring & Watershed

A complete, responsive customer website built with Next.js, React and TypeScript. The design combines a bright split-layout video hero, flowing linework, oversized editorial typography, deep forest green, pale citron and apricot. An interactive six-service connection map, expandable approach guide and animated 24/7 feature bring the story to life. All fonts and images are hosted locally. Motion respects reduced-motion preferences; the service map supports touch, mouse and arrow-key navigation.

## Start locally

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The site can be explored without email credentials. Until configured, the enquiry form displays a clear error with a direct email alternative; it does not pretend to send messages.

## Deploy to Vercel

1. Put this project in a Git repository and import it in Vercel. If the repository contains other folders, set this folder as the project root.
2. Keep the detected Next.js framework, `npm run build` build command and default output directory.
3. Add the environment variables below. Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS domain for this deployment, without a trailing slash. Preview deployments should use their own origin or leave this variable unset.
4. Deploy, add your domain and follow the DNS instructions supplied by Vercel.

The included `vercel.json` declares Next.js. No Vercel-specific services are required.

## Deploy to Railway

1. Create a Railway service from the same Git repository and select this folder as the root directory.
2. Railway reads `railway.json`: build with `npm run build`, start with `npm start`, and check `/` for health.
3. Add the environment variables below, generate a Railway domain or attach your custom domain, and deploy.
4. `next start` binds to `0.0.0.0` and reads Railway's `PORT` automatically. This is a regular Node deployment, retaining the installed production dependencies. The application needs its server for the contact endpoint; do not use static export.

## Activate enquiry emails

The form is wired to **contact@wellspring-watershed.com** using Resend's email API. Credentials have not been supplied, so live delivery is not activated or tested.

1. Verify a sending domain in Resend and create an API key with sending permissions.
2. Add these variables in Vercel or Railway. For local testing, copy `.env.example` to `.env.local` and populate it. Do not commit credentials.
3. Generate a secret with `openssl rand -hex 32` and use the same secret across application instances.
4. Redeploy, then submit a real test enquiry and confirm receipt in the destination inbox. Resend acceptance is not a guarantee of inbox delivery; check delivery logs and spam filtering as part of launch.

| Variable               | Purpose                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Actual HTTPS origin, used for sitemap URLs and contact origin checks                     |
| `RESEND_API_KEY`       | Server-only Resend API key                                                               |
| `CONTACT_FROM_EMAIL`   | Verified sender, for example `Wellspring & Watershed <website@wellspring-watershed.com>` |
| `CONTACT_TO_EMAIL`     | Defaults to `contact@wellspring-watershed.com`                                           |
| `CONTACT_FORM_SECRET`  | Random server-only signing secret, required in production                                |

The visitor's email becomes Reply-To. The destination and sender remain controlled by server configuration. The endpoint validates all fields, checks request origins, limits request size, uses signed expiring form tokens, a honeypot, duplicate-send idempotency, and per-instance rate limiting. API keys are never sent to the browser. The rate limit is a basic local safeguard; use the hosting provider's edge rate-limiting controls for stronger protection across multiple instances.

The public landline is **020 8040 2838**, linked as `tel:+442080402838` on the Contact hub and every page’s footer. The brand mark is an **intertwined double W in a circle**, rendered as vector artwork in the shared brand component and favicon. A standalone copy is in `public/images/wellspring-w-mark.svg`.

No enquiry database, analytics, tracking cookies, account system or CMS is included.

## Pages and editing

There are 16 public content pages:

- Home
- Our story
- Expertise overview and six detailed service pages
- Sectors
- Contact hub
- Insights overview and three complete articles
- Policies and standards

Edit service, sector and insight copy in `lib/content.ts`. Edit the homepage in `app/page.tsx`, brand components in `components/Brand.tsx`, and design tokens/styles in `app/globals.css` and `app/experience.css`. The interactive service map is `components/ConnectionAtlas.tsx`; its content is sourced from `lib/content.ts`. The remaining page files are in `app/`. The contact form and email endpoint are in `components/ContactForm.tsx` and `app/api/contact/route.ts`.

Visual assets are in `public/images/`. The homepage hero uses the supplied 37-second introduction film, cropped to remove embedded side bars while preserving captions. The previous AI-generated plaza image remains available in the asset folder. Attribution and license links for the other photographs are in `ASSET-CREDITS.md`; font licenses are in `public/fonts/`. The nature photograph used in an insight article shows Australia and is not presented as a UK project location. Photographed people are illustrative and are not represented as clients or staff.

## Content to confirm before public launch

The supplied brief and mission statement guide the content. The new headlines, descriptive service copy and three perspective articles are original editorial drafts for your review. The updated business overview supplies the UK private-limited-company description, company number 17469585, six areas of expertise and dedicated 24/7 rapid-response service. No testimonials, named clients, performance statistics, case studies, founder biographies or office locations have been invented.

- Company number 17469585 is included in the footer, About page and company information. Add the registered office address when supplied.
- Replace the short website privacy information with your approved full privacy notice, including the relevant controller details, processing basis, retention practices, suppliers and rights procedures. Confirm safeguarding and compliance documents available on request.
- Add approved leadership biographies, real project evidence and case studies when available.
- The confirmed 24/7 crisis desk is described throughout the site. Add a dedicated urgent-contact route when supplied; the general enquiry form is not presented as an emergency channel.
- Review and approve the three perspective articles before publishing them under the organisation's name.

These are business-content and email-activation steps, not missing website routes. The website is built and deployable; it has not been published to a public host.

## Checks

```sh
npm test
npm run typecheck
npm run build
npm start
```

The nine automated contact tests use mocked email delivery and never send real email. They cover origin validation, signed tokens, malformed fields, consent, honeypot, oversized bodies, missing configuration, successful provider handling, duplicate-send protection, provider failure, request throttling and a local-server origin regression, and delivery subjects for the new communications and partnership enquiry types.

Responsive checks covered seven representative page layouts at widths of 320, 768 and 1440 pixels: no horizontal overflow or broken images. Visual checks include the homepage, mobile menu, service layout and contact form. Page response checks include all public pages, sitemap/robots routes and the custom 404.

## Official references

- [Next.js deployment](https://nextjs.org/docs/app/getting-started/deploying)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Railway start commands](https://docs.railway.com/deployments/start-command)
- [Resend sending API](https://resend.com/docs/api-reference/emails/send-email)
