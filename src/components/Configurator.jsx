import { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, Check, Send } from 'lucide-react'
import ColorPicker from './ColorPicker'
import { COLORS } from '../data/colors'
import { getProducts } from '../lib/storage'
import { DEFAULT_PRODUCTS } from '../data/products'

const buildMailto = (order) => {
  const subject = `Commande LØUA - ${order.model} ${order.color1}${order.color2 ? '/' + order.color2 : ''}`
  const body = `Bonjour,\n\nJe souhaite commander :\n\nModèle : ${order.model} (${order.price}€)\nCouleur principale : ${order.color1}\nCouleur secondaire : ${order.color2 || 'Non'}\n\nMes coordonnées :\nNom : ${order.name}\nContact : ${order.contact}\n\nMessage : ${order.message || 'Aucun'}\n\nMerci !`
  return `mailto:loua.creation@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function StepIndicator({ step }) {
  const steps = ['Modèle', 'Couleurs', 'Coordonnées']
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, i) => {
        const n = i + 1
        const active = step === n
        const done = step > n
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  done
                    ? 'bg-[#C85888] text-white'
                    : active
                    ? 'bg-[#C85888] text-white shadow-lg shadow-[#C85888]/30'
                    : 'bg-[#1C1717]/8 text-[#1C1717]/40'
                }`}
              >
                {done ? <Check size={16} strokeWidth={3} /> : n}
              </div>
              <span
                className={`text-xs font-medium ${
                  active ? 'text-[#C85888]' : done ? 'text-[#C85888]/70' : 'text-[#1C1717]/40'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mx-3 mb-5 transition-colors duration-300 ${
                  step > n ? 'bg-[#C85888]' : 'bg-[#1C1717]/10'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Configurator({ preSelectedProduct, onPreSelectedConsumed }) {
  const raw = getProducts()
  const products = raw
    ? raw.filter((p) => p.visible !== false)
    : DEFAULT_PRODUCTS.filter((p) => p.visible !== false)

  const [step, setStep] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [color1, setColor1] = useState(null)
  const [color2, setColor2] = useState(null)
  const [form, setForm] = useState({ name: '', contact: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  // When a product is pre-selected from the catalog
  useEffect(() => {
    if (preSelectedProduct) {
      setSelectedProduct(preSelectedProduct)
      setStep(2)
      onPreSelectedConsumed?.()
    }
  }, [preSelectedProduct])

  const handleSubmit = (e) => {
    e.preventDefault()
    const order = {
      model: selectedProduct.name,
      price: selectedProduct.price,
      color1: color1?.name || '',
      color2: color2?.name || '',
      name: form.name,
      contact: form.contact,
      message: form.message,
    }
    window.location.href = buildMailto(order)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="configurator" className="py-24 bg-[#FDE8F0]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="w-16 h-16 bg-[#C85888] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={28} className="text-white" strokeWidth={3} />
            </div>
            <h3 className="font-['Playfair_Display'] text-3xl font-bold text-[#1C1717] mb-4">
              Merci pour votre commande ✦
            </h3>
            <p className="text-[#1C1717]/60 mb-6 leading-relaxed">
              Votre email a été préparé. Si l'application mail ne s'est pas ouverte, envoyez directement un message à{' '}
              <a href="mailto:loua.creation@gmail.com" className="text-[#C85888] font-medium underline underline-offset-2">
                loua.creation@gmail.com
              </a>
            </p>
            <p className="text-[#1C1717]/50 text-sm mb-8">
              Ou contactez directement via Instagram DM{' '}
              <a
                href="https://instagram.com/loua.creation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C85888] font-medium"
              >
                @loua.creation
              </a>
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setStep(1)
                setSelectedProduct(null)
                setColor1(null)
                setColor2(null)
                setForm({ name: '', contact: '', message: '' })
              }}
              className="bg-[#C85888] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#b04878] transition-all"
            >
              Nouvelle commande
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="configurator" className="py-24 bg-[#FDE8F0]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#C9A86C] text-sm font-medium tracking-[0.25em] uppercase mb-3">
            ✦ Commander ✦
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-[#1C1717] mb-4">
            Votre Création sur Mesure
          </h2>
          <p className="text-[#1C1717]/55 text-lg max-w-xl mx-auto">
            En 3 étapes simples, configurez votre sac unique.
          </p>
        </div>

        <StepIndicator step={step} />

        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          {/* Step 1 — Model */}
          {step === 1 && (
            <div className="transition-all duration-300">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#1C1717] mb-2">
                Choisissez votre modèle
              </h3>
              <p className="text-[#1C1717]/50 mb-8 text-sm">Cliquez sur un modèle pour le sélectionner.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {products.map((product) => {
                  const isSelected = selectedProduct?.id === product.id
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className={`rounded-2xl overflow-hidden border-2 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-[#C85888] shadow-lg shadow-[#C85888]/15'
                          : 'border-transparent hover:border-[#C85888]/30 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-7 h-7 bg-[#C85888] rounded-full flex items-center justify-center">
                            <Check size={14} className="text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-white">
                        <p className="font-['Playfair_Display'] font-semibold text-[#1C1717] text-base">{product.name}</p>
                        <p className="text-[#C9A86C] text-sm font-semibold">{product.price}€</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {selectedProduct && (
                <div className="bg-[#FAF8F5] rounded-2xl p-4 mb-6 flex items-center gap-3">
                  <Check size={16} className="text-[#C85888]" strokeWidth={3} />
                  <p className="text-sm text-[#1C1717]/70">
                    Sélectionné : <span className="font-semibold text-[#1C1717]">{selectedProduct.name}</span>
                    {' '}— <span className="text-[#C9A86C] font-semibold">{selectedProduct.price}€</span>
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedProduct}
                  className="flex items-center gap-2 bg-[#C85888] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#b04878] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all shadow-lg shadow-[#C85888]/20"
                >
                  Suivant <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Colors */}
          {step === 2 && (
            <div className="transition-all duration-300">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#1C1717] mb-2">
                Choisissez vos couleurs
              </h3>
              <p className="text-[#1C1717]/50 mb-8 text-sm">Sélectionnez une couleur principale et, si vous souhaitez, une couleur secondaire.</p>

              <div className="space-y-8">
                <ColorPicker
                  colors={COLORS}
                  selected={color1}
                  onSelect={setColor1}
                  label="Couleur principale"
                  optional={false}
                />
                <ColorPicker
                  colors={COLORS}
                  selected={color2}
                  onSelect={setColor2}
                  label="Couleur secondaire"
                  optional={true}
                />

                {/* Live preview */}
                <div className="bg-[#FAF8F5] rounded-2xl p-6">
                  <p className="text-sm font-semibold text-[#1C1717] mb-4">Aperçu de votre combinaison</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-full border-4 border-white shadow-md"
                        style={{ backgroundColor: color1?.hex || '#E5E7EB' }}
                      />
                      {color2 && (
                        <>
                          <span className="text-[#1C1717]/30 font-light">+</span>
                          <div
                            className="w-14 h-14 rounded-full border-4 border-white shadow-md"
                            style={{ backgroundColor: color2.hex }}
                          />
                        </>
                      )}
                    </div>
                    <div className="text-sm text-[#1C1717]/60">
                      {color1 ? (
                        <>
                          <p className="font-medium text-[#1C1717]">{color1.name}{color2 ? ` + ${color2.name}` : ''}</p>
                          <p className="text-xs mt-0.5">{color1.hex}{color2 ? ` / ${color2.hex}` : ''}</p>
                        </>
                      ) : (
                        <p className="italic">Aucune couleur sélectionnée</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 border border-[#1C1717]/20 text-[#1C1717]/60 px-6 py-3 rounded-full text-sm font-medium hover:border-[#1C1717]/40 hover:text-[#1C1717] transition-all"
                >
                  <ChevronLeft size={16} /> Retour
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!color1}
                  className="flex items-center gap-2 bg-[#C85888] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#b04878] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all shadow-lg shadow-[#C85888]/20"
                >
                  Suivant <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Contact */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="transition-all duration-300">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#1C1717] mb-2">
                Vos coordonnées
              </h3>
              <p className="text-[#1C1717]/50 mb-8 text-sm">Dernière étape ! Remplissez vos informations pour finaliser la commande.</p>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1C1717] mb-2">
                    Prénom &amp; Nom <span className="text-[#C85888]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Marie Dupont"
                    className="w-full border border-[#1C1717]/15 rounded-xl px-4 py-3 text-sm text-[#1C1717] placeholder:text-[#1C1717]/30 focus:outline-none focus:border-[#C85888] focus:ring-1 focus:ring-[#C85888]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1C1717] mb-2">
                    Email ou Instagram <span className="text-[#C85888]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="marie@email.com ou @marie"
                    className="w-full border border-[#1C1717]/15 rounded-xl px-4 py-3 text-sm text-[#1C1717] placeholder:text-[#1C1717]/30 focus:outline-none focus:border-[#C85888] focus:ring-1 focus:ring-[#C85888]/30 transition-all"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#1C1717] mb-2">
                  Message / Demandes spécifiques
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  placeholder="Des détails supplémentaires ? Une demande particulière ?"
                  className="w-full border border-[#1C1717]/15 rounded-xl px-4 py-3 text-sm text-[#1C1717] placeholder:text-[#1C1717]/30 focus:outline-none focus:border-[#C85888] focus:ring-1 focus:ring-[#C85888]/30 transition-all resize-none"
                />
              </div>

              {/* Order recap */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 mb-8">
                <p className="text-sm font-semibold text-[#1C1717] mb-3">Récapitulatif de votre commande</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#1C1717]/55">Modèle</span>
                    <span className="font-medium text-[#1C1717]">{selectedProduct?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1C1717]/55">Prix</span>
                    <span className="font-semibold text-[#C9A86C]">{selectedProduct?.price}€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#1C1717]/55">Couleur principale</span>
                    <span className="flex items-center gap-1.5 font-medium text-[#1C1717]">
                      <span
                        className="inline-block w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: color1?.hex }}
                      />
                      {color1?.name}
                    </span>
                  </div>
                  {color2 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#1C1717]/55">Couleur secondaire</span>
                      <span className="flex items-center gap-1.5 font-medium text-[#1C1717]">
                        <span
                          className="inline-block w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: color2.hex }}
                        />
                        {color2.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 border border-[#1C1717]/20 text-[#1C1717]/60 px-6 py-3 rounded-full text-sm font-medium hover:border-[#1C1717]/40 hover:text-[#1C1717] transition-all"
                >
                  <ChevronLeft size={16} /> Retour
                </button>

                <div className="flex flex-col items-end gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#C85888] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#b04878] active:scale-95 transition-all shadow-lg shadow-[#C85888]/20"
                  >
                    <Send size={15} /> Envoyer ma commande ✦
                  </button>
                  <p className="text-xs text-[#1C1717]/40">
                    Ou DM Instagram{' '}
                    <a
                      href="https://instagram.com/loua.creation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C85888]"
                    >
                      @loua.creation
                    </a>
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
