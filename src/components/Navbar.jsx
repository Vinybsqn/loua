import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'Collection', target: 'collection' },
    { label: 'Commander', target: 'configurator' },
    { label: 'Histoire', target: 'about' },
    { label: 'Contact', target: 'contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-['Playfair_Display'] text-2xl font-bold tracking-widest text-[#1C1717] hover:text-[#C85888] transition-colors"
        >
          LØUA
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.target}>
              <button
                onClick={() => scrollTo(link.target)}
                className="text-sm font-medium tracking-wide text-[#1C1717]/80 hover:text-[#C85888] transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Instagram + mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/loua.creation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1C1717]/70 hover:text-[#C85888] transition-colors"
            aria-label="Instagram LØUA"
          >
            <InstagramIcon size={20} />
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#1C1717] hover:text-[#C85888] transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } bg-white/98 backdrop-blur-sm`}
      >
        <ul className="flex flex-col px-6 pb-6 gap-4">
          {navLinks.map((link) => (
            <li key={link.target}>
              <button
                onClick={() => scrollTo(link.target)}
                className="w-full text-left text-base font-medium text-[#1C1717]/80 hover:text-[#C85888] transition-colors py-1"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
