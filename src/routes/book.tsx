import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarClock, Check, FileText, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { SERVICES, sendToFormspree } from "@/lib/site";
import {
  buildInvoiceHtml,
  buildReminderIcs,
  downloadFile,
  estimateLines,
  estimateTotal,
  formatNaira,
  makeReference,
  openInvoiceForPrint,
  type BookingDetails,
} from "@/lib/booking-doc";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Move | LOTUS Moving Service" },
      {
        name: "description",
        content:
          "Book your home or office move with LOTUS in four simple steps and continue on WhatsApp for a personalised consultation.",
      },
      { property: "og:title", content: "Book a Move | LOTUS Moving Service" },
      {
        property: "og:description",
        content: "Four simple steps, then a real LOTUS consultant on WhatsApp.",
      },
    ],
  }),
  component: BookPage,
});

const MOVE_SIZES = [
  "Single item",
  "Studio / 1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
  "4+ bedrooms",
  "Small office",
  "Large office",
];
const PROPERTY_TYPES = ["Apartment", "Duplex", "Bungalow", "Office", "Warehouse", "Storage unit"];
const YES_NO = ["Yes", "No"];

const step1Schema = z.object({
  service: z.string().min(1, "Select a service"),
  pickup: z.string().trim().min(3, "Enter a pickup address").max(200),
  destination: z.string().trim().min(3, "Enter a destination address").max(200),
  moveSize: z.string().min(1, "Select a move size"),
  date: z.string().min(1, "Choose a preferred date"),
});

const step2Schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number"),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid WhatsApp number"),
  email: z.union([z.string().trim().email("Enter a valid email").max(120), z.literal("")]),
});

const step3Schema = z.object({
  propertyType: z.string().min(1, "Select a property type"),
  floor: z.string().trim().max(20),
  elevator: z.string().min(1, "Select an option"),
  packing: z.string().min(1, "Select an option"),
  storage: z.string().min(1, "Select an option"),
  notes: z.string().trim().max(600),
});

type Form = z.infer<typeof step1Schema> & z.infer<typeof step2Schema> & z.infer<typeof step3Schema>;

const EMPTY: Form = {
  service: "",
  pickup: "",
  destination: "",
  moveSize: "",
  date: "",
  fullName: "",
  phone: "",
  whatsapp: "",
  email: "",
  propertyType: "",
  floor: "",
  elevator: "",
  packing: "",
  storage: "",
  notes: "",
};

const STEP_LABELS = ["Move Details", "Customer Information", "Additional Details", "Review"];

function BookPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  const set = (k: keyof Form, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const preview = useMemo(() => {
    const details: BookingDetails = {
      reference: "LMS-PREVIEW",
      fullName: data.fullName,
      phone: data.phone,
      service: data.service,
      pickup: data.pickup,
      destination: data.destination,
      moveSize: data.moveSize,
      date: data.date,
      propertyType: data.propertyType,
      floor: data.floor,
      elevator: data.elevator,
      packing: data.packing,
      storage: data.storage,
    };
    const lines = estimateLines(details);
    return { lines, total: estimateTotal(lines) };
  }, [data]);

  const submit = async () => {
    if (sending) return;
    setSending(true);
    const details: BookingDetails = {
      reference: makeReference(data.fullName),
      fullName: data.fullName,
      phone: data.phone,
      whatsapp: data.whatsapp,
      email: data.email,
      service: data.service,
      pickup: data.pickup,
      destination: data.destination,
      moveSize: data.moveSize,
      date: data.date,
      propertyType: data.propertyType,
      floor: data.floor || "Ground",
      elevator: data.elevator,
      packing: data.packing,
      storage: data.storage,
      notes: data.notes || "—",
    };
    const lines = estimateLines(details);
    const ok = await sendToFormspree({
      _subject: `Move booking ${details.reference} — ${details.fullName}`,
      _replyto: details.email || "",
      formType: "Move booking request",
      reference: details.reference,
      name: details.fullName,
      phone: details.phone,
      whatsapp: details.whatsapp ?? "",
      email: details.email || "—",
      service: details.service,
      pickup: details.pickup,
      destination: details.destination,
      moveSize: details.moveSize,
      preferredDate: details.date,
      propertyType: details.propertyType ?? "",
      floor: details.floor ?? "",
      elevator: details.elevator ?? "",
      packing: details.packing ?? "",
      storage: details.storage ?? "",
      notes: details.notes ?? "",
      estimateBreakdown: lines.map((l) => `${l.label}: ${formatNaira(l.amount)}`).join(" | "),
      estimatedTotal: formatNaira(estimateTotal(lines)),
    });
    setSending(false);
    if (!ok) {
      toast.error("We couldn't submit your request. Please check your connection and try again.");
      return;
    }
    setBooking(details);
    toast.success(`Booking ${details.reference} received — your invoice is ready.`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const validate = (i: number) => {
    const schema = [step1Schema, step2Schema, step3Schema][i];
    if (!schema) return true;
    const result = schema.safeParse(data);
    if (result.success) return true;
    const next: Record<string, string> = {};
    for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
    setErrors(next);
    toast.error("Please complete the highlighted fields.");
    return false;
  };

  const next = () => {
    if (!validate(step)) return;
    setStep((s) => Math.min(3, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-background pb-24 pt-32 lg:pt-40">
      <div className="container-lotus max-w-3xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Booking</p>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Book your move</h1>
          <p className="mt-4 text-muted-foreground">
            Four short steps. When you're done, we open WhatsApp with your details so a consultant
            can send a personalised quotation.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-4 gap-2">
          {STEP_LABELS.map((label, i) => (
            <div key={label}>
              <div
                className={cn(
                  "h-1.5 rounded-full transition-colors duration-500",
                  i <= step ? "bg-primary" : "bg-border",
                )}
              />
              <p
                className={cn(
                  "mt-3 hidden text-xs font-medium sm:block",
                  i <= step ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {i + 1}. {label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm font-medium sm:hidden">
          Step {step + 1} of 4 — {STEP_LABELS[step]}
        </p>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          {step === 0 && (
            <div className="grid gap-6">
              <Field label="Service" error={errors.service}>
                <Select value={data.service} onChange={(v) => set("service", v)}>
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Pickup address" error={errors.pickup}>
                <Input
                  value={data.pickup}
                  onChange={(v) => set("pickup", v)}
                  placeholder="e.g. 12 Admiralty Way, Lekki Phase 1"
                />
              </Field>
              <Field label="Destination address" error={errors.destination}>
                <Input
                  value={data.destination}
                  onChange={(v) => set("destination", v)}
                  placeholder="e.g. 4 Glover Road, Ikoyi"
                />
              </Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Move size" error={errors.moveSize}>
                  <Select value={data.moveSize} onChange={(v) => set("moveSize", v)}>
                    <option value="">Select size</option>
                    {MOVE_SIZES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Preferred date" error={errors.date}>
                  <Input type="date" value={data.date} onChange={(v) => set("date", v)} />
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6">
              <Field label="Full name" error={errors.fullName}>
                <Input
                  value={data.fullName}
                  onChange={(v) => set("fullName", v)}
                  placeholder="Your name"
                />
              </Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Phone number" error={errors.phone}>
                  <Input
                    type="tel"
                    value={data.phone}
                    onChange={(v) => set("phone", v)}
                    placeholder="0801 234 5678"
                  />
                </Field>
                <Field label="WhatsApp number" error={errors.whatsapp}>
                  <Input
                    type="tel"
                    value={data.whatsapp}
                    onChange={(v) => set("whatsapp", v)}
                    placeholder="0801 234 5678"
                  />
                </Field>
              </div>
              <Field label="Email (optional)" error={errors.email}>
                <Input
                  type="email"
                  value={data.email}
                  onChange={(v) => set("email", v)}
                  placeholder="you@email.com"
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Property type" error={errors.propertyType}>
                  <Select value={data.propertyType} onChange={(v) => set("propertyType", v)}>
                    <option value="">Select type</option>
                    {PROPERTY_TYPES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Floor number" error={errors.floor}>
                  <Input
                    value={data.floor}
                    onChange={(v) => set("floor", v)}
                    placeholder="e.g. 3rd floor"
                  />
                </Field>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                <Field label="Elevator available" error={errors.elevator}>
                  <Select value={data.elevator} onChange={(v) => set("elevator", v)}>
                    <option value="">Select</option>
                    {YES_NO.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Packing needed" error={errors.packing}>
                  <Select value={data.packing} onChange={(v) => set("packing", v)}>
                    <option value="">Select</option>
                    {YES_NO.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Storage needed" error={errors.storage}>
                  <Select value={data.storage} onChange={(v) => set("storage", v)}>
                    <option value="">Select</option>
                    {YES_NO.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <Field label="Special instructions" error={errors.notes}>
                <textarea
                  value={data.notes}
                  maxLength={600}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={4}
                  placeholder="Fragile items, parking access, timing preferences…"
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-xl font-semibold">Review your move</h2>
              <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {[
                  ["Service", data.service],
                  ["Pickup", data.pickup],
                  ["Destination", data.destination],
                  ["Move size", data.moveSize],
                  ["Preferred date", data.date],
                  ["Full name", data.fullName],
                  ["Phone", data.phone],
                  ["WhatsApp", data.whatsapp],
                  ["Email", data.email || "—"],
                  ["Property type", data.propertyType],
                  ["Floor", data.floor || "Ground"],
                  ["Elevator", data.elevator],
                  ["Packing", data.packing],
                  ["Storage", data.storage],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-border pb-3">
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">{v}</dd>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Special instructions
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{data.notes || "—"}</dd>
                </div>
              </dl>

              <a
                href={waLink(message)}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  toast.success("Opening WhatsApp with your move details…");
                  void sendToFormspree({
                    _subject: `Move booking — ${data.fullName}`,
                    formType: "Move booking request",
                    name: data.fullName,
                    phone: data.phone,
                    whatsapp: data.whatsapp,
                    email: data.email || "—",
                    service: data.service,
                    pickup: data.pickup,
                    destination: data.destination,
                    moveSize: data.moveSize,
                    preferredDate: data.date,
                    propertyType: data.propertyType,
                    floor: data.floor || "Ground",
                    elevator: data.elevator,
                    packing: data.packing,
                    storage: data.storage,
                    notes: data.notes || "—",
                  });
                }}
                className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground shadow-soft transition-all duration-300 hover:-translate-y-1"
              >
                <WhatsappIcon className="h-5 w-5" />
                Continue to WhatsApp
              </a>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                A LOTUS consultant reviews your details and sends a personalised quotation on
                WhatsApp.
              </p>
            </div>
          )}

          <div className="mt-9 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={next}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
              >
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Check className="h-4 w-4 text-accent" /> Ready to send
              </span>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Prefer to talk first?{" "}
          <Link to="/contact" className="font-semibold text-primary hover:text-accent">
            Contact our team
          </Link>
          .
        </p>
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
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      maxLength={200}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
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
      className="w-full appearance-none rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
    >
      {children}
    </select>
  );
}
