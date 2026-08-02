import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SERVICES, SITE } from "@/lib/site";
import heroImg from "@/assets/hero-move.jpg";
import officeImg from "@/assets/service-office.jpg";
import packingImg from "@/assets/service-packing.jpg";
import storageImg from "@/assets/service-storage.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Moving Services in Nigeria | LOTUS Moving Service" },
      {
        name: "description",
        content:
          "Home relocation, office relocation, packing, storage and delivery services delivered by trained LOTUS crews across Nigeria.",
      },
      { property: "og:title", content: "Moving Services | LOTUS Moving Service" },
      {
        property: "og:description",
        content: "Five premium services, one standard of care. Book your move with LOTUS.",
      },
    ],
  }),
  component: ServicesPage,
});

const IMAGES = [heroImg, officeImg, packingImg, storageImg, officeImg];

const DETAILS = [
  ["Pre-move survey", "Protective wrapping", "Disassembly & reassembly", "Same-day setup"],
  ["Asset labelling", "IT & server handling", "Weekend execution", "Account manager"],
  ["Premium materials", "Room-by-room inventory", "Fragile specialists", "Unpacking option"],
  ["Monitored facility", "Short & long term", "Scheduled retrieval", "Inventory list"],
  ["Single item pickup", "Furniture delivery", "Bulk deliveries", "Careful handling"],
];

function ServicesPage() {
  return (
    <div className="pb-24 pt-32 lg:pt-40">
      <div className="container-lotus">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Services</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05]">
            Premium moving, from Lagos to anywhere in Nigeria.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Every LOTUS service is delivered by trained, uniformed crews with protected transit and
            a consultant who stays reachable throughout. {SITE.coverageLong}
          </p>
        </Reveal>


        <div className="mt-16 space-y-8">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <article
                id={s.slug}
                className="hover-lift grid scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-card shadow-soft lg:grid-cols-2"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <img
                    src={IMAGES[i]}
                    alt={s.title}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-64 w-full object-cover lg:h-full"
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <h2 className="font-display text-3xl font-bold">{s.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{s.blurb}</p>
                  <ul className="mt-7 grid gap-2 text-sm text-foreground sm:grid-cols-2">
                    {DETAILS[i].map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/book"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
                  >
                    Book {s.title} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
