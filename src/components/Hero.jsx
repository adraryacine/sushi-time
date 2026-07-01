export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/plateau-rolls-hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/75 via-dark/60 to-dark" />

      {/* Decorative vertical lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-32 bg-gold/20 hidden lg:block" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-32 bg-gold/20 hidden lg:block" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/logo.jpg"
            alt="Sushis Time"
            className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-2 border-gold/40 shadow-[0_0_40px_rgba(201,168,76,0.2)]"
          />
        </div>

        <p className="section-label mb-4">Cuisine Japonaise — Est. 2025</p>

        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white font-light leading-none mb-2">
          Sushis
        </h1>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl italic text-gold font-light leading-none mb-8">
          Time
        </h1>

        <div className="gold-divider" />

        <p className="font-sans text-sm md:text-base text-white/50 tracking-widest uppercase font-light max-w-md mx-auto mb-12">
          こんにちは — Sushis · Crêpes · Cocktails · Desserts
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#menu" className="btn-gold">
            Découvrir la carte
          </a>
          <a
            href="#commander"
            className="inline-block px-8 py-3 font-sans text-xs tracking-widest uppercase text-white/50 hover:text-gold transition-colors duration-300"
          >
            Commander →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-sans text-xs text-white/25 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </section>
  )
}
