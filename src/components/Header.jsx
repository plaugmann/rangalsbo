import Logo from './Logo'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}><Logo /></div>
    </header>
  )
}
