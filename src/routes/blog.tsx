import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { InstagramIcon, TiktokIcon } from "@/components/social-icons";
import { SITE } from "@/lib/site";
import packingImg from "@/assets/service-packing.jpg";
import officeImg from "@/assets/service-office.jpg";
import storageImg from "@/assets/service-storage.jpg";
import heroImg from "@/assets/hero-move.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Moving Journal | LOTUS Moving Service" },
      {
        name: "description",
        content:
          "Moving tips, packing guides and relocation stories from the LOTUS team — practical advice for moving in Nigeria.",
      },
      { property: "og:title", content: "Moving Journal | LOTUS Moving Service" },
      {
        property: "og:description",
        content: "Practical moving tips, packing guides and customer stories from LOTUS.",
      },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  {
    title: "The 7-day Lagos moving checklist",
    tag: "Moving tips",
    date: "Jul 2026",
    excerpt:
      "A calm, day-by-day plan that keeps your relocation on schedule from the week before to handing over the keys.",
    img: heroImg,
  },
  {
    title: "How to pack fragile items like a pro",
    tag: "Packing guides",
    date: "Jun 2026",
    excerpt:
      "The wrapping order, box weight rules and labelling system our crews use on every single move.",
    img: packingImg,
  },
  {
    title: "Moving an office without downtime",
    tag: "Corporate",
    date: "Jun 2026",
    excerpt:
      "What to sequence, who to assign and how to be fully operational again by Monday morning.",
    img: officeImg,
  },
  {
    title: "When storage is smarter than squeezing",
    tag: "Storage",
    date: "May 2026",
    excerpt:
      "Between leases or downsizing? Here's how short-term storage saves money and stress.",
    img: storageImg,
  },
  {
    title: "Before & after: a Lekki duplex relocation",
    tag: "Customer stories",
    date: "May 2026",
    excerpt: "How a four-bedroom family move was completed and fully set up in a single day.",
    img: heroImg,
  },
  {
    title: "Questions to ask any mover in Nigeria",
    tag: "Moving tips",
    date: "Apr 2026",
    excerpt: "Six questions that separate a professional moving company from a truck for hire.",
    img: packingImg,
  },
];

function BlogPage() {
  return (
    <div className="pb-24 pt-32 lg:pt-40">
      <div className="container-lotus">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Journal</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05]">
            Moving knowledge, worth reading.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Tips, guides and stories from the crews who move Nigerian homes and offices every week.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="hover-lift group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <div className="h-44 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
                    <span className="text-accent">{p.tag}</span>
                    <span className="text-muted-foreground">{p.date}</span>
                  </div>
                  <h2 className="mt-4 font-display text-lg font-semibold leading-snug">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-20 rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
            <h2 className="font-display text-3xl font-bold">Follow our journey</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Follow hundreds of Nigerians who trust LOTUS for stress-free moving.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
              >
                <InstagramIcon className="h-4 w-4" /> {SITE.instagramHandle}
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <TiktokIcon className="h-4 w-4" /> {SITE.tiktokHandle}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
