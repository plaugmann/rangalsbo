import styles from './ContactPage.module.css'

export default function ContactPage() {
  return (
    <>
      <section className={styles.intro}>
        <h1 className={styles.title}>Contact the owner</h1>
        <p className={styles.lede}>
          Questions before, during, or after your stay &mdash; reach out any time.
        </p>
      </section>

      <section className={styles.contact}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label className={styles.field}>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label className={styles.field}>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label className={styles.field}>
            Message
            <textarea rows="5" placeholder="How can we help?" />
          </label>
          <button type="submit" className={styles.submitBtn}>Send message</button>
        </form>

        <div className={styles.sidebar}>
          <div className={styles.card}>
            <h2>Booking request</h2>
            <p>
              Email <a href="mailto:booking@rangalsro.se">booking@rangalsro.se</a>
              <br />Owner will usually answer within 24 hours.
            </p>
            <a href="#" className={styles.cardLink}>See availability &amp; book your stay &rarr;</a>
          </div>
          <div className={styles.card}>
            <h2>During your stay</h2>
            <p>
              For anything urgent while you&rsquo;re at the house, call or text Ea at{' '}
              <a href="tel:+4528707014">+45 28 70 70 14</a> or email{' '}
              <a href="mailto:ea@rangalsro.se">ea@rangalsro.se</a> &mdash; that&rsquo;s the fastest way to reach us.
            </p>
          </div>
          <div className={styles.card}>
            <h2>Emergencies</h2>
            <p>For anything life-threatening, call 112. Otherwise reach us and we&rsquo;ll sort it out.</p>
          </div>
        </div>
      </section>
    </>
  )
}
