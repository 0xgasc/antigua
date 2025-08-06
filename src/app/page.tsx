import Header from '@/components/Header'
import HeroClean from '@/components/HeroClean'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroClean />
      <div className="py-16 px-4 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Portal en Desarrollo
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Estamos actualizando nuestro portal oficial. Pronto tendrás acceso a toda la información sobre las comunidades, eventos y patrimonio cultural de La Antigua Guatemala.
        </p>
      </div>
      <Footer />
    </main>
  )
}