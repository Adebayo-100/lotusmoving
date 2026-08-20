import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { InstagramIcon, TiktokIcon, WhatsappIcon } from "@/components/social-icons";
import { SITE, sendToFormspree, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact LOTUS Moving Service | Lagos, Nigeria" },
      {
        name: "description",
        content:
          "Talk to the LOTUS team about your home or office move. Call, email, or message us on WhatsApp, Instagram or TikTok.",
      },
      { property: "og:title", content: "Contact LOTUS Moving Service" },
      {
        property: "og:description",
        content: "Reach the LOTUS team on WhatsApp, phone, email or social.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number"),
  message: z.string().trim().min(5, "Tell us a little about your move").max(600),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setSending(true);
    const ok = await sendToFormspree({
      _subject: `Website enquiry — ${result.data.name}`,
      formType: "Contact enquiry",
      name: result.data.name,
      phone: result.data.phone,
      message: result.data.message,
    });
    setSending(false);
    if (!ok) {
      toast.error("We couldn't send your message. Please try again in a moment.");
      return;
    }
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
    toast.success("Message sent — we'll reply shortly.");
  };



  return (
    <div className="pb-24 pt-32 lg:pt-40">
      <div className="container-lotus grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Contact</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05]">
            Let's plan your move.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Message us and a move consultant will respond quickly — usually within the hour during
            working days.
          </p>

          <ul className="mt-10 space-y-5 text-sm">
            <li className="flex items-start gap-4">
              <Phone className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <p className="font-semibold">Call or WhatsApp</p>
                <a href={`tel:${SITE.whatsappNumber}`} className="text-muted-foreground">
                  {SITE.whatsappNumber}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <p className="font-semibold">Email</p>
                <a href={`mailto:${SITE.email}`} className="text-muted-foreground">
                  {SITE.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <p className="font-semibold">Base &amp; coverage</p>
                <p className="text-muted-foreground">{SITE.city} — {SITE.coverage}</p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <Clock className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <p className="font-semibold">Hours</p>
                <p className="text-muted-foreground">Mon – Sat, 8am – 7pm</p>
              </div>
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
            >
              <InstagramIcon className="h-4 w-4" /> {SITE.instagramHandle}
            </a>
            <a
              href={SITE.tiktok}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
            >
              <TiktokIcon className="h-4 w-4" /> {SITE.tiktokHandle}
            </a>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <form
            onSubmit={submit}
            className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10"
          >
            <h2 className="font-display text-2xl font-semibold">Send a quick message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll continue the conversation on WhatsApp.
            </p>

            <div className="mt-7 grid gap-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Full name</span>
                <input
                  value={form.name}
                  maxLength={80}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="Your name"
                />
                {errors.name && <span className="mt-2 block text-xs text-destructive">{errors.name}</span>}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Phone number</span>
                <input
                  value={form.phone}
                  maxLength={20}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="0801 234 5678"
                />
                {errors.phone && (
                  <span className="mt-2 block text-xs text-destructive">{errors.phone}</span>
                )}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Message</span>
                <textarea
                  value={form.message}
                  rows={4}
                  maxLength={600}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="What are you moving, and when?"
                />
                {errors.message && (
                  <span className="mt-2 block text-xs text-destructive">{errors.message}</span>
                )}
              </label>
            </div>

            {sent && (
              <p className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4 text-sm font-medium text-primary">
                Message received — a move consultant will reply shortly.
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-1 disabled:pointer-events-none disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Planning a full relocation?{" "}
              <Link to="/book" className="font-semibold text-primary">
                Use the booking form
              </Link>{" "}
              for a faster quotation.
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
