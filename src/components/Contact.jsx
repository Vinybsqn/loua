import { Mail, Package } from 'lucide-react'

function InstagramIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A86C] text-sm font-medium tracking-[0.25em] uppercase mb-3">
            ✦ Contact ✦
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-[#1C1717] mb-4">
            Parlons de votre projet
          </h2>
          <p className="text-[#1C1717]/55 text-lg max-w-xl mx-auto leading-relaxed">
            Une question ? Une commande spéciale ? N'hésitez pas à nous contacter par le canal de votre choix.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Instagram card */}
          <a
            href="https://instagram.com/loua.creation"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#FDE8F0] rounded-2xl p-8 text-center hover:bg-[#C85888] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#C85888]/20 hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-[#C85888] group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors text-white group-hover:text-[#C85888]">
              <InstagramIcon size={24} />
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1C1717] group-hover:text-white mb-2 transition-colors">
              Instagram
            </h3>
            <p className="text-[#1C1717]/55 group-hover:text-white/70 text-sm mb-3 transition-colors">
              Message direct — réponse rapide !
            </p>
            <p className="font-semibold text-[#C85888] group-hover:text-white text-sm transition-colors">
              @loua.creation
            </p>
          </a>

          {/* Email card */}
          <a
            href="mailto:loua.creations@gmail.com"
            className="group bg-[#FAF8F5] rounded-2xl p-8 text-center hover:bg-[#C9A86C] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#C9A86C]/20 hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-[#C9A86C] group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors">
              <Mail size={24} className="text-white group-hover:text-[#C9A86C] transition-colors" />
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1C1717] group-hover:text-white mb-2 transition-colors">
              Email
            </h3>
            <p className="text-[#1C1717]/55 group-hover:text-white/70 text-sm mb-3 transition-colors">
              Pour les commandes détaillées
            </p>
            <p className="font-semibold text-[#C9A86C] group-hover:text-white text-sm transition-colors">
              loua.creations@gmail.com
            </p>
          </a>

          {/* Vinted card */}
          <a
            href="https://www.vinted.fr/member/3127626063"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#FAF8F5] rounded-2xl p-8 text-center hover:bg-[#09B3A5] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#09B3A5]/20 hover:-translate-y-1 sm:col-span-2 lg:col-span-1"
          >
            <div className="w-14 h-14 bg-[#09B3A5] group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors">
              <Package size={24} className="text-white group-hover:text-[#09B3A5] transition-colors" />
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1C1717] group-hover:text-white mb-2 transition-colors">
              Vinted
            </h3>
            <p className="text-[#1C1717]/55 group-hover:text-white/70 text-sm mb-3 transition-colors">
              Livraison sécurisée
            </p>
            <p className="font-semibold text-[#09B3A5] group-hover:text-white text-sm transition-colors">
              @Inbsq
            </p>
          </a>
        </div>
      </div>
    </section>
  )
}
