/**
 * Shared navigation arrow for carousels.
 * Elegant thin chevron with a small diamond accent — jewellery-themed.
 */
export default function NavArrow({ direction = "right" }: { direction?: "left" | "right" }) {
  const flip = direction === "left";
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Thin chevron */}
      <path
        d="M11 6l8 8-8 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small diamond accent at the tip */}
      <path
        d="M19 14l2.5-2.5L24 14l-2.5 2.5z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}
