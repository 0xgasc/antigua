import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ExperienceFinder from '@/components/ExperienceFinder'
import FeaturedTours from '@/components/FeaturedTours'
import FeaturedAldeas from '@/components/FeaturedAldeas'
import UpcomingEvents from '@/components/UpcomingEvents'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ExperienceFinder />
      <FeaturedTours />
      <FeaturedAldeas />
      <UpcomingEvents />
      <Footer />
    </main>
  )
}