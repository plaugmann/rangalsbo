import { Link } from 'react-router-dom'
import styles from './TheHousePage.module.css'

const STATS = [
  { value: '11', label: 'Guests' },
  { value: '5', label: 'Bedrooms' },
  { value: '2', label: 'Bathrooms' },
  { value: '200m\u00B2', label: 'Living space' },
  { value: 'Lakeside', label: 'Setting' },
]

// 'side' determines visual order: 'left' => image first, text second; 'right' => reversed.
const ROOMS = [
  {
    id: 'house-living',
    title: 'Living room',
    side: 'left',
    tone: '#F1EAD9',
    text: "The heart of the house \u2014 featuring a wood-burning stove as a gathering centerpiece, lazy couches, and grandmother\u2019s refurbished armchair. Excellent for rainy afternoons and card games.",
  },
  {
    id: 'house-kitchen',
    title: 'Kitchen',
    side: 'right',
    tone: '#F4EDE0',
  },
  {
    id: 'house-dining',
    title: 'Dining room',
    side: 'left',
    tone: '#EDF1F2',
    text: "Built around a massive 3-metre dining table seating 12, equally suited to a long brunch, board games, or a bit of creative work. The room\u2019s characteristic blue glass windows look out over the water, with a door straight onto the terrace.",
  },
  {
    id: 'house-bedroom',
    title: 'Bedrooms',
    side: 'right',
    tone: '#F0DCD5',
    text: "A master bedroom upstairs, with a cot available on request. Downstairs, two further bedrooms \u2014 one with a double bed, one with a bunk bed. Linen included; no extra beds in the main house (see the guest house below for additional sleeping space).",
  },
  {
    id: 'house-outdoors',
    title: 'Outdoors',
    side: 'left',
    tone: '#E8DACB',
    text: "A [m\u00B2] wooden terrace with a jacuzzi overlooking the lake, plus a firepit, grill, and sunbeds. The sauna sits by the lake, just a short walk from the house. At the front, an extra patio catches the morning sun \u2014 perfect for breakfast, with a sandbox and trampoline for the kids.",
  },
  {
    id: 'house-guesthouse',
    title: 'Guest house',
    side: 'right',
    tone: '#E2D8C7',
    text: "Separate but close to the main house, with its own bathroom and two bedrooms \u2014 one with a double bed, one with a single bed.",
  },
]

const AMENITY_GROUPS = [
  { title: 'Comfort & climate', items: ['Heating', 'Cooling', 'Blackout curtains', 'Extra duvets'] },
  { title: 'Kitchen & dining', items: ['Coffee machine', 'Kettle', 'Toaster', 'Outdoor dining set', 'BBQ & grill', 'Dishwasher', 'Oven', 'Wine fridge'] },
  { title: 'Bath & laundry', items: ['Hair dryer', 'Iron', 'Washing machine', 'Dryer', 'Drying rack', 'Spare towels'] },
  { title: 'Outdoor & leisure', items: ['Sauna', 'Jacuzzi', 'Firepit', 'Sunbeds', 'Rowboat & canoe', 'Trampoline', 'Sandbox'] },
  { title: 'Tech & entertainment', items: ['Wifi', 'Smart TV', 'Bluetooth speaker', 'Board games & books', 'Toys'] },
  { title: 'Practical', items: ['Free parking', 'EV charger', 'Keyless entry', 'First-aid kit', 'Baby crib & high chair'] },
  { title: 'Safety', items: ['Smoke detectors', 'Fire extinguisher'] },
]

export default function TheHousePage() {
  return (
    <>
      <section className={styles.intro}>
        <h1 className={styles.title}>The house</h1>
        <p className={styles.lede}>
          Built from the ground up in 2026, the house wears the falu red and
          "vita knutar" characteristic of the area &mdash; set on the shore
          of Lake Fj&auml;llen, 15&nbsp;km long.
        </p>
      </section>

      <section className={styles.facts}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.fact}>
            <span className={styles.factValue}>{s.value}</span>
            <span className={styles.factLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {ROOMS.map(({ id, title, text, side, tone }) => (
        <section
          key={id}
          id={id}
          className={side === 'right' ? `${styles.room} ${styles.roomReverse}` : styles.room}
        >
          <div className={styles.placeholder} style={{ background: tone }}>
            <span className={styles.placeholderLabel}>{title}<br/>photo TBD</span>
          </div>
          <div className={styles.text}>
            <h2>{title}</h2>
            {id === 'house-kitchen' ? (
              <p>
                Fully equipped for cooking in &mdash; induction stove, oven, dishwasher, double fridge, double freezer, and a fully stocked pantry. A bench looking out over the lake lets guests linger over a cocktail while the host cooks. See the {' '}
                <Link to="/users-guide">User&rsquo;s Guide</Link>
                {' '}for appliance notes.
              </p>
            ) : (
              <p>{text}</p>
            )}
          </div>
        </section>
      ))}

      <section className={styles.amenities}>
        <h2 className={styles.amenitiesTitle}>Amenities</h2>
        {AMENITY_GROUPS.map((group) => (
          <div key={group.title} className={styles.amenityGroup}>
            <h3 className={styles.amenityGroupTitle}>{group.title}</h3>
            <div className={styles.amenityTiles}>
              {group.items.map((item) => (
                <div key={item} className={styles.amenityTile}>{item}</div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
