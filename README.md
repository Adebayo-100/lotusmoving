# LOTUS Moving Service

A premium, production-ready website and lead-generation web application for **LOTUS Moving Service** — a Lagos-based relocation company moving homes, offices and cargo from Lagos to anywhere in Nigeria.

Built with a world-class digital experience in mind: fast, accessible, SEO-friendly and designed to convert visitors into booked moves via an integrated booking flow, driver recruitment form and contact channel.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Customisation](#customisation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository contains the complete source code for the LOTUS Moving Service public website and booking application. It is designed as a **lead-generation platform**:

- Visitors can explore services, read FAQs and learn how the company works.
- Prospective customers can request a move through a multi-step booking form and receive an automated proforma invoice plus a calendar reminder.
- Drivers and truck owners can apply to collaborate with the company through a dedicated driver application form.
- All form submissions are routed through **Formspree** to a shared inbox.

The project is built on **TanStack Start** with **React 19**, **TypeScript**, **Tailwind CSS v4** and **shadcn/ui** components.

---

## Tech Stack

| Layer | Technology |
|-------|--------------|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 + Vite) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI primitives |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Carousel | Embla Carousel |
| Date Picker | react-day-picker |
| Notifications | Sonner |
| Charts | Recharts |
| Backend / Forms | [Formspree](https://formspree.io) |

---

## Features

- **Premium responsive design** optimised for the Nigerian market.
- **Homepage** with hero, services, statistics, testimonials, process, FAQs and social proof.
- **Services page** showcasing Home Relocation, Office Relocation, Packing, Storage and Delivery.
- **Booking flow** — 4-step Zod-validated form with automatic proforma invoice and `.ics` calendar reminder.
- **Driver application page** for recruiting drivers and truck owners.
- **Contact page** with Formspree-backed enquiry form.
- **About, Blog and How It Works pages** for content and trust building.
- **SEO-ready** with sitemap, Open Graph tags, Schema.org markup and canonical URLs.
- **Floating WhatsApp action** and social rail for instant engagement.
- **Accessibility-first** semantic HTML, focus states and keyboard navigation.

---

## Prerequisites

- **Node.js** `>= 20` (recommended: install via [nvm](https://github.com/nvm-sh/nvm))
- **Bun** `>= 1.0` or **npm** `>= 10`
- A GitHub account (if you plan to fork or push changes)

> This project uses **Bun** by default. All commands below use `bun`, but you can replace them with `npm` or `pnpm` if preferred.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Adebayo-100/Lotus-Moving-Services.git
   cd Lotus-Moving-Services
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

   Or with npm:

   ```bash
   npm install
   ```

---

## Environment Variables

The project runs without a backend database and requires minimal configuration. The only external integration is **Formspree**, which is already wired to the project endpoint.

If you want to use your own Formspree form, create a `.env` file in the project root and override the value in `src/lib/site.ts` or via an environment variable:

```bash
# Optional — only if you want to swap the Formspree endpoint
VITE_FORMSPREE_URL=https://formspree.io/f/YOUR_FORM_ID
```

### Current Formspree endpoint

```text
https://formspree.io/f/xvzeepjj
```

This endpoint receives:

- Move booking requests
- Contact / enquiry messages
- Driver collaboration applications

### WhatsApp and contact details

Business contact details are centralised in `src/lib/site.ts`:

```ts
export const SITE = {
  name: "LOTUS Moving Service",
  email: "lotusmovingng@gmail.com",
  whatsappNumber: "08137912310",
  whatsappIntl: "2348137912310",
  city: "Lagos, Nigeria",
  coverage: "From Lagos to anywhere in Nigeria",
  formspree: "https://formspree.io/f/xvzeepjj",
  // ...
};
```

Update these values directly in `src/lib/site.ts` when business details change.

---

## Running Locally

Start the development server:

```bash
bun run dev
```

The app will be available at:

```text
http://localhost:8080
```

Vite hot-module replacement is enabled, so changes to components, styles and routes will reflect instantly in the browser.

---

## Building for Production

Create an optimised production build:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

The build output is generated according to the TanStack Start + Vite configuration and is ready for deployment on any static or edge host.

---

## Deployment

### Option 1: Publish via Lovable (recommended)

1. Open the project in the [Lovable editor](https://lovable.dev).
2. Click **Publish** in the top-right corner.
3. Your site goes live at a permanent `.lovable.app` URL.
4. Optional: connect a custom domain under **Project Settings → Domains**.

### Option 2: Deploy to any static host

After running `bun run build`, deploy the generated `dist/` folder to:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
- [GitHub Pages](https://pages.github.com)

Most hosts will auto-detect the Vite/TanStack setup when you connect the GitHub repository.

### Option 3: Self-host

For self-hosting instructions, see the [Lovable self-hosting guide](https://docs.lovable.dev/tips-tricks/self-hosting).

---

## Project Structure

```text
Lotus-Moving-Services/
├── public/                    # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/                # Images and generated media
│   ├── components/            # Shared UI components (header, footer, reveal, etc.)
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Business logic, helpers and constants
│   │   ├── site.ts            # Site config, contact details, Formspree helper
│   │   ├── booking-doc.ts     # Proforma invoice + calendar reminder generation
│   │   └── utils.ts           # Utility functions
│   ├── routes/                # TanStack Start file-based routes
│   │   ├── index.tsx          # Home page
│   │   ├── book.tsx           # Booking flow + invoice
│   │   ├── drivers.tsx        # Driver application form
│   │   ├── contact.tsx        # Contact form
│   │   ├── services.tsx       # Services listing
│   │   ├── about.tsx          # About page
│   │   ├── blog.tsx           # Blog page
│   │   ├── how-it-works.tsx   # Process page
│   │   ├── sitemap[.]xml.ts   # Dynamic sitemap
│   │   └── __root.tsx         # Root layout with SEO and global providers
│   ├── router.tsx             # TanStack Router configuration
│   ├── server.ts              # Server entry
│   ├── start.ts               # Start configuration
│   └── styles.css             # Tailwind CSS v4 theme and design tokens
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Customisation

### Brand colours

The design system uses CSS custom properties and OKLCH colour values in `src/styles.css`. Update the `--primary`, `--gold`, `--cream` and surface tokens to re-theme the site.

### Content

Page copy lives directly in the route files under `src/routes/`. Edit the relevant file to change text, images or section order.

### Forms

- Formspree endpoint: update `formspree` in `src/lib/site.ts`.
- Form schemas: update the Zod schemas in `src/routes/book.tsx`, `src/routes/contact.tsx` and `src/routes/drivers.tsx`.

### SEO

Each route exports a `head()` function with title, description and Open Graph metadata. Update these in each route file to match your SEO strategy.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

Please run linting and formatting before submitting:

```bash
bun run lint
bun run format
```

---

## License

This project is proprietary to **LOTUS Moving Service**. All rights reserved.

---

## Support

For questions, bug reports or feature requests, contact:

- **Email:** [lotusmovingng@gmail.com](mailto:lotusmovingng@gmail.com)
- **WhatsApp:** [+234 813 791 2310](https://wa.me/2348137912310)
- **Instagram:** [@LOTUS_MOVING_SERVICES](https://instagram.com/LOTUS_MOVING_SERVICES)
