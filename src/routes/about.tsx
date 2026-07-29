import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Counter, Reveal } from "@/components/reveal";
import heroImg from "@/assets/hero-move.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About LOTUS | Premium Movers in Nigeria" },
      {
        name: "description",
        content:
          "LOTUS is a technology-driven moving company in Nigeria built on care, punctuality and clear communication. Learn about our story and standards.",
      },
      { property: "og:title", content: "About LOTUS Moving Service" },
      {
        property: "og:description",
        content: "Why Nigerian homes and businesses trust LOTUS with what matters most.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: ShieldCheck,
    t: "Care first",
    d: "Every item is treated like it's irreplaceable, because to someone it is.",
  },
  {
    icon: Sparkles,
    t: "Premium standard",
    d: "Uniformed crews, clean trucks, proper materials and a calm, organised process.",
  },
  {
    icon: HeartHandshake,
    t: "Honest service",
    d: "Clear communication and personalised quotations from a real consultant — never a bot.",
  },
];

function AboutPage() {
  return (
    <div className="pb-24 pt-32 lg:pt-40">
      <div className="container-lotus">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              About LOTUS
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05]">
              We Move What Matters.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              LOTUS was founded to fix a familiar Nigerian experience: movers who arrive late,
              handle belongings carelessly and disappear when you need answers.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We combine trained crews, protective materials and simple technology so that every
              relocation feels organised from first message to final placement. Whether it's a
              studio in Yaba or a 60-desk office in Victoria Island, the standard is the same.
            </p>
            <Link
              to="/book"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
            >
              Move with LOTUS <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={140}>
            <img
              src={heroImg}
              alt="LOTUS crew carefully loading furniture for a family relocation"
              loading="lazy"
              width={1600}
              height={1200}
              className="w-full rounded-3xl object-cover shadow-lift"
            />
          </Reveal>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 100}>
              <div className="hover-lift h-full rounded-3xl border border-border bg-card p-8 shadow-soft">
                <v.icon className="h-6 w-6 text-accent" />
                <h2 className="mt-5 font-display text-xl font-semibold">{v.t}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-20 grid gap-10 rounded-3xl bg-forest-gradient p-12 sm:grid-cols-3">
            {[
              { v: 600, s: "+", l: "Moves completed" },
              { v: 12, s: "+", l: "Cities served" },
              { v: 98, s: "%", l: "Would recommend" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-display text-5xl font-bold text-primary-foreground">
                  <Counter to={s.v} suffix={s.s} />
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-primary-foreground/65">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
