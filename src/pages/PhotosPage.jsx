import styles from './PhotosPage.module.css'

const PHOTOS = [
  { id: 'exterior', label: 'Exterior, summer', col: 2, row: 2, tone: '#BDA79E', fg: '#040403' },
  { id: 'lake', label: 'The lake', col: 2, row: 1, tone: '#416F8B', fg: '#FBF8EF' },
  { id: 'dock', label: 'The dock', col: 2, row: 1, tone: '#5C87A0', fg: '#FBF8EF' },
  { id: 'living', label: 'Living room', col: 2, row: 2, tone: '#D6C9C0', fg: '#040403' },
  { id: 'kitchen', label: 'Kitchen', col: 2, row: 1, tone: '#F1EAD9', fg: '#040403' },
  { id: 'bedroom', label: 'Bedroom', col: 1, row: 1, tone: '#E8DACB', fg: '#040403' },
  { id: 'fireplace', label: 'Fireplace', col: 1, row: 1, tone: '#E2D8C7', fg: '#040403' },
  { id: 'forest', label: 'The forest trail', col: 2, row: 2, tone: '#7D8C8F', fg: '#FBF8EF' },
  { id: 'garden', label: 'Garden', col: 2, row: 1, tone: '#BDA79E', fg: '#040403' },
  { id: 'sunset', label: 'Evening light on the lake', col: 2, row: 1, tone: '#416F8B', fg: '#FBF8EF' },
  { id: 'boathouse', label: 'Boat house', col: 2, row: 1, tone: '#D6C9C0', fg: '#040403' },
  { id: 'winter', label: 'Winter at Rangalsro', col: 2, row: 1, tone: '#5C87A0', fg: '#FBF8EF' },
]

export default function PhotosPage() {
  return (
    <>
      <section className={styles.intro}>
        <h1 className={styles.title}>Photos</h1>
        <p className={styles.lede}>A look at the house, the lake, and the light &mdash; in every season.</p>
      </section>

      <section className={styles.gallery}>
        {PHOTOS.map(({ id, label, col, row, tone, fg }) => (
          <div
            key={id}
            className={styles.photo}
            style={{ gridColumn: `span ${col}`, gridRow: `span ${row}`, background: tone }}
          >
            <span className={styles.caption} style={{ color: fg }}>{label}</span>
          </div>
        ))}
      </section>
    </>
  )
}
