import { SITE } from "./site";

export type BookingDetails = {
  reference: string;
  fullName: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  service: string;
  pickup: string;
  destination: string;
  moveSize: string;
  date: string;
  propertyType?: string;
  floor?: string;
  elevator?: string;
  packing?: string;
  storage?: string;
  notes?: string;
};

const BASE_RATES: Record<string, number> = {
  "Single item": 45000,
  "Studio / 1 bedroom": 110000,
  "2 bedrooms": 180000,
  "3 bedrooms": 260000,
  "4+ bedrooms": 360000,
  "Small office": 280000,
  "Large office": 550000,
};

export type LineItem = { label: string; amount: number; note?: string };

export function makeReference(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0] ?? "")
    .join("")
    .toUpperCase();
  const stamp = Date.now().toString(36).slice(-5).toUpperCase();
  return `LMS-${initials || "LM"}-${stamp}`;
}

export function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

/** Indicative estimate — a consultant confirms the final figure. */
export function estimateLines(d: BookingDetails): LineItem[] {
  const base = BASE_RATES[d.moveSize] ?? 120000;
  const lines: LineItem[] = [
    { label: `${d.service || "Relocation"} — ${d.moveSize || "Custom scope"}`, amount: base },
    {
      label: "Logistics, crew & padded transit",
      amount: Math.round(base * 0.18),
      note: `${d.pickup} → ${d.destination}`,
    },
  ];
  if (d.packing === "Yes")
    lines.push({ label: "Professional packing & materials", amount: Math.round(base * 0.25) });
  if (d.storage === "Yes")
    lines.push({ label: "Secure storage (per month)", amount: 55000 });
  if (d.elevator === "No" && d.floor && !/ground|^0$/i.test(d.floor))
    lines.push({ label: `Stair handling — ${d.floor}`, amount: 20000 });
  return lines;
}

export function estimateTotal(lines: LineItem[]) {
  return lines.reduce((sum, l) => sum + l.amount, 0);
}

function esc(value: string) {
  return value.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] ?? c);
}

export function buildInvoiceHtml(d: BookingDetails) {
  const lines = estimateLines(d);
  const total = estimateTotal(lines);
  const issued = new Date().toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const rows = lines
    .map(
      (l) => `<tr><td><strong>${esc(l.label)}</strong>${
        l.note ? `<div class="note">${esc(l.note)}</div>` : ""
      }</td><td class="amt">${formatNaira(l.amount)}</td></tr>`,
    )
    .join("");

  const detail = (k: string, v?: string) =>
    v ? `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>` : "";

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<title>Proforma Invoice ${esc(d.reference)} — ${esc(SITE.name)}</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;padding:40px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#12211c;background:#fdfaf3}
  .sheet{max-width:760px;margin:0 auto;background:#fff;border:1px solid #e6e0d3;border-radius:20px;padding:44px}
  header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;border-bottom:2px solid #0d6b4f;padding-bottom:20px}
  h1{margin:0;font-size:22px;color:#0d6b4f;letter-spacing:.02em}
  .muted{color:#6b7671;font-size:13px;margin:4px 0 0}
  .badge{background:#0d6b4f;color:#fff;border-radius:999px;padding:6px 14px;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
  dl{display:grid;grid-template-columns:1fr 1fr;gap:14px 28px;margin:26px 0 0}
  dt{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8a938e;margin:0}
  dd{margin:4px 0 0;font-size:14px;font-weight:600}
  table{width:100%;border-collapse:collapse;margin-top:30px}
  th{ text-align:left;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8a938e;border-bottom:1px solid #e6e0d3;padding-bottom:8px}
  td{padding:14px 0;border-bottom:1px solid #f0ece2;font-size:14px;vertical-align:top}
  .amt{text-align:right;white-space:nowrap}
  .note{font-weight:400;color:#6b7671;font-size:12px;margin-top:4px}
  .total{display:flex;justify-content:space-between;align-items:center;margin-top:22px;padding:18px 22px;background:#0d6b4f;color:#fff;border-radius:14px;font-size:18px;font-weight:700}
  footer{margin-top:28px;font-size:12px;color:#6b7671;line-height:1.7}
  @media print{body{background:#fff;padding:0}.sheet{border:0;border-radius:0}}
</style></head>
<body><div class="sheet">
  <header>
    <div>
      <h1>${esc(SITE.name)}</h1>
      <p class="muted">${esc(SITE.tagline)}<br/>${esc(SITE.city)} — ${esc(SITE.coverage)}<br/>${esc(SITE.whatsappNumber)} · ${esc(SITE.email)}</p>
    </div>
    <div style="text-align:right">
      <span class="badge">Proforma Invoice</span>
      <p class="muted"><strong>${esc(d.reference)}</strong><br/>Issued ${esc(issued)}</p>
    </div>
  </header>

  <dl>
    ${detail("Billed to", d.fullName)}
    ${detail("Phone", d.phone)}
    ${detail("Email", d.email)}
    ${detail("Move date", d.date)}
    ${detail("Pickup", d.pickup)}
    ${detail("Destination", d.destination)}
    ${detail("Property", [d.propertyType, d.floor].filter(Boolean).join(" · "))}
    ${detail("Move size", d.moveSize)}
  </dl>

  <table>
    <thead><tr><th>Description</th><th class="amt">Estimate</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="total"><span>Estimated total</span><span>${formatNaira(total)}</span></div>

  <footer>
    This is an indicative proforma estimate based on the details you submitted. A LOTUS move
    consultant confirms the final figure after reviewing access, distance and inventory — no
    payment is due until you approve that confirmation.<br/>
    Reminder: we will contact you ahead of <strong>${esc(d.date)}</strong> to confirm crew and timing.
  </footer>
</div></body></html>`;
}

function icsDate(date: string, time: string) {
  return `${date.replace(/-/g, "")}T${time}`;
}

/** Calendar reminder with alerts 7 days and 1 day before the move. */
export function buildReminderIcs(d: BookingDetails) {
  const uid = `${d.reference}@lotusmoving`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const start = icsDate(d.date, "080000");
  const end = icsDate(d.date, "140000");
  const desc = [
    `LOTUS Moving Service — ${d.service}`,
    `Reference: ${d.reference}`,
    `Pickup: ${d.pickup}`,
    `Destination: ${d.destination}`,
    `Contact: ${SITE.whatsappNumber}`,
  ].join("\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LOTUS Moving Service//Booking//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Moving day with LOTUS (${d.reference})`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${d.pickup}`,
    "BEGIN:VALARM",
    "TRIGGER:-P7D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Your LOTUS move is in one week — confirm packing and access.",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Your LOTUS move is tomorrow — crew arrives from 8am.",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function openInvoiceForPrint(html: string) {
  const win = window.open("", "_blank", "noopener,noreferrer,width=900,height=1000");
  if (!win) return false;
  win.document.write(html);
  win.document.close();
  return true;
}
