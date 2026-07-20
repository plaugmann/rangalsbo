import Logo from './Logo'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/house', label: 'The House' },
  { to: '/photos', label: 'Photos' },
  { to: '/things-to-do', label: 'Things To Do' },
  { to: '/where-to-eat', label: 'Where To Eat' },
  { to: '/users-guide', label: 'User\u2019s Guide' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const isHome = useLocation().pathname === '/'
  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.topRowLeft}>
          {!isHome && (
            <NavLink to="/" className={styles.backLink}>{'\u2190 Home'}</NavLink>
          )}
        </div>
        <div className={styles.logo}>
          <NavLink to="/" aria-label="Home">
            <Logo />
          </NavLink>
        </div>
        <a href="#book" className={styles.bookBtn}>Book your stay</a>
      </div>
      <nav className={styles.nav}>
        {NAV.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.navLink}${isActive ? ' ' + styles.navLinkActive : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
