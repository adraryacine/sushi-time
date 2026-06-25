import { useState, useEffect } from 'react'

const photos = [
  { src: '/images/plateau-rolls-hero.jpg', alt: 'Plateau Rolls — Assortiment', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/plateau-prestige.jpg', alt: 'Plateau Prestige', span: '' },
  { src: '/images/plateau-bateau-1.jpg', alt: 'Plateau Bateau', span: '' },
  { src: '/images/california-fresh-salmon.jpg', alt: 'California Fresh Salmon', span: '' },
  { src: '/images/crispy-sushi-assiette.jpg', alt: 'Crispy Crunchy Sushi', span: '' },
  { src: '/images/futomaki-geicha.jpg', alt: 'Futomaki Geicha', span: '' },
  { src: '/images/brochettes-crevettes-2.jpg', alt: 'Brochettes Crevettes', span: '' },
  { src: '/images/mojito-fruits.jpg', alt: 'Mojito de Fruits', span: '' },
  { src: '/images/milkshake-ferrero.jpg', alt: 'Milkshake Ferrero', span: '' },
  { src: '/images/banana-split.jpg', alt: 'Banana Split', span: '' },
  { src: '/images/pancake-fruits.jpg', alt: 'Pancake aux Fruits', span: '' },
  { src: '/images/mocktail-bougainvilla.jpg', alt: 'Mocktail', span: '' },
]

function Lightbox({ index, onClose, onPrev, onNext }) {
  const photo = photos[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-gold hover:text-gold transition-colors text-lg"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Counter */}
      <p className="absolute top-6 left-1/2 -translate-x-1/2 font-sans text-xs text-white/30 tracking-widest">
        {index + 1} / {photos.length}
      </p>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center border border-white/10 text-white/50 hover:border-gold hover:text-gold transition-colors text-xl"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
      >
        ‹
      </button>

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[88vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-w-full max-h-[88vh] object-contain shadow-2xl"
        />
      </div>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center border border-white/10 text-white/50 hover:border-gold hover:text-gold transition-colors text-xl"
        onClick={(e) => { e.stopPropagation(); onNext() }}
      >
        ›
      </button>

      {/* Caption */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-xs text-white/40 tracking-widest whitespace-nowrap">
        {photo.alt}
      </p>
    </div>
  )
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openAt = (i) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex(i => (i - 1 + photos.length) % photos.length)
  const next = () => setLightboxIndex(i => (i + 1) % photos.length)

  return (
    <section id="gallery" className="py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">En images</p>
          <h2 className="section-title">
            Notre <span className="italic text-gold">Univers</span>
          </h2>
          <div className="gold-divider" />
          <p className="font-sans text-xs text-white/35 tracking-widest">
            Cliquez sur une image pour l'agrandir · Photos professionnelles à venir
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-3">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`overflow-hidden bg-dark-600 group relative cursor-pointer ${photo.span}`}
              onClick={() => openAt(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-dark/50 group-hover:bg-dark/20 transition-all duration-500" />

              {/* Zoom icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 border border-gold/60 flex items-center justify-center text-gold text-lg">
                  ⊕
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-sans text-xs text-white/80 tracking-widest">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}
