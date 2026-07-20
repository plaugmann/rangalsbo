import styles from './PhotoGrid.module.css'

const PLACEHOLDERS = [
  { label: 'The lake', tone: 'var(--brand-tile-lake)' },
  { label: 'The porch', tone: 'var(--brand-tile-porch)' },
  { label: 'Sun chairs', tone: 'var(--brand-tile-chairs)' },
  { label: 'The garden', tone: 'var(--brand-tile-garden)' },
  { label: 'The dock', tone: 'var(--brand-tile-dock)' },
  { label: 'The kitchen', tone: 'var(--brand-tile-kitchen)' },
]

export default function PhotoGrid() {
  return (
    <section className={styles.photoGrid}>
      {PLACEHOLDERS.map(({ label, tone }) => (
        <div key={label} className={styles.photo} style={{ background: tone }}>
          <span className={styles.caption}>{label}</span>
        </div>
      ))}
    </section>
  )
}
