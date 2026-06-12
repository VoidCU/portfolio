/**
 * VOL.08 — FIELD NOTES motif (brief §5): journal rules.
 * Horizontal ruled lines + a doubled margin rule, like a field journal page.
 * Rendered inside VolumePlate's 4%-opacity motif slot — server-safe, zero JS.
 * `id` must be unique per usage (SVG pattern ids are document-global).
 */
export default function JournalRules({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" className="h-full w-full text-ink">
      <defs>
        <pattern
          id={id}
          width="80"
          height="34"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="33.5"
            x2="80"
            y2="33.5"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      {/* ruled page */}
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {/* doubled margin rule */}
      <line x1="12%" y1="0" x2="12%" y2="100%" stroke="currentColor" strokeWidth="1" />
      <line x1="12.6%" y1="0" x2="12.6%" y2="100%" stroke="currentColor" strokeWidth="1" />
      {/* binding ticks along the margin */}
      <line x1="10.4%" y1="20%" x2="12%" y2="20%" stroke="currentColor" strokeWidth="1" />
      <line x1="10.4%" y1="50%" x2="12%" y2="50%" stroke="currentColor" strokeWidth="1" />
      <line x1="10.4%" y1="80%" x2="12%" y2="80%" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
