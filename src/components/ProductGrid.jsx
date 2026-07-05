import ProductCard from './ProductCard'
import { getProducts } from '../lib/storage'
import { DEFAULT_PRODUCTS } from '../data/products'

export default function ProductGrid({ onOrder }) {
  const raw = getProducts()
  const products = raw
    ? raw.filter((p) => p.visible !== false)
    : DEFAULT_PRODUCTS.filter((p) => p.visible !== false)

  return (
    <section id="collection" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A86C] text-sm font-medium tracking-[0.25em] uppercase mb-3">
            ✦ La Collection ✦
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-[#1C1717] mb-4">
            Nos Créations
          </h2>
          <p className="text-[#1C1717]/55 text-lg max-w-xl mx-auto leading-relaxed">
            Chaque pièce est crochetée à la main avec des fils de qualité. Toutes les créations sont personnalisables selon vos envies.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onOrder={onOrder} />
          ))}
        </div>
      </div>
    </section>
  )
}
