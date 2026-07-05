import { useState, useRef } from 'react'
import {
  getAdminPassword,
  setAdminPassword,
  getAdminSession,
  setAdminSession,
  getProducts,
  saveProducts,
  getGallery,
  saveGallery,
} from '../lib/storage'
import { DEFAULT_PRODUCTS } from '../data/products'
import { DEFAULT_GALLERY } from '../data/gallery'
import { Eye, EyeOff, Plus, Trash2, Edit3, ArrowUp, ArrowDown, Check, X, Lock } from 'lucide-react'

// ─── Login ───────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pwd === getAdminPassword()) {
      setAdminSession(true)
      onLogin()
    } else {
      setError(true)
      setPwd('')
      setTimeout(() => setError(false), 2500)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-sm text-center">
        <div className="w-14 h-14 bg-[#FDE8F0] rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Lock size={24} className="text-[#C85888]" />
        </div>
        <p className="font-['Playfair_Display'] text-3xl font-bold text-[#1C1717] mb-1">LØUA</p>
        <p className="text-[#1C1717]/50 text-sm mb-8">Espace administration</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Mot de passe"
              className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm text-[#1C1717] placeholder:text-[#1C1717]/30 focus:outline-none transition-all ${
                error
                  ? 'border-red-400 bg-red-50 focus:border-red-400'
                  : 'border-[#1C1717]/15 focus:border-[#C85888] focus:ring-1 focus:ring-[#C85888]/30'
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C1717]/30 hover:text-[#1C1717]/60"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs">Mot de passe incorrect</p>}
          <button
            type="submit"
            className="w-full bg-[#C85888] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#b04878] transition-all active:scale-95"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Product Form Modal ───────────────────────────────────────────────────────
function ProductForm({ product, onSave, onClose }) {
  const [form, setForm] = useState(
    product || { name: '', price: '', description: '', image: '', visible: true }
  )
  const fileRef = useRef()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setForm({ ...form, image: ev.target.result })
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      id: form.id || `custom_${Date.now()}`,
      price: Number(form.price),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1C1717]">
            {product ? 'Modifier le produit' : 'Ajouter un produit'}
          </h3>
          <button onClick={onClose} className="text-[#1C1717]/40 hover:text-[#1C1717]">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1C1717] mb-1.5">Nom *</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Zyma"
              className="w-full border border-[#1C1717]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C85888]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1C1717] mb-1.5">Prix (€) *</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="30"
              className="w-full border border-[#1C1717]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C85888]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1C1717] mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Description du produit..."
              className="w-full border border-[#1C1717]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C85888] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1C1717] mb-1.5">Image</label>
            {form.image && (
              <img src={form.image} alt="preview" className="w-24 h-24 object-cover rounded-xl mb-2" />
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className="text-sm text-[#C85888] border border-[#C85888]/30 px-4 py-2 rounded-lg hover:bg-[#FDE8F0] transition-all"
            >
              {form.image ? 'Changer l\'image' : 'Choisir une image'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="visible"
              checked={form.visible !== false}
              onChange={(e) => setForm({ ...form, visible: e.target.checked })}
              className="w-4 h-4 accent-[#C85888]"
            />
            <label htmlFor="visible" className="text-sm font-medium text-[#1C1717]">
              Visible sur le site
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#1C1717]/15 text-[#1C1717]/60 py-2.5 rounded-xl text-sm hover:bg-[#FAF8F5] transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#C85888] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#b04878] transition-all"
            >
              {product ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Products Tab ─────────────────────────────────────────────────────────────
function ProductsTab() {
  const init = () => getProducts() || DEFAULT_PRODUCTS.map((p) => ({ ...p }))
  const [products, setProducts] = useState(init)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const persist = (updated) => {
    setProducts(updated)
    saveProducts(updated)
  }

  const handleSave = (product) => {
    let updated
    if (editingProduct) {
      updated = products.map((p) => (p.id === product.id ? product : p))
    } else {
      updated = [...products, product]
    }
    persist(updated)
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleDelete = (id) => {
    if (!confirm('Supprimer ce produit ?')) return
    persist(products.filter((p) => p.id !== id))
  }

  const handleToggleVisible = (id) => {
    persist(products.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1C1717]">Produits</h3>
        <button
          onClick={() => { setEditingProduct(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-[#C85888] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#b04878] transition-all"
        >
          <Plus size={16} /> Ajouter un produit
        </button>
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={`flex items-center gap-4 bg-[#FAF8F5] rounded-2xl p-4 border border-[#1C1717]/5 ${
              !product.visible ? 'opacity-60' : ''
            }`}
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 object-cover rounded-xl flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-['Playfair_Display'] font-semibold text-[#1C1717]">{product.name}</p>
                <span className="text-xs text-[#C9A86C] font-semibold">{product.price}€</span>
                {!product.visible && (
                  <span className="text-xs bg-[#1C1717]/10 text-[#1C1717]/50 px-2 py-0.5 rounded-full">Masqué</span>
                )}
              </div>
              <p className="text-[#1C1717]/50 text-xs mt-0.5 truncate">{product.description}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleToggleVisible(product.id)}
                title={product.visible ? 'Masquer' : 'Afficher'}
                className="text-[#1C1717]/40 hover:text-[#C85888] transition-colors p-1"
              >
                {product.visible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button
                onClick={() => { setEditingProduct(product); setShowForm(true) }}
                className="text-[#1C1717]/40 hover:text-[#C9A86C] transition-colors p-1"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-[#1C1717]/40 hover:text-red-500 transition-colors p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingProduct(null) }}
        />
      )}
    </div>
  )
}

// ─── Gallery Tab ──────────────────────────────────────────────────────────────
function GalleryTab() {
  const init = () => getGallery() || DEFAULT_GALLERY.map((g) => ({ ...g }))
  const [items, setItems] = useState(init)
  const fileRef = useRef()

  const persist = (updated) => {
    setItems(updated)
    saveGallery(updated)
  }

  const handleAdd = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const newItem = {
          id: `g_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          src: ev.target.result,
          alt: file.name.replace(/\.[^.]+$/, ''),
        }
        setItems((prev) => {
          const updated = [...prev, newItem]
          saveGallery(updated)
          return updated
        })
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const handleDelete = (id) => {
    if (!confirm('Supprimer cette photo ?')) return
    persist(items.filter((i) => i.id !== id))
  }

  const move = (index, dir) => {
    const updated = [...items]
    const target = index + dir
    if (target < 0 || target >= updated.length) return
    ;[updated[index], updated[target]] = [updated[target], updated[index]]
    persist(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1C1717]">Galerie</h3>
        <button
          onClick={() => fileRef.current.click()}
          className="flex items-center gap-2 bg-[#C85888] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#b04878] transition-all"
        >
          <Plus size={16} /> Ajouter une photo
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleAdd}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={item.id} className="relative group rounded-2xl overflow-hidden bg-[#FAF8F5]">
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-36 object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#1C1717] hover:bg-white disabled:opacity-40"
              >
                <ArrowUp size={14} />
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
                className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#1C1717] hover:bg-white disabled:opacity-40"
              >
                <ArrowDown size={14} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="w-8 h-8 bg-red-500/90 rounded-full flex items-center justify-center text-white hover:bg-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-[#1C1717]/50 text-xs px-2 py-1.5 truncate">{item.alt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────
function AdminPanel({ onLogout }) {
  const [tab, setTab] = useState('products')
  const [changingPwd, setChangingPwd] = useState(false)
  const [pwdForm, setPwdForm] = useState({ current: '', next: '', confirm: '' })
  const [pwdMsg, setPwdMsg] = useState(null)

  const handleChangePwd = (e) => {
    e.preventDefault()
    if (pwdForm.current !== getAdminPassword()) {
      setPwdMsg({ type: 'error', text: 'Mot de passe actuel incorrect' })
      return
    }
    if (pwdForm.next !== pwdForm.confirm) {
      setPwdMsg({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas' })
      return
    }
    if (pwdForm.next.length < 4) {
      setPwdMsg({ type: 'error', text: 'Le mot de passe doit faire au moins 4 caractères' })
      return
    }
    setAdminPassword(pwdForm.next)
    setPwdMsg({ type: 'success', text: 'Mot de passe modifié !' })
    setTimeout(() => { setChangingPwd(false); setPwdMsg(null) }, 1500)
    setPwdForm({ current: '', next: '', confirm: '' })
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-white border-b border-[#1C1717]/8 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="font-['Playfair_Display'] text-2xl font-bold text-[#1C1717]">LØUA</p>
            <span className="text-[#1C1717]/30 text-sm">Administration</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm text-[#1C1717]/50 hover:text-[#C85888] transition-colors"
            >
              ← Voir le site
            </a>
            <button
              onClick={() => { setAdminSession(false); onLogout() }}
              className="text-sm bg-[#1C1717]/8 text-[#1C1717]/60 px-4 py-2 rounded-lg hover:bg-[#1C1717]/15 transition-all"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#1C1717]/8 mb-8 w-fit">
          {[
            { key: 'products', label: 'Produits' },
            { key: 'gallery', label: 'Galerie' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t.key
                  ? 'bg-[#C85888] text-white shadow-sm'
                  : 'text-[#1C1717]/50 hover:text-[#1C1717]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-2xl p-6 border border-[#1C1717]/8 shadow-sm">
          {tab === 'products' && <ProductsTab />}
          {tab === 'gallery' && <GalleryTab />}
        </div>

        {/* Password change */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-[#1C1717]/8 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#1C1717]/60">Sécurité</p>
            <button
              onClick={() => setChangingPwd(!changingPwd)}
              className="text-sm text-[#C85888] hover:underline"
            >
              {changingPwd ? 'Annuler' : 'Changer le mot de passe'}
            </button>
          </div>

          {changingPwd && (
            <form onSubmit={handleChangePwd} className="mt-4 space-y-3 max-w-sm">
              {['current', 'next', 'confirm'].map((field) => (
                <input
                  key={field}
                  type="password"
                  required
                  value={pwdForm[field]}
                  onChange={(e) => setPwdForm({ ...pwdForm, [field]: e.target.value })}
                  placeholder={
                    field === 'current'
                      ? 'Mot de passe actuel'
                      : field === 'next'
                      ? 'Nouveau mot de passe'
                      : 'Confirmer le nouveau'
                  }
                  className="w-full border border-[#1C1717]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C85888]"
                />
              ))}
              {pwdMsg && (
                <p className={`text-xs ${pwdMsg.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                  {pwdMsg.text}
                </p>
              )}
              <button
                type="submit"
                className="bg-[#C85888] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#b04878] transition-all"
              >
                Modifier
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(getAdminSession())

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />
  }

  return <AdminPanel onLogout={() => setLoggedIn(false)} />
}
