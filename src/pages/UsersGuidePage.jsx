import { Link } from 'react-router-dom'
import styles from './UsersGuidePage.module.css'

const TOPICS = [
  {
    id: 'check-in',
    title: 'Check-in / check-out',
    text: '[Door code], check-in from [3:00 PM]. Leave keys [where] by [11:00 AM] on check-out day.',
  },
  {
    id: 'door-code',
    title: 'Door code',
    text: 'The front door code is [xxxx]. Please don’t share it beyond your group.',
  },
  {
    id: 'wifi',
    title: 'Wifi & router',
    text: 'Network: [name]. Password: [xxxx]. The router lives [where] — if it needs a reset, [instructions].',
  },
  {
    id: 'ev-charging',
    title: 'Charging the car',
    text: 'The charger is [location]. [Cable type / how to start a session].',
  },
  {
    id: 'washing-machine',
    title: 'Washing machine',
    text: '[Location, which program to use, where detergent is kept].',
  },
  {
    id: 'trash',
    title: 'Trash & recycling',
    text: 'Bins are [location]. Sort into [categories]. Collection day is [day].',
  },
  {
    id: 'speakers',
    title: 'Speakers',
    text: '[How to connect via Bluetooth/app, where they’re located].',
  },
  {
    id: 'chromecast',
    title: 'Chromecast & TV',
    text: '[How to cast, TV remote notes, which input to select].',
  },
  {
    id: 'wood-surfaces',
    title: 'Wooden surfaces',
    text: 'Please use coasters and trivets — the old wood marks easily. Wipe spills promptly, avoid harsh cleaners.',
  },
  {
    id: 'porcelain',
    title: 'Old porcelain',
    text: 'Some of the china is old and fragile — please hand-wash rather than use the dishwasher.',
  },
  {
    id: 'wine-fridge',
    title: 'Wine fridge',
    text: '[Location, temperature setting notes, what’s ok to help yourself to].',
  },
  {
    id: 'fireplace',
    title: 'Fireplace — use & cleaning',
    text: '[How to light it safely, damper instructions, how to clear ash before you leave].',
  },
  {
    id: 'firewood',
    title: 'Firewood',
    text: 'The woodpile is [location]. Please restock from [source] if you run low.',
  },
]

export default function UsersGuidePage() {
  return (
    <section id="users-guide" className={styles.guide}>
      <div className={styles.intro}>
        <h1 className={styles.title}>User&rsquo;s guide</h1>
        <p className={styles.lede}>
          Everything you need to settle in and take care of the house. Have a quick question instead? See the{' '}
          <Link to="/faq">FAQ</Link>.
        </p>
      </div>
      <div className={styles.grid}>
        {TOPICS.map(({ id, title, text }) => (
          <div key={id} className={styles.card}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
