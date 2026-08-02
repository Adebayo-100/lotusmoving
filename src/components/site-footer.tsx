import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/lotus-logo.jpg.asset.json";
import { SERVICES, SITE, waLink } from "@/lib/site";
import { InstagramIcon, TiktokIcon, WhatsappIcon } from "@/components/social-icons";

export function SiteFooter() {
  return (
    <footer className="bg-forest-gradient text-primary-foreground">
      <div className="container-lotus grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="LOTUS Moving Service logo"
              width={48}
              height={48}
              loading="lazy"
              className="h-12 w-12 rounded-full bg-white object-contain p-1"
            />

            <div>
              <p className="font-display text-lg font-bold">LOTUS</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
                Moving Service
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
            {SITE.tagline} Premium, technology-driven relocation for homes and businesses — from
            Lagos to anywhere in Nigeria.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="LOTUS on Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="LOTUS on TikTok"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <TiktokIcon className="h-5 w-5" />
            </a>
            <a
              href={waLink("Hello LOTUS 👋 I'd like to talk about a move.")}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with LOTUS on WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <WhatsappIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Services
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to="/services" hash={s.slug} className="transition-colors hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Company
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
            <li>
              <Link to="/about" className="transition-colors hover:text-gold">
                About LOTUS
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="transition-colors hover:text-gold">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/blog" className="transition-colors hover:text-gold">
                Moving Journal
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-gold">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/drivers" className="transition-colors hover:text-gold">
                Drive With Us
              </Link>
            </li>
            <li>
              <Link to="/book" className="transition-colors hover:text-gold">
                Book a Move
              </Link>
            </li>
          </ul>

        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Talk to us
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-primary-foreground/75">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${SITE.whatsappNumber}`} className="hover:text-gold">
                {SITE.whatsappNumber}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {SITE.city} — {SITE.coverage}
              </span>
            </li>

          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-lotus flex flex-col items-center justify-between gap-3 py-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
