import { getGallery } from '../lib/storage'
import { DEFAULT_GALLERY } from '../data/gallery'

export default function Gallery() {
  const stored = getGallery()
  const items = stored || DEFAULT_GALLERY

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A86C] text-sm font-medium tracking-[0.25em] uppercase mb-3">
            ✦ Galerie ✦
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-[#1C1717] mb-4">
            En Images
          </h2>
          <p className="text-[#1C1717]/55 text-lg max-w-xl mx-auto">
            Découvrez nos créations en situation, dans toute leur beauté artisanale.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {items.map((item, i) => (
            <div
              key={item.id || i}
              className="break-inside-avoid overflow-hidden rounded-2xl group cursor-pointer relative"
            >
              <img
                src={item.src}
                alt={item.alt || `LØUA création ${i + 1}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1C1717]/0 group-hover:bg-[#1C1717]/20 transition-colors duration-300 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
