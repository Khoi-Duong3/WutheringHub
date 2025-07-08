'use client'
import Tile from './components/Tile'

const tileData = [
  {
    iconSrc: '/newspaperIcon.png',
    title: 'News and Updates',
    description:'We compile and provide in game news and updates including version patch notes, events, official tweets, and live countdowns for major events and banners.',
    invert: true,
  },
  {
    iconSrc: '/calcIcon.png',
    title: 'Tools & Calculators',
    description:'We offer a robust team damage calculator that allows you to input your team stats and echo stats to accurately determine the damage output of your specific team setup. Alongside this we also provide additional tools such an interactive map and database featuring resonators, weapons and echoes.',
    invert: true,
  },
  {
    iconSrc: '/resonatorIcon.png',
    title: 'Builds & Guides',
    description:'We compile and provide in game news and updates including version patch notes, events, official tweets, and live countdowns for major events and banners.',
    invert: false,
  },
]

export default function Home() {
  return (
    <main className="px-8 py-16 max-w-7xl mx-auto">
      <section>
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          The source of various tools, guides, and information for Wuthering Waves
        </h2>
        <p className='text-m text-gray-400 text-center'>
          Please choose one of our services below
        </p>
        <div>
          
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          What WutheringHub offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tileData.map((data) => (
            <Tile
              key={data.title}
              iconSrc={data.iconSrc}
              title={data.title}
              description={data.description}
              invert={data.invert}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
