// Header wordmark. Width is set by the parent (.logo class in Header).
export default function Logo() {
  return (
    <svg viewBox="0 0 270 54" role="img" aria-label="Rangalsro">
      <rect x="10" y="6" width="20" height="34" rx="2" fill="none" stroke="var(--brand-accent)" strokeWidth="1.75" />
      <rect x="14" y="10" width="12" height="10" rx="0.5" fill="none" stroke="var(--brand-accent)" strokeWidth="1.25" />
      <line x1="20" y1="10" x2="20" y2="20" stroke="var(--brand-accent)" strokeWidth="1" />
      <line x1="14" y1="15" x2="26" y2="15" stroke="var(--brand-accent)" strokeWidth="1" />
      <circle cx="16" cy="26" r="1.4" fill="var(--brand-accent)" />
      <text x="36" y="41" fontFamily="var(--font-display)" fontSize="43" letterSpacing="0.5" fill="var(--brand-fg)">Rangalsro</text>
    </svg>
  )
}
