import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import Configurator from '../components/Configurator'
import Gallery from '../components/Gallery'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const [preSelectedProduct, setPreSelectedProduct] = useState(null)

  const handleOrder = (product) => {
    setPreSelectedProduct(product)
    setTimeout(() => {
      const el = document.getElementById('configurator')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <Hero />
      <ProductGrid onOrder={handleOrder} />
      <Configurator
        preSelectedProduct={preSelectedProduct}
        onPreSelectedConsumed={() => setPreSelectedProduct(null)}
      />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
