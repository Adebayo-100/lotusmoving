export const SITE = {
  name: "LOTUS Moving Service",
  short: "LOTUS",
  tagline: "We Move What Matters.",
  whatsappNumber: "08137912310",
  whatsappIntl: "2348137912310",
  email: "hello@lotusmoving.ng",
  instagram: "https://instagram.com/LOTUS_MOVING_SERVICES",
  instagramHandle: "@LOTUS_MOVING_SERVICES",
  tiktok: "https://www.tiktok.com/@lotusmovingservices",
  tiktokHandle: "LOTUS MOVING SERVICES",
  city: "Lagos, Nigeria",
} as const;

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsappIntl}?text=${encodeURIComponent(message)}`;
}

export const SERVICES = [
  {
    slug: "home-relocation",
    title: "Home Relocation",
    blurb:
      "Studio to duplex. Trained crews, padded transit and a move captain who keeps you updated from the first box to the last.",
  },
  {
    slug: "office-relocation",
    title: "Office Relocation",
    blurb:
      "After-hours and weekend office moves with asset labelling, IT handling and zero downtime for your team.",
  },
  {
    slug: "packing",
    title: "Packing Services",
    blurb:
      "Full or partial packing with premium materials, room-by-room inventory and fragile-item specialists.",
  },
  {
    slug: "storage",
    title: "Storage Solutions",
    blurb:
      "Clean, secure, monitored short and long-term storage with scheduled retrieval whenever you need it.",
  },
  {
    slug: "delivery",
    title: "Delivery Services",
    blurb:
      "Single item, furniture and bulk deliveries across Lagos and beyond, handled with the same premium care.",
  },
] as const;
