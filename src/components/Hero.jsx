import { useEffect, useState } from 'react'
import imgHero from '../../../inspi_photo/IMG_2173.jpg'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="min-h-screen bg-[#FAF8F5] flex items-center pt-16"
    >
      <div className="max-w-6xl mx-auto px-6 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-[#C9A86C] text-sm font-medium tracking-[0.25em] uppercase mb-4">
              Fait main ✦ avec amour
            </p>
            <h1 className="font-['Playfair_Display'] text-7xl lg:text-8xl font-bold text-[#1C1717] leading-none mb-6">
              LØUA
            </h1>
            <h2 className="font-['Playfair_Display'] text-2xl lg:text-3xl font-normal italic text-[#1C1717]/70 mb-6 leading-snug">
              Sacs en crochet faits main,<br />avec amour
            </h2>
            <p className="text-[#1C1717]/60 text-lg leading-relaxed mb-10 max-w-md">
              Chaque création est unique et personnalisable — choisissez votre modèle, vos couleurs, et recevez une pièce créée rien que pour vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo('configurator')}
                className="bg-[#C85888] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-[#b04878] active:scale-95 transition-all shadow-lg shadow-[#C85888]/20"
              >
                Commander sur mesure
              </button>
              <button
                onClick={() => scrollTo('collection')}
                className="border-2 border-[#1C1717]/20 text-[#1C1717] px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:border-[#C85888] hover:text-[#C85888] active:scale-95 transition-all"
              >
                Voir la collection
              </button>
            </div>
          </div>

          {/* Image side */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#FDE8F0] rounded-3xl -z-10 rotate-2" />
              <img
                src={imgHero}
                alt="Collection LØUA — sacs crochet faits main"
                className="w-full h-[520px] object-cover rounded-2xl shadow-2xl shadow-[#1C1717]/10"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-1">
                <p className="font-['Playfair_Display'] text-[#1C1717] font-semibold text-sm">Livraison via Vinted</p>
                <p className="text-[#1C1717]/50 text-xs">Commande par message</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#C85888] rounded-2xl shadow-xl p-3 text-white text-center">
                <p className="font-['Playfair_Display'] text-lg font-bold leading-none">✦</p>
                <p className="text-xs font-medium mt-1">Sur mesure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
