import styles from './ComingSoon.module.css'

export default function ComingSoon({ title }) {
  return (
    <section className={styles.coming}>
      <h1>{title}</h1>
      <p>
        This page is coming soon &mdash; drop the matching <code>.dc.html</code> export
        into <code>handoff/</code> and I&apos;ll lift the design in.
      </p>
    </section>
  )
}
