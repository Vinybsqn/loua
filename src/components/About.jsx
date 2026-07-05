import imgLifestyle from '../../../inspi_photo/IMG_2181.jpg'
import { ExternalLink } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#FDE8F0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-[#FAF8F5] rounded-3xl -z-10 -rotate-2" />
            <img
              src={imgLifestyle}
              alt="Sac LØUA en extérieur — création crochet fait main"
              className="w-full h-[520px] object-cover rounded-2xl shadow-2xl shadow-[#1C1717]/10"
            />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="text-[#C9A86C] text-sm font-medium tracking-[0.25em] uppercase mb-4">
              ✦ Notre Histoire ✦
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-[#1C1717] mb-8 leading-tight">
              L'histoire de LØUA
            </h2>
            <p className="text-[#1C1717]/65 text-lg leading-relaxed mb-6">
              Bienvenue dans l'univers LØUA — né d'une passion pour le crochet et le désir de créer des accessoires uniques, faits à la main avec soin et amour.
            </p>
            <p className="text-[#1C1717]/65 text-lg leading-relaxed mb-10">
              Chaque sac est entièrement réalisé à la main, en fil de qualité, pour vous accompagner au quotidien avec style. Parce que chaque pièce mérite d'être unique, tout est personnalisable selon vos envies et vos couleurs.
            </p>

            {/* Quote */}
            <div className="border-l-4 border-[#C85888] pl-6 mb-10">
              <p className="font-['Playfair_Display'] text-xl italic text-[#1C1717] leading-relaxed">
                "Fait main et avec amour ✦"
              </p>
            </div>

            <a
              href="https://instagram.com/loua.creation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1C1717] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#C85888] transition-all active:scale-95 shadow-lg"
            >
              Voir l'Instagram <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
