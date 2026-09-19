// International format, digits only — no "+", spaces, or dashes.
const WHATSAPP_NUMBER = "2348000000000";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Helder Bespoke, I'd like to book a fitting.";
