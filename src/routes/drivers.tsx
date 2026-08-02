import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Banknote, CalendarClock, MapPinned } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { SITE, sendToFormspree } from "@/lib/site";

export const Route = createFileRoute("/drivers")({
  head: () => ({
    meta: [
      { title: "Drive With LOTUS | Driver & Partner Applications" },
      {
        name: "description",
        content:
          "Own a truck or drive professionally? Partner with LOTUS Moving Service and run relocation and delivery jobs from Lagos to anywhere in Nigeria.",
      },
      { property: "og:title", content: "Drive With LOTUS Moving Service" },
      {
        property: "og:description",
        content:
          "Apply to join the LOTUS driver network — steady relocation and delivery jobs across Nigeria.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DriversPage,
});

const VEHICLES = [
  "I don't own a vehicle (driver only)",
  "Mini van / Bus",
  "Pickup truck",
  "Small truck (1–3 tons)",
  "Medium truck (4–7 tons)",
  "Large truck (8 tons+)",
];

const AVAILABILITY = ["Full-time", "Part-time", "Weekends only", "On-call / Ad-hoc"];

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number"),
  email: z.union([z.string().trim().email("Enter a valid email").max(120), z.literal("")]),
  city: z.string().trim().min(2, "Where are you based?").max(80),
  licence: z.string().trim().min(3, "Enter your driver's licence number").max(40),
  experience: z.string().trim().min(1, "Enter your years of experience").max(20),
  vehicle: z.string().min(1, "Select your vehicle type"),
  availability: z.string().min(1, "Select your availability"),
  routes: z.string().trim().max(200),
  about: z.string().trim().max(600),
});

type Form = z.infer<typeof schema>;

const EMPTY: Form = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  licence: "",
  experience: "",
  vehicle: "",
  availability: "",
  routes: "",
  about: "",
};

function DriversPage() {
  const [data, setData] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setSending(true);
    const ok = await sendToFormspree({
      _subject: `Driver application — ${result.data.fullName}`,
      formType: "Driver / Partner application",
      name: result.data.fullName,
      phone: result.data.phone,
      email: result.data.email || "—",
      basedIn: result.data.city,
      licenceNumber: result.data.licence,
      yearsExperience: result.data.experience,
      vehicleType: result.data.vehicle,
      availability: result.data.availability,
      preferredRoutes: result.data.routes || "—",
      about: result.data.about || "—",
    });
    setSending(false);
    if (!ok) {
      toast.error("We couldn't send your application. Please try again or message us on WhatsApp.");
      return;
    }
    setSent(true);
    setData(EMPTY);
    toast.success("Application received. Our operations team will reach out.");
  };

  return (
    <div className="pb-24 pt-32 lg:pt-40">
      <div className="container-lotus">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Drive with LOTUS
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05]">
            Partner with us. Move what matters.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            We're expanding our driver and truck-owner network. {SITE.coverage} — steady relocation
            and delivery jobs, professional coordination and prompt payouts.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  icon: Banknote,
                  t: "Prompt, transparent payouts",
                  d: "Agreed rates per job, settled quickly after completion — no endless follow-ups.",
                },
                {
                  icon: CalendarClock,
                  t: "Work that fits your schedule",
                  d: "Full-time, weekends or on-call. You choose the jobs you can take.",
                },
                {
                  icon: MapPinned,
                  t: "Lagos and interstate routes",
                  d: "City moves plus long-haul trips from Lagos to anywhere in Nigeria.",
                },
                {
                  icon: BadgeCheck,
                  t: "Requirements",
                  d: "Valid driver's licence, verifiable references, and a clean, roadworthy vehicle if you own one.",
                },
              ].map((f) => (
                <div key={f.t} className="hover-lift rounded-2xl border border-border bg-card p-6">
                  <f.icon className="h-5 w-5 text-accent" />
                  <h2 className="mt-4 font-display text-base font-semibold">{f.t}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={submit}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10"
            >
              <h2 className="font-display text-2xl font-semibold">Driver application</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us about yourself. Our operations team reviews every application.
              </p>

              {sent && (
                <p className="mt-6 rounded-2xl border border-primary/30 bg-secondary p-4 text-sm text-foreground">
                  Thank you — your application has been sent to {SITE.email}. We'll be in touch
                  shortly.
                </p>
              )}

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={errors.fullName}>
                  <Input
                    value={data.fullName}
                    onChange={(v) => set("fullName", v)}
                    placeholder="Your name"
                    max={80}
                  />
                </Field>
                <Field label="Phone / WhatsApp" error={errors.phone}>
                  <Input
                    value={data.phone}
                    onChange={(v) => set("phone", v)}
                    placeholder="0801 234 5678"
                    max={20}
                  />
                </Field>
                <Field label="Email (optional)" error={errors.email}>
                  <Input
                    value={data.email}
                    onChange={(v) => set("email", v)}
                    placeholder="you@email.com"
                    max={120}
                  />
                </Field>
                <Field label="City / area based" error={errors.city}>
                  <Input
                    value={data.city}
                    onChange={(v) => set("city", v)}
                    placeholder="e.g. Ikeja, Lagos"
                    max={80}
                  />
                </Field>
                <Field label="Driver's licence number" error={errors.licence}>
                  <Input
                    value={data.licence}
                    onChange={(v) => set("licence", v)}
                    placeholder="Licence number"
                    max={40}
                  />
                </Field>
                <Field label="Years of driving experience" error={errors.experience}>
                  <Input
                    value={data.experience}
                    onChange={(v) => set("experience", v)}
                    placeholder="e.g. 5"
                    max={20}
                  />
                </Field>
                <Field label="Vehicle type" error={errors.vehicle}>
                  <Select value={data.vehicle} onChange={(v) => set("vehicle", v)}>
                    <option value="">Select vehicle</option>
                    {VEHICLES.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Availability" error={errors.availability}>
                  <Select value={data.availability} onChange={(v) => set("availability", v)}>
                    <option value="">Select availability</option>
                    {AVAILABILITY.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </Select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Preferred routes (optional)" error={errors.routes}>
                    <Input
                      value={data.routes}
                      onChange={(v) => set("routes", v)}
                      placeholder="e.g. Lagos–Abuja, Lagos–Port Harcourt"
                      max={200}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Anything else we should know? (optional)" error={errors.about}>
                    <textarea
                      value={data.about}
                      rows={4}
                      maxLength={600}
                      onChange={(e) => set("about", e.target.value)}
                      placeholder="Previous logistics experience, references, vehicle details…"
                      className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                    />
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-accent disabled:pointer-events-none disabled:opacity-60"
              >
                {sending ? "Sending…" : "Submit application"}
              </button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Your details go straight to the LOTUS operations inbox.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  max,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  max?: number;
}) {
  return (
    <input
      value={value}
      maxLength={max}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
    />
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
    >
      {children}
    </select>
  );
}
