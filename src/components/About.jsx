export default function About() {
  return (
    <section id="about" className="py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Image side */}
        <div className="relative flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-gold/30 shadow-[0_0_60px_rgba(201,168,76,0.15)]">
            <img
              src="/logo.jpg"
              alt="Sushis Time"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Gold accent ring */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full border border-gold/10" />
          </div>
          {/* EST badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-dark-800 border border-gold/20 px-6 py-3 whitespace-nowrap">
            <p className="font-sans text-xs text-gold tracking-widest uppercase">Est. 2025 · Algérie</p>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="section-label">Notre histoire</p>
          <h2 className="section-title mb-6">
            L'art japonais,<br />
            <span className="italic text-gold">une passion</span>
          </h2>
          <div className="gold-divider mx-0" />

          <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
            Bienvenue chez <strong className="text-white">Sushis Time</strong>, un espace où la culture japonaise
            rencontre l'art culinaire. Nous proposons une expérience complète : des sushis préparés
            avec soin, des cocktails créatifs, des desserts gourmands et bien plus encore.
          </p>
          <p className="font-sans text-sm text-white/60 leading-relaxed mb-10">
            Chaque visite est une invitation au voyage entre les saveurs du Japon et
            la chaleur algérienne. Notre mascotte — le chat ninja — incarne notre esprit :
            élégant, audacieux, et toujours prêt à surprendre.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-10">
            {[
              { icon: '🍣', label: 'Sushis & Rolls frais' },
              { icon: '🥤', label: 'Cocktails & Boissons' },
              { icon: '🍮', label: 'Desserts & Sucreries' },
              { icon: '🍜', label: 'Plats chauds & Ramen' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3 border-l border-gold/30 pl-4">
                <span className="text-xl">{icon}</span>
                <p className="font-sans text-xs text-white/50">{label}</p>
              </div>
            ))}
          </div>

          <a href="#menu" className="btn-gold">Explorer la carte</a>
        </div>

      </div>
    </section>
  )
}
