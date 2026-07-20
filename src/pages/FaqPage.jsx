import { Link } from 'react-router-dom'
import styles from './FaqPage.module.css'

const FAQS = [
  {
    id: 'check-in-times',
    q: 'What time is check-in and check-out?',
    a: 'Check-in is from [3:00 PM], check-out by [11:00 AM]. Full door-code details are in the User’s Guide.',
  },
  {
    id: 'wifi',
    q: 'Is there wifi?',
    a: 'Yes — the network name and password are in the User’s Guide, and printed on a card by the router.',
  },
  {
    id: 'pets',
    q: 'Are pets allowed?',
    a: '[Yes, well-behaved dogs are welcome — just let us know beforehand.]',
  },
  {
    id: 'ev-charging',
    q: 'Can I charge an electric car?',
    a: (
      <>
        Yes, there&rsquo;s a charger on site &mdash; see the <Link to="/users-guide">User&rsquo;s Guide</Link> for how to use it.
      </>
    ),
  },
  {
    id: 'what-to-bring',
    q: 'What should I bring?',
    a: '[Just yourself, really — linens, towels, and firewood are provided. Bring swimwear and a good book.]',
  },
]

export default function FaqPage() {
  return (
    <>
      <section className={styles.intro}>
        <h1 className={styles.title}>Frequently asked questions</h1>
        <p className={styles.lede}>
          The short answers to what guests ask most. For the full run-through of everything in the house, see the{' '}
          <Link to="/users-guide">User&rsquo;s Guide</Link>.
        </p>
      </section>

      <section className={styles.list}>
        {FAQS.map(({ id, q, a }) => (
          <details key={id} className={styles.item}>
            <summary className={styles.summary}>
              {q}
              <span aria-hidden="true" className={styles.plus}>+</span>
            </summary>
            <p className={styles.answer}>{a}</p>
          </details>
        ))}
      </section>

      <section className={styles.cta}>
        <h2>Need the full house manual?</h2>
        <p>Door codes, wifi, the fireplace, the wine fridge, and everything else &mdash; it&rsquo;s all in the User&rsquo;s Guide.</p>
        <Link to="/users-guide" className={styles.ctaBtn}>Open the User&rsquo;s Guide</Link>
      </section>
    </>
  )
}
