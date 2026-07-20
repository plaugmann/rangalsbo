import styles from './PhotoGrid.module.css'

const PLACEHOLDERS = [
  { label: 'The meadow', tone: '#E3E8DC' },
  { label: 'The porch', tone: '#EDE4D4' },
  { label: 'The lake', tone: '#DCE3DA' },
  { label: 'Midsummer', tone: '#EAE0CE' },
  { label: 'The garden', tone: '#E6E9DF' },
  { label: 'The kitchen', tone: '#EFE7D9' },
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
