import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  Building2,
  Check,
  Clock,
  Home as HomeIcon,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Warehouse,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Counter, Reveal } from "@/components/reveal";
import { InstagramIcon, TiktokIcon } from "@/components/social-icons";
import { SITE, waLink } from "@/lib/site";
import heroImg from "@/assets/hero-move.jpg";
import officeImg from "@/assets/service-office.jpg";
import packingImg from "@/assets/service-packing.jpg";
import storageImg from "@/assets/service-storage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LOTUS Moving Service | Move Without Stress in Nigeria" },
      {
        name: "description",
        content:
          "Premium home and office relocation, packing, storage and delivery in Nigeria. Book your move with LOTUS in minutes and finish on WhatsApp.",
      },
      { property: "og:title", content: "LOTUS Moving Service | Move Without Stress in Nigeria" },
      {
        property: "og:description",
        content:
          "Premium home and office relocation, packing, storage and delivery in Nigeria. Book your move with LOTUS in minutes and finish on WhatsApp.",
      },
    ],
  }),
  component: Home,
});

const SERVICE_CARDS = [
  {
    icon: HomeIcon,
    title: "Home Relocation",
    desc: "Studios to duplexes, moved by trained crews with padded transit and a dedicated move captain.",
    image: heroImg,
  },
  {
    icon: Building2,
    title: "Office Relocation",
    desc: "After-hours corporate moves with asset labelling, IT handling and zero downtime.",
    image: officeImg,
  },
  {
    icon: PackageCheck,
    title: "Packing Services",
    desc: "Full or partial packing, premium materials and specialists for your fragile pieces.",
    image: packingImg,
  },
  {
    icon: Warehouse,
    title: "Storage Solutions",
    desc: "Secure, monitored short and long-term storage with retrieval whenever you need it.",
    image: storageImg,
  },
  {
    icon: Truck,
    title: "Delivery Services",
    desc: "Single item, furniture and bulk deliveries handled with the same premium care.",
    image: officeImg,
  },
];

const STEPS = [
  { n: "1", t: "Tell us what you need moved", d: "Service, pickup, destination, size and date." },
  { n: "2", t: "Provide your contact information", d: "Name, phone and WhatsApp number." },
  { n: "3", t: "Schedule your move", d: "Property details, access, packing and storage needs." },
  { n: "4", t: "Continue to WhatsApp", d: "A move consultant confirms everything personally." },
];

const TESTIMONIALS = [
  {
    name: "Adaeze O.",
    role: "Lekki → Ikoyi",
    quote:
      "The crew arrived early, wrapped everything and my apartment was set up the same evening. Genuinely the calmest move I've had.",
  },
  {
    name: "Tunde A.",
    role: "Operations Lead, Fintech",
    quote:
      "We moved 60 workstations on a Saturday and were fully live by Monday morning. Their labelling system is excellent.",
  },
  {
    name: "Chiamaka N.",
    role: "Abuja → Lagos",
    quote:
      "Constant updates on WhatsApp, no surprise charges, and nothing broken. LOTUS is now the only mover I recommend.",
  },
];

const FAQS = [
  {
    q: "How far in advance should I book?",
    a: "For home moves we recommend 3–7 days notice, and 2 weeks for offices. We do accommodate same-week and urgent moves whenever crews are available.",
  },
  {
    q: "Do you move outside Lagos?",
    a: "Yes. We handle interstate relocations across Nigeria, including Abuja, Port Harcourt, Ibadan and Enugu.",
  },
  {
    q: "Do you provide packing materials?",
    a: "We do. Boxes, bubble wrap, stretch film, wardrobe cartons and protective blankets are all supplied by our team.",
  },
  {
    q: "Are my items protected?",
    a: "Every move is handled by vetted, uniformed crews with padded transit and an item inventory. Coverage options are discussed with your move consultant.",
  },
  {
    q: "How do I get a quotation?",
    a: "Complete the booking form, then continue to WhatsApp. A consultant reviews your details and sends a personalised quotation — no automated pricing.",
  },
];

