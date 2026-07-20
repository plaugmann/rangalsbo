import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Welcome to Rangalsbo</h1>
      <p className={styles.sub}>
        Our family's summer house in Rangalsro, Sweden — where the days are
        long and the pace is slow.
      </p>
    </section>
  )
}
