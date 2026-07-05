import { Heart } from 'lucide-react'

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#1C1717] text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-['Playfair_Display'] text-3xl font-bold tracking-widest text-white mb-4">
              LØUA
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Sacs en crochet personnalisés — Fait main et avec amour ! Commande par message. Livraison via Vinted.
            </p>
            <a
              href="https://instagram.com/loua.creation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-[#C85888] hover:text-[#E085A8] transition-colors text-sm font-medium"
            >
              <InstagramIcon size={16} />
              @loua.creation
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-semibold text-white/80 text-sm tracking-wide uppercase mb-4">Navigation</p>
            <ul className="space-y-3">
              {[
                { label: 'Collection', target: 'collection' },
                { label: 'Commander', target: 'configurator' },
                { label: 'Galerie', target: 'gallery' },
                { label: 'Notre histoire', target: 'about' },
                { label: 'Contact', target: 'contact' },
              ].map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => scrollTo(link.target)}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-white/80 text-sm tracking-wide uppercase mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:loua.creation@gmail.com"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  loua.creation@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/loua.creation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  Instagram DM
                </a>
              </li>
              <li className="text-white/30 text-sm">Livraison via Vinted</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} LØUA — Tous droits réservés
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1.5">
            Fait avec <Heart size={12} className="text-[#C85888]" fill="#C85888" /> à la main
          </p>
        </div>
      </div>
    </footer>
  )
}
