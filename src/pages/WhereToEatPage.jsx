import { Link } from 'react-router-dom'
import styles from './WhereToEatPage.module.css'

const AT_HOUSE = [
  {
    id: 'grocery',
    title: 'Grocery run',
    text: 'Nearest shop is [name], [distance/drive time] in [town]. [Opening hours, anything to know — cash only, closes early Sundays].',
  },
  {
    id: 'market',
    title: 'Farm shop & market',
    text: '[Farm stand or weekly market name], [day/hours] — good for [eggs, produce, honey, whatever’s local].',
  },
  {
    id: 'cooking-in',
    title: 'Cooking in',
    text: (
      <>
        The kitchen has [what&rsquo;s worth knowing &mdash; the grill, a wood-fired oven, cast iron]. See the{' '}
        <Link to="/users-guide">User&rsquo;s Guide</Link> for appliance notes.
      </>
    ),
  },
]

const NEARBY = [
  {
    id: 'restaurant',
    title: '[Restaurant name]',
    text: '[Cuisine / what it’s known for]. [Distance from house]. Worth booking ahead in summer.',
  },
  {
    id: 'cafe',
    title: '[Café name]',
    text: 'Good for [coffee and cinnamon buns / lunch], [distance]. [Anything notable — lake view, dog-friendly].',
  },
  {
    id: 'pizzeria',
    title: '[Pizzeria / takeout spot]',
    text: '[What’s good there], [delivery or pickup only, distance]. Good for a lazy night.',
  },
  {
    id: 'favourite',
    title: 'Our favourite',
    text: '[The owner’s personal pick and why — a dish, a view, an occasion it’s perfect for].',
  },
]

export default function WhereToEatPage() {
  return (
    <>
      <section className={styles.intro}>
        <h1 className={styles.title}>Where to eat</h1>
        <p className={styles.lede}>
          From cooking in on quiet nights to the best table in [Rangalsn&auml;s] &mdash; here&rsquo;s where guests eat.
        </p>
      </section>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>At the house</h2>
        <div className={styles.grid}>
          {AT_HOUSE.map(({ id, title, text }) => (
            <div key={id} className={styles.card}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>Nearby dining</h2>
        <div className={styles.grid}>
          {NEARBY.map(({ id, title, text }) => (
            <div key={id} className={styles.card}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
