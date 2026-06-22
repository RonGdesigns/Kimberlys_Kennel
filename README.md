# Kimberly Labradoodle Kennel

Website for **Kimberly Labradoodle Kennel** — built by Iron Digital.

A warm, earthy, family-focused site for showcasing available labradoodle puppies,
explaining the adoption process, collecting inquiries, and booking visits.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS** (custom warm/earthy design tokens)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
src/
  app/                 # Routes (one folder per page in the sitemap)
    page.tsx           # Home
    about/
    puppies/           # Listing + [slug] detail pages
    adoption-process/
    testimonials/
    booking/
    contact/
    api/inquiry/       # Form submission endpoint
  components/          # Header, Footer, PuppyCard, PuppyBrowser, InquiryForm
  lib/                 # site config + content/puppy data (easy to edit / CMS-ready)
```

## Editing content

- **Site details** (email, phone, location, nav): `src/lib/site.ts`
- **Puppies**: `src/lib/puppies.ts`
- **Copy** (values, adoption steps, testimonials): `src/lib/content.ts`

## Phase 1 status (current)

Done:
- Full 7-page site matching the proposed sitemap
- Warm / earthy / natural design system
- Available-puppies browser with search + status/size filters
- Reservation-ready puppy data model and inquiry/booking forms
- Inquiry API endpoint (validates + logs)

Intentionally deferred / next steps (see inline `TODO` / `Phase 2` comments):
- **Adoption model** — inquiry-first today; deposit vs. full checkout to be
  confirmed with the client, then wire **Stripe** into `api/inquiry` + the form.
- **Email/CRM delivery** — connect the inquiry endpoint to an email provider
  (e.g. Resend) and/or a CRM so leads reach the kennel.
- **Multilingual** — copy is centralized and translation-ready; add `next-intl`
  routing when target languages are confirmed.
- **Booking backend** — connect live availability (Cal.com / Calendly / custom).
- **Analytics** — add the chosen analytics provider.
- **CMS** — move `lib/*` data into a headless CMS so the client self-manages.
- **Photography** — placeholder images are from Unsplash; swap for the client's
  professional photos.
```
