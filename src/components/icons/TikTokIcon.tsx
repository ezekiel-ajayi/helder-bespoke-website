// src/components/icons/TikTokIcon.tsx
//
// lucide-react doesn't ship a TikTok mark, so this is a small hand-drawn
// stand-in sized and stroked to match the other lucide icons used in
// the footer (stroke-based, 24x24 viewBox, currentColor).

export default function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16.5 3c.3 1.9 1.6 3.3 3.5 3.6v3.1c-1.3 0-2.5-.4-3.5-1.1v6.7c0 3.1-2.5 5.7-5.7 5.7S5.1 17.4 5.1 14.3c0-3 2.4-5.5 5.4-5.7v3.2c-1.3.2-2.3 1.3-2.3 2.6 0 1.4 1.2 2.6 2.6 2.6s2.6-1.2 2.6-2.6V3h3.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