const POSTS = [
  {
    title: "The 7-day Lagos moving checklist",
    tag: "Moving tips",
    excerpt: "A calm, day-by-day plan that keeps your relocation on schedule from week to keys.",
  },
  {
    title: "How to pack fragile items like a pro",
    tag: "Packing guides",
    excerpt: "The wrapping order, box weight rules and labelling system our crews use daily.",
  },
  {
    title: "Moving an office without downtime",
    tag: "Corporate",
    excerpt: "What to sequence, who to assign and how to be live again by Monday morning.",
  },
];

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <Partners />
      <Corporate />
      <DriversCta />

      <FollowUs />
      <Faqs />
      <BlogPreview />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden">
      <img
        src={heroImg}
        alt="LOTUS movers loading a wrapped sofa into a green truck for a Nigerian family"
        width={1600}
        height={1200}
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.24_0.05_166/0.92)] via-[oklch(0.24_0.05_166/0.7)] to-[oklch(0.24_0.05_166/0.25)]" />

      <div className="container-lotus relative flex min-h-[92vh] flex-col justify-center py-32">
        <Reveal className="max-w-2xl">
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Lagos to anywhere in Nigeria
          </span>
          <h1 className="mt-7 font-display text-5xl font-bold leading-[1.02] text-primary-foreground sm:text-6xl lg:text-7xl">
            Move Without <span className="text-gold-gradient">Stress.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80 sm:text-xl">
            {SITE.tagline} Premium relocation from Lagos to anywhere in Nigeria — trained crews,
            protected transit and one consultant who stays with you from the first box to the last.
          </p>


          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="group inline-flex items-center gap-2 rounded-full bg-primary-foreground px-7 py-4 text-sm font-semibold text-forest shadow-lift transition-all duration-300 hover:-translate-y-1"
            >
              Book Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              Get Instant Quote
            </Link>
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-14">
          <div className="glass-dark float-slow inline-flex max-w-full flex-wrap items-center gap-x-8 gap-y-4 rounded-3xl px-6 py-5">
            <div className="flex items-center gap-2 text-primary-foreground">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.9/5</span>
              <span className="text-sm text-primary-foreground/70">from 600+ moves</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <ShieldCheck className="h-4 w-4 text-gold" /> Vetted, uniformed crews
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <Clock className="h-4 w-4 text-gold" /> On-time guarantee
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  light,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.22em] ${light ? "text-gold" : "text-accent"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-4xl font-bold leading-[1.08] sm:text-5xl ${light ? "text-primary-foreground" : "text-foreground"}`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-lg leading-relaxed ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}

function Services() {
  return (
    <section id="services" className="container-lotus py-24 lg:py-32">
      <SectionHead
        eyebrow="Services"
        title="Everything a move needs, under one team."
        sub="Five services, one standard of care — delivered from Lagos to anywhere in Nigeria. Choose what you need; we handle the rest."
      />


      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICE_CARDS.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <article className="hover-lift group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.24_0.05_166/0.55)] to-transparent" />
              </div>
              <div className="p-7">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <Link
                  to="/book"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  Book this service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: ShieldCheck, t: "Vetted crews", d: "Background-checked, uniformed and trained movers." },
    { icon: Clock, t: "On time, always", d: "Arrival windows we actually keep, with live updates." },
    { icon: Boxes, t: "Protected transit", d: "Padded blankets, stretch film and secured loading." },
    { icon: Check, t: "One point of contact", d: "A move consultant with you end to end on WhatsApp." },
  ];
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="container-lotus grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHead
            eyebrow="Why choose LOTUS"
            title="The calm, careful way to move in Nigeria."
            sub="We built LOTUS for people who are tired of guesswork, missing items and movers who go quiet on the day."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {items.map((it, i) => (
              <Reveal key={it.t} delay={i * 80}>
                <div className="hover-lift rounded-2xl border border-border bg-background p-6">
                  <it.icon className="h-5 w-5 text-accent" />
                  <h3 className="mt-4 font-display text-base font-semibold">{it.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={150}>
          <div className="relative">
            <img
              src={packingImg}
              alt="Professional packing of a fragile item into a labelled box"
              loading="lazy"
              width={1200}
              height={900}
              className="w-full rounded-3xl object-cover shadow-lift"
            />
            <div className="glass float-slow absolute -bottom-6 -left-2 rounded-2xl p-5 shadow-lift sm:left-6">
              <p className="font-display text-3xl font-bold text-primary">
                <Counter to={98} suffix="%" />
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Damage-free moves
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: 600, s: "+", l: "Moves completed" },
    { v: 12, s: "+", l: "Cities served" },
    { v: 45, s: "", l: "Trained movers" },
    { v: 98, s: "%", l: "Would recommend" },
  ];
  return (
    <section className="bg-forest-gradient py-20 lg:py-24">
      <div className="container-lotus grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 90}>
            <div className="text-center lg:text-left">
              <p className="font-display text-5xl font-bold text-primary-foreground">
                <Counter to={s.v} suffix={s.s} />
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-primary-foreground/65">
                {s.l}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="container-lotus py-24 lg:py-32">
      <SectionHead
        eyebrow="How it works"
        title="Four steps. Then a real human on WhatsApp."
        sub="No price calculators, no bots. Tell us about your move and a consultant handles your personalised quotation."
      />
      <ol className="relative mt-16 grid gap-10 md:grid-cols-4">
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block" />
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 140} as="li">
            <div className="relative">
              <div className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary font-display text-xl font-bold text-primary-foreground shadow-soft">
                {s.n}
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={200} className="mt-12">
        <Link
          to="/book"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
        >
          Start your booking
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="container-lotus">
        <SectionHead eyebrow="Testimonials" title="Trusted with what matters most." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <figure className="hover-lift h-full rounded-3xl border border-border bg-background p-8 shadow-soft">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-5 text-base leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold text-foreground">{t.name}</span>
                  <span className="block text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const names = [
    "Aurora Estates",
    "Kairo Fintech",
    "Palm Grove Realty",
    "Northline Group",
    "Verde Interiors",
    "Sabi Logistics",
  ];
  return (
    <section className="border-y border-border bg-background py-12">
      <div className="container-lotus">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Trusted by homes, estates and growing companies
        </p>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee-track flex w-max gap-14">
            {[...names, ...names].map((n, i) => (
              <span
                key={`${n}-${i}`}
                className="font-display text-lg font-semibold text-muted-foreground/70"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Corporate() {
  return (
    <section className="container-lotus py-24 lg:py-32">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] bg-forest-gradient shadow-lift">
          <div className="grid lg:grid-cols-2">
            <div className="p-10 lg:p-16">
              <SectionHead
                light
                eyebrow="Corporate solutions"
                title="Relocations that don't interrupt business."
                sub="Dedicated account management, weekend and after-hours execution, asset registers and staff relocation programmes."
              />
              <ul className="mt-8 space-y-3 text-sm text-primary-foreground/80">
                {[
                  "Office and branch relocation",
                  "Employee relocation packages",
                  "Warehouse and inventory moves",
                  "Scheduled corporate storage",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-gold" />
                    {x}
                  </li>
                ))}
              </ul>
              <a
                href={waLink(
                  "Hello LOTUS 👋 I'd like to discuss a corporate relocation for my company.",
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-7 py-4 text-sm font-semibold text-forest transition-transform duration-300 hover:-translate-y-1"
              >
                Talk to our corporate team
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="relative min-h-[320px]">
              <img
                src={officeImg}
                alt="Office relocation crew moving labelled crates through a modern office"
                loading="lazy"
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function DriversCta() {
  return (
    <section className="bg-card py-20 lg:py-24">
      <div className="container-lotus">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-border bg-background p-10 shadow-soft lg:flex-row lg:items-center lg:p-14">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Drive with LOTUS
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                Own a truck or drive professionally?
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Join our partner network and run relocation and delivery jobs from Lagos to anywhere
                in Nigeria — agreed rates, prompt payouts and jobs that fit your schedule.
              </p>
            </div>
            <Link
              to="/drivers"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
            >
              Apply to drive
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}



function FollowUs() {
  const topics = [
    "Moving tips",
    "Packing guides",
    "Customer success stories",
    "Behind the scenes",
    "Before & after relocations",
    "Moving day transformations",
  ];
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="container-lotus">
        <SectionHead
          eyebrow="Follow our journey"
          title="See how we move, every week."
          sub="Follow hundreds of Nigerians who trust LOTUS for stress-free moving."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[heroImg, packingImg, officeImg, storageImg, heroImg, packingImg].map((src, i) => (
                <div
                  key={i}
                  className="hover-lift group relative aspect-square overflow-hidden rounded-2xl"
                >
                  <img
                    src={src}
                    alt="LOTUS moving day highlight"
                    loading="lazy"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[oklch(0.24_0.05_166/0.6)] to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <InstagramIcon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-background p-8 shadow-soft">
              <div>
                <p className="font-display text-xl font-semibold">What you'll get</p>
                <ul className="mt-5 grid gap-3 text-sm text-muted-foreground">
                  {topics.map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <Check className="h-4 w-4 shrink-0 text-accent" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
                >
                  <InstagramIcon className="h-4 w-4" /> Instagram
                </a>
                <a
                  href={SITE.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
                >
                  <TiktokIcon className="h-4 w-4" /> TikTok
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Faqs() {
  return (
    <section className="container-lotus py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHead eyebrow="FAQs" title="Questions, answered plainly." />
        <Reveal delay={120}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function BlogPreview() {
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="container-lotus">
        <SectionHead eyebrow="Journal" title="Moving knowledge, worth reading." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <article className="hover-lift h-full rounded-3xl border border-border bg-background p-8 shadow-soft">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {p.tag}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <Link
                  to="/blog"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
                >
                  Read journal <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="container-lotus py-24 lg:py-28">
      <Reveal>
        <div className="rounded-[2rem] border border-border bg-background p-10 text-center shadow-soft lg:p-16">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Ready to move without stress?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Share your move details and continue on WhatsApp for a personalised quotation from a
            LOTUS consultant.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
            >
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
            >
              Contact us
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
