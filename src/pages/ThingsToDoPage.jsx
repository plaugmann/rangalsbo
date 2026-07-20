import styles from './ThingsToDoPage.module.css'

const ACTIVITIES = [
  {
    id: 'swimming',
    title: 'Swimming',
    text: 'The lake is right there — [best spot to swim from, water shoes recommended for the rocky parts].',
  },
  {
    id: 'hiking',
    title: 'Hiking',
    text: (
      <>
        [Name of trail or forest], good for an afternoon walk. [Trailhead location and rough distance]. Bringing kids? Download the{' '}
        <a href="#">forest scavenger hunt</a> &mdash; find everything on the list and win a small prize.
      </>
    ),
  },
  {
    id: 'fishing',
    title: 'Fishing',
    text: 'Rods are [in the boat house / by the door]. [Any permit needed, what’s usually biting].',
  },
  {
    id: 'foraging',
    title: 'Foraging berries & mushrooms',
    text: 'Wild blueberries and lingonberries grow nearby in late summer, chanterelles after rain. [Good spots, a basket is in the pantry].',
  },
  {
    id: 'sightseeing',
    title: 'Nearby sightseeing',
    text: '[A few worthwhile day trips — towns, museums, or landmarks near Rangalsnäs, with driving times].',
  },
  {
    id: 'more',
    title: 'And more',
    text: '[Room for whatever else you’d recommend — a market day, a nearby castle, a swimming dock down the road.]',
  },
]

export default function ThingsToDoPage() {
  return (
    <>
      <section className={styles.intro}>
        <h1 className={styles.title}>Things to do</h1>
        <p className={styles.lede}>
          Rangalsro rewards slowness &mdash; but if you&rsquo;re looking for a way to spend the day, here&rsquo;s what guests get up to.
        </p>
      </section>

      <section className={styles.grid}>
        {ACTIVITIES.map(({ id, title, text }) => (
          <div key={id} className={styles.card}>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </section>
    </>
  )
}
