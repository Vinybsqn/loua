import { useState } from 'react'

export default function ProductCard({ product, onOrder }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`overflow-hidden rounded-2xl shadow-md bg-white transition-all duration-300 group cursor-pointer ${
        hovered ? 'shadow-xl -translate-y-1' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-72">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? 'scale-105' : 'scale-100'
          }`}
        />
        {/* Overlay button on hover */}
        <div
          className={`absolute inset-0 bg-[#1C1717]/40 flex items-end justify-center pb-6 transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => onOrder(product)}
            className="bg-white text-[#C85888] px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-[#C85888] hover:text-white transition-all active:scale-95 shadow-lg"
          >
            Commander ce modèle
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1C1717] mb-1">
              {product.name}
            </h3>
            <p className="text-[#1C1717]/55 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
          <span className="flex-shrink-0 bg-[#C9A86C]/15 text-[#C9A86C] font-semibold text-sm px-3 py-1.5 rounded-full border border-[#C9A86C]/30 whitespace-nowrap">
            {product.price}€
          </span>
        </div>
        <button
          onClick={() => onOrder(product)}
          className="mt-4 w-full border border-[#C85888]/30 text-[#C85888] py-2.5 rounded-xl text-sm font-medium hover:bg-[#C85888] hover:text-white transition-all active:scale-95"
        >
          Commander
        </button>
      </div>
    </div>
  )
}
