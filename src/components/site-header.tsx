import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/lotus-logo.jpg.asset.json";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { InstagramIcon, TiktokIcon } from "@/components/social-icons";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/drivers", label: "Drivers" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;


export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const overlay = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass shadow-soft" : "border-b border-transparent",
        !overlay && !scrolled && "bg-background",
      )}
    >
      <div className="container-lotus grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label={`${SITE.name} home`}>
          <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-border">
            <img
              src={logo.url}
              alt="LOTUS Moving Service logo"
              width={44}
              height={44}
              className="h-full w-full scale-[1.45] object-contain"
            />
          </span>


          <span className="min-w-0">
            <span
              className={cn(
                "block truncate font-display text-lg font-bold tracking-tight transition-colors",
                overlay ? "text-primary-foreground" : "text-foreground",
              )}
            >
              LOTUS
            </span>
            <span
              className={cn(
                "block truncate text-[10px] font-medium uppercase tracking-[0.22em] transition-colors",
                overlay ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              Moving Service
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1 lg:gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  overlay
                    ? "text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
                activeProps={{
                  className: cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium",
                    overlay ? "text-primary-foreground" : "text-foreground",
                  ),
                }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-1 pl-1 lg:flex">
            <SocialLink
              href={SITE.instagram}
              label="LOTUS on Instagram"
              overlay={overlay}
              icon={<InstagramIcon className="h-4.5 w-4.5" />}
            />
            <SocialLink
              href={SITE.tiktok}
              label="LOTUS on TikTok"
              overlay={overlay}
              icon={<TiktokIcon className="h-4.5 w-4.5" />}
            />
          </div>

          <Link
            to="/book"
            className="ml-1 hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent sm:inline-flex"
          >
            Book Now
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors lg:hidden",
              overlay
                ? "text-primary-foreground hover:bg-white/10"
                : "text-foreground hover:bg-secondary",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass border-t border-border/60 lg:hidden">
          <nav className="container-lotus flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3">
              <Link
                to="/book"
                className="flex-1 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Book Now
              </Link>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="LOTUS on Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="LOTUS on TikTok"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground"
              >
                <TiktokIcon className="h-5 w-5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function SocialLink({
  href,
  label,
  icon,
  overlay,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  overlay: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5",
        overlay
          ? "text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-primary",
      )}
    >
      {icon}
    </a>
  );
}
