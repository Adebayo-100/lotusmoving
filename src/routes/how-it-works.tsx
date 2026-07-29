import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { WhatsappIcon } from "@/components/social-icons";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works | LOTUS Moving Service" },
      {
        name: "description",
        content:
          "Four simple steps to a stress-free move with LOTUS: share your move details, add your contact info, schedule, then continue on WhatsApp.",
      },
      { property: "og:title", content: "How It Works | LOTUS Moving Service" },
      {
        property: "og:description",
        content: "Tell us what you're moving and finish with a real consultant on WhatsApp.",
      },
    ],
  }),
  component: HowItWorksPage,
});

const STEPS = [
  {
    n: "1",
    t: "Tell us what you need moved",
    d: "Pick your service, share pickup and destination, move size and preferred date. It takes under two minutes.",
  },
  {
    n: "2",
    t: "Provide your contact information",
    d: "Your name, phone and WhatsApp number so a move consultant can reach you directly.",
  },
  {
    n: "3",
    t: "Schedule your move",
    d: "Add property type, floor, elevator access, packing and storage needs plus any special instructions.",
  },
  {
    n: "4",
    t: "Continue to WhatsApp for consultation",
    d: "We open WhatsApp with your summary pre-filled. A consultant confirms details and sends your personalised quotation.",
  },
];

function HowItWorksPage() {
  return (
    <div className="pb-24 pt-32 lg:pt-40">
      <div className="container-lotus max-w-4xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            How it works
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05]">
            Simple on your side. Precise on ours.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            No price calculators and no bots — just a clear path to a human consultant who
            understands your move.
          </p>
        </Reveal>

        <ol className="relative mt-16 space-y-10 border-l border-border pl-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 130} as="li">
              <div className="relative">
                <span className="absolute -left-[3.05rem] inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary font-display text-base font-bold text-primary-foreground shadow-soft">
                  {s.n}
                </span>
                <h2 className="font-display text-xl font-semibold">{s.t}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <div className="mt-16 rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
            <WhatsappIcon className="mx-auto h-8 w-8 text-accent" />
            <h2 className="mt-4 font-display text-3xl font-bold">Ready when you are.</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Start your booking now and finish the conversation on WhatsApp.
            </p>
            <Link
              to="/book"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
            >
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
