import Logo from './Logo'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <span aria-hidden="true" />
      <div className={styles.logo}><Logo /></div>
      <a href="#book" className={styles.bookBtn}>Book your stay</a>
    </header>
  )
}
