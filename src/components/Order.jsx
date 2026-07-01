import { useState } from 'react'
import { useCart, formatPrice } from '../context/CartContext'

// ⚠️ À REMPLACER : coordonnées GPS exactes du restaurant (Google Maps → clic droit → coordonnées).
const RESTAURANT = { lat: 36.7538, lng: 3.0588, zoom: 16 }
const mapEmbedSrc = `https://www.google.com/maps?q=${RESTAURANT.lat},${RESTAURANT.lng}&z=${RESTAURANT.zoom}&hl=fr&output=embed`
const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT.lat},${RESTAURANT.lng}`

// Enregistre la commande localement — servira au futur tableau de bord.
function saveOrder(order) {
  try {
    const key = 'sushis-time-orders'
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    existing.push(order)
    localStorage.setItem(key, JSON.stringify(existing))
  } catch {
    /* stockage indisponible — sans conséquence pour le client */
  }
}

export default function Order() {
  const { items, updateQty, removeItem, total, clear } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', mode: 'Livraison', address: '', notes: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (items.length === 0) return

    const order = {
      createdAt: new Date().toISOString(),
      customer: { ...form },
      items: items.map(i => ({
        name: i.name,
        category: i.category,
        variant: i.variant,
        qty: i.qty,
        unitPrice: i.price,
        lineTotal: i.price * i.qty,
      })),
      total,
    }
    saveOrder(order)
    setSent(true)
    clear()
  }

  return (
    <section id="commander" className="py-28 bg-dark-800">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="section-label">お持ち帰り</p>
          <h2 className="section-title">
            Passer <span className="italic text-gold">Commande</span>
          </h2>
          <div className="gold-divider" />
          <p className="font-sans text-xs text-white/35 tracking-widest">
            Composez votre panier depuis la carte — nous vous rappelons pour confirmer
          </p>
        </div>

        {sent ? (
          <div className="card-dark flex flex-col items-center justify-center text-center py-16 px-8 max-w-lg mx-auto">
            <div className="relative w-20 h-20 flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl animate-glow" />
              <div className="relative w-20 h-20 rounded-full border border-gold/40 bg-gold/[0.06] flex items-center justify-center">
                <span className="text-gold text-3xl">✓</span>
              </div>
            </div>
            <h3 className="font-serif text-3xl text-white mb-3">Commande reçue</h3>
            <p className="font-sans text-sm text-white/45 leading-relaxed">
              Merci ! Le restaurant vous rappellera dans les plus brefs délais
              au numéro indiqué pour confirmer votre commande.
            </p>
            <button
              onClick={() => setSent(false)}
              className="btn-primary mt-10 text-sm"
            >
              Nouvelle commande
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">

            {/* Panier */}
            <div className="card-dark p-7">
              <p className="font-sans text-xs text-gold tracking-widest uppercase mb-8">
                🛒 Mon panier
              </p>

              {items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 px-6 py-12 text-center">
                  <p className="text-4xl opacity-30 mb-4 select-none">🛒</p>
                  <p className="font-sans text-sm text-white/40 mb-6">Votre panier est vide.</p>
                  <a href="#menu" className="btn-primary text-sm">Voir la carte</a>
                </div>
              ) : (
                <>
                  <div className="space-y-0">
                    {items.map(i => (
                      <div
                        key={i.key}
                        className="flex items-center gap-4 py-4 border-b border-white/5"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-base text-white/90 leading-snug">{i.name}</p>
                          <p className="font-sans text-[11px] text-white/35 mt-0.5">
                            {i.category}{i.variant ? ` · ${i.variant}` : ''} · {formatPrice(i.price)}¥
                          </p>
                        </div>

                        {/* Quantité */}
                        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03]">
                          <button
                            onClick={() => updateQty(i.key, -1)}
                            aria-label="Retirer un"
                            className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-gold transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-sans text-sm text-white">{i.qty}</span>
                          <button
                            onClick={() => updateQty(i.key, 1)}
                            aria-label="Ajouter un"
                            className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-gold transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-serif text-gold w-20 text-right whitespace-nowrap">
                          {formatPrice(i.price * i.qty)}<span className="text-sm text-gold/70">¥</span>
                        </p>

                        <button
                          onClick={() => removeItem(i.key)}
                          aria-label="Supprimer"
                          className="text-white/25 hover:text-red-400 transition-colors text-lg leading-none"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gold/20">
                    <span className="font-sans text-xs text-white/40 tracking-widest uppercase">Total</span>
                    <span className="font-serif text-2xl text-gold">
                      {formatPrice(total)}<span className="text-base text-gold/70">¥</span>
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Formulaire */}
            <div className="card-dark p-7">
              <p className="font-sans text-xs text-gold tracking-widest uppercase mb-8">
                📝 Vos coordonnées
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-sans text-xs text-white/35 tracking-widest uppercase mb-2">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 focus:border-gold/50 focus:bg-gold/[0.03] px-4 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/20"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs text-white/35 tracking-widest uppercase mb-2">
                    Téléphone <span className="text-gold/60">(pour confirmer la commande)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 focus:border-gold/50 focus:bg-gold/[0.03] px-4 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/20"
                    placeholder="06 XX XX XX XX"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs text-white/35 tracking-widest uppercase mb-2">Mode</label>
                  <div className="flex gap-3">
                    {['Livraison', 'À emporter'].map(mode => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, mode }))}
                        className={`flex-1 rounded-full border px-4 py-3 font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                          form.mode === mode
                            ? 'border-gold bg-gold/10 text-gold shadow-[0_0_20px_-6px_rgba(201,168,76,0.5)]'
                            : 'border-white/10 text-white/40 hover:border-gold/30 hover:text-white/70'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {form.mode === 'Livraison' && (
                  <div>
                    <label className="block font-sans text-xs text-white/35 tracking-widest uppercase mb-2">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl bg-white/[0.03] border border-white/10 focus:border-gold/50 focus:bg-gold/[0.03] px-4 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/20"
                      placeholder="Adresse de livraison"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-sans text-xs text-white/35 tracking-widest uppercase mb-2">Note (optionnel)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 focus:border-gold/50 focus:bg-gold/[0.03] px-4 py-3 font-sans text-sm text-white outline-none transition-colors resize-none placeholder:text-white/20"
                    placeholder="Allergies, précisions, etc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={items.length === 0}
                  className="btn-primary w-full text-sm mt-2"
                >
                  {items.length === 0
                    ? 'Panier vide'
                    : `Commander · ${formatPrice(total)}¥`}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Localisation */}
        <div className="mt-20">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
            <div>
              <p className="section-label">Nous trouver</p>
              <h3 className="font-serif text-2xl text-white">
                Notre <span className="italic text-gold">emplacement</span>
              </h3>
            </div>
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Itinéraire ↗
            </a>
          </div>

          <div className="relative border border-gold/15 overflow-hidden">
            <iframe
              title="Localisation Sushis Time"
              src={mapEmbedSrc}
              className="w-full h-[360px] md:h-[440px] grayscale-[0.2] contrast-110"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </section>
  )
}
