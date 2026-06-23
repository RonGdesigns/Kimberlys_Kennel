# Kimberly Labradoodle Kennel

Website for **Kimberly Labradoodle Kennel** — built by Iron Digital.

A warm, earthy, family-focused site for showcasing available labradoodle puppies,
explaining the adoption process, collecting inquiries, and booking visits.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS** (custom warm/earthy design tokens)
- **Payload CMS 3** — self-hosted admin at `/admin`, SQLite database

## Getting started

```bash
npm install
cp .env.example .env      # then fill in PAYLOAD_SECRET, SEED_SECRET
npm run dev               # http://localhost:3000

# seed admin user + starter puppies (server must be running):
curl -X POST "http://localhost:3000/api/seed?secret=<SEED_SECRET>"

npm run build             # production build
```

## Admin panel (for Kimberly)

The site content is managed at **`/admin`** — no code needed:

- **Puppies** — add/edit puppies: name, photo, color, size, sex, status
  (available / reserved / adopted / coming soon), litter, dates, price,
  deposit, description, and personality traits. Changes appear on the public
  site immediately.
- **Media** — upload and manage photos.
- **Users** — manage who can log into the admin.

The starter admin login is created by the seed (default
`kimberlylabradoodlekennel@gmail.com` / `ChangeMe123!` — **change the password
on first login**, or set `SEED_ADMIN_*` before seeding).

## Project structure

```
src/
  app/
    (payload)/         # Payload admin (/admin) + Payload API
    page.tsx           # Home
    about/
    puppies/           # Listing + [slug] detail pages (read from Payload)
    adoption-process/
    testimonials/
    booking/
    contact/
    api/inquiry/       # Inquiry/booking form submissions
    api/seed/          # One-time, secret-guarded seeding endpoint
  collections/         # Payload collections: Puppies, Media, Users
  payload.config.ts    # Payload configuration
  components/          # Header, Footer, PuppyCard, PuppyBrowser, InquiryForm
  lib/
    data.ts            # Reads puppies from Payload for the public site
    puppies.ts         # Puppy type + seed data
    content.ts         # Static copy (values, steps, testimonials)
    site.ts            # Site details (email, phone, nav)
    seed.ts            # Seeding logic
```

## Editing content

- **Puppies**: managed in the **`/admin`** panel (see above).
- **Site details** (email, phone, location, nav): `src/lib/site.ts`
- **Copy** (values, adoption steps, testimonials): `src/lib/content.ts`

## Phase 1 status (current)

Done:
- Full 7-page site matching the proposed sitemap
- Warm / earthy / natural design system
- Available-puppies browser with search + status/size filters
- Reservation-ready puppy data model and inquiry/booking forms
- Inquiry API endpoint (validates + logs)
- **Admin panel (Payload CMS)** — Kimberly manages puppies + photos at `/admin`

Intentionally deferred / next steps (see inline `TODO` / `Phase 2` comments):
- **Adoption model** — inquiry-first today; deposit vs. full checkout to be
  confirmed with the client, then wire **Stripe** into `api/inquiry` + the form.
- **Email/CRM delivery** — connect the inquiry endpoint to an email provider
  (e.g. Resend) and/or a CRM so leads reach the kennel.
- **Multilingual** — copy is centralized and translation-ready; add `next-intl`
  routing when target languages are confirmed.
- **Booking backend** — connect live availability (Cal.com / Calendly / custom).
- **Analytics** — add the chosen analytics provider.
- **Photography** — placeholder photos are auto-generated; Kimberly uploads real
  photos via the admin.

## Deployment notes

- Set `PAYLOAD_SECRET` and `SEED_SECRET` as real environment variables.
- SQLite (a file on disk) suits a single persistent server/VM or container host.
  For serverless/multi-instance hosting, switch the DB adapter to Postgres
  (e.g. Neon/Supabase) and move uploads to cloud storage (S3 / Vercel Blob).
- Run `npm run build` then `npm start`; seed once via `POST /api/seed`.
