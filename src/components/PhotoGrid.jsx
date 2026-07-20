import styles from './PhotoGrid.module.css'

const PLACEHOLDERS = [
  { label: 'The lake', tone: '#BDA79E', fg: '#040403' },
  { label: 'The porch', tone: '#416F8B', fg: '#FBF8EF' },
  { label: 'Sun chairs', tone: '#D6C9C0', fg: '#040403' },
  { label: 'The garden', tone: '#BDA79E', fg: '#040403' },
  { label: 'The dock', tone: '#5C87A0', fg: '#FBF8EF' },
  { label: 'The kitchen', tone: '#D6C9C0', fg: '#040403' },
]

export default function PhotoGrid() {
  return (
    <section className={styles.photoGrid}>
      {PLACEHOLDERS.map(({ label, tone, fg }) => (
        <div key={label} className={styles.photo} style={{ background: tone }}>
          <span className={styles.caption} style={{ color: fg }}>{label}</span>
        </div>
      ))}
    </section>
  )
}
