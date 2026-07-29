import { SITE, waLink } from "@/lib/site";
import { InstagramIcon, TiktokIcon, WhatsappIcon } from "@/components/social-icons";

export function FloatingActions() {
  return (
    <>
      {/* Desktop-only social rail — kept clear of the WhatsApp button */}
      <div className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="glass pointer-events-auto flex flex-col items-center gap-2 rounded-full p-2 shadow-soft">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="LOTUS on Instagram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-secondary hover:text-primary"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE.tiktok}
            target="_blank"
            rel="noreferrer"
            aria-label="LOTUS on TikTok"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-secondary hover:text-primary"
          >
            <TiktokIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <a
        href={waLink(`Hello LOTUS 👋 I'd like to ask about ${SITE.short} moving services.`)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with LOTUS on WhatsApp"
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lift transition-transform duration-300 hover:scale-110"
      >
        <WhatsappIcon className="h-7 w-7" />
      </a>
    </>
  );
}
