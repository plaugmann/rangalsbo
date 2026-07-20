// Header wordmark. Width is set by the parent (.logo class in Header).
export default function Logo() {
  return (
    <svg viewBox="0 0 236 44" role="img" aria-label="Rangalsbo">
      <path d="M7 36 L22 10 L37 36" fill="none" stroke="var(--brand-fg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="30" r="4.5" fill="var(--brand-primary)" />
      <text x="52" y="32" fontFamily="var(--font-display)" fontSize="24" letterSpacing="1.5" fill="var(--brand-fg)">Rangalsbo</text>
    </svg>
  )
}
