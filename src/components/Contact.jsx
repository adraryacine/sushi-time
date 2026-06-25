import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-28 bg-dark-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* Info */}
        <div>
          <p className="section-label">Venir nous voir</p>
          <h2 className="section-title mb-6">
            Nous <span className="italic text-gold">Contacter</span>
          </h2>
          <div className="gold-divider mx-0 mb-10" />

          <div className="space-y-8">
            {[
              {
                icon: '📍',
                title: 'Adresse',
                lines: ['Algérie'],
              },
              {
                icon: '🕐',
                title: 'Horaires',
                lines: ['Tous les jours', '10h00 – 23h00'],
              },
              {
                icon: '📞',
                title: 'Téléphone / WhatsApp',
                lines: ['Disponible sur demande'],
              },
              {
                icon: '📸',
                title: 'Instagram',
                lines: ['@sushis_time'],
              },
            ].map(({ icon, title, lines }) => (
              <div key={title} className="flex gap-5">
                <span className="text-xl mt-0.5">{icon}</span>
                <div>
                  <p className="font-sans text-xs text-gold tracking-widest uppercase mb-1">{title}</p>
                  {lines.map(l => (
                    <p key={l} className="font-sans text-sm text-white/55">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Japanese decorative element */}
          <div className="mt-12 border border-gold/10 p-6 inline-block">
            <p className="font-serif text-5xl text-gold/20 select-none">日本</p>
            <p className="font-sans text-xs text-white/25 tracking-widest mt-2">Sushis Time — Est. 2025</p>
          </div>
        </div>

        {/* Form */}
        <div>
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 border border-gold/40 flex items-center justify-center mb-6">
                <span className="text-gold text-2xl">✓</span>
              </div>
              <h3 className="font-serif text-2xl text-white mb-3">Message envoyé</h3>
              <p className="font-sans text-sm text-white/45">
                Nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="font-sans text-xs text-white/35 tracking-widest uppercase mb-8">
                Envoyer un message
              </p>

              <div>
                <label className="block font-sans text-xs text-white/35 tracking-widest uppercase mb-2">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/10 focus:border-gold/50 px-4 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/20"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block font-sans text-xs text-white/35 tracking-widest uppercase mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 focus:border-gold/50 px-4 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/20"
                  placeholder="06 XX XX XX XX"
                />
              </div>

              <div>
                <label className="block font-sans text-xs text-white/35 tracking-widest uppercase mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-transparent border border-white/10 focus:border-gold/50 px-4 py-3 font-sans text-sm text-white outline-none transition-colors resize-none placeholder:text-white/20"
                  placeholder="Votre message, réservation, question..."
                />
              </div>

              <button type="submit" className="btn-gold w-full text-center">
                Envoyer
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
