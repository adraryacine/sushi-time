export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Sushis Time" className="w-10 h-10 rounded-full object-cover border border-gold/20" />
            <span className="font-serif text-lg text-white tracking-wider">
              Sushis <span className="text-gold">Time</span>
            </span>
          </div>

          <div className="flex gap-8">
            {[
              { label: 'Accueil', href: '#hero' },
              { label: 'Menu', href: '#menu' },
              { label: 'Galerie', href: '#gallery' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-sans text-xs text-white/25 hover:text-gold tracking-widest uppercase transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <p className="font-sans text-xs text-white/20">
            © {new Date().getFullYear()} Sushis Time — Est. 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
