import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} aria-hidden="true" />
      <h1 className={styles.title}>A red house by the water</h1>
      <p className={styles.sub}>
        Where the days are long and nobody&rsquo;s in a hurry.
      </p>
    </section>
  )
}
