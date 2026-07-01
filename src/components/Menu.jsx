import { useState } from 'react'
import { useCart, parsePrice } from '../context/CartContext'

const tabs = [
  { id: 'sushis', label: 'Sushis', icon: '🍣' },
  { id: 'plats', label: 'Plats', icon: '🍜' },
  { id: 'boissons', label: 'Boissons', icon: '🥤' },
  { id: 'sucre', label: 'Sucreries', icon: '🍮' },
]

// Pour ajouter une photo à un plat : ajoute photo: '/dishes/nom-du-fichier.jpg'
const menu = {
  sushis: [
    {
      category: 'Sashimi',
      subtitle: '04 pièces',
      items: [
        { name: 'Saumon', desc: '', price: '1 200', photo: '/images/plateau-bateau-1.jpg' },
      ],
    },
    {
      category: 'Hosomaki',
      subtitle: '06 pièces',
      items: [
        { name: 'Suremi', desc: '', price: '600', photo: null },
        { name: 'Avocat Fromage', desc: '', price: '750', photo: null },
        { name: 'Saumon Frais', desc: '', price: '850', photo: '/images/futomaki-geicha.jpg' },
        { name: 'Saumon Fumé', desc: '', price: '850', photo: null },
        { name: 'Dorade', desc: '', price: '850', photo: null },
      ],
    },
    {
      category: 'Nigiri',
      subtitle: '03 pièces',
      items: [
        { name: 'Saumon Frais', desc: '', price: '800', photo: '/images/plateau-bateau-2.jpg' },
        { name: 'Saumon Fumé', desc: '', price: '800', photo: null },
        { name: 'Avocat', desc: '', price: '750', photo: null },
      ],
    },
    {
      category: 'Futomaki',
      subtitle: '05 pièces / 10 pièces',
      dual: true,
      items: [
        { name: 'Chiken', desc: 'Avocat, poulet pané, concombre, fromage', price: '850', price2: '1 600', photo: null },
        { name: 'Suremi', desc: 'Avocat, suremi, concombre, fromage', price: '800', price2: '1 600', photo: null },
        { name: 'Geicha', desc: 'Saumon frais/fumé, avocat, fromage', price: '1 000', price2: '1 800', photo: '/images/futomaki-geicha.jpg' },
        { name: 'Thon', desc: 'Cuit, concombre, fromage', price: '850', price2: '1 600', photo: null },
        { name: 'Crevettes Tempura', desc: '', price: '1 000', price2: '1 900', photo: null },
      ],
    },
    {
      category: 'Les Prestiges',
      subtitle: '08 pièces',
      items: [
        { name: 'Salmon Roll Prestige', desc: 'Avocat, concombre, cheese, recouvert de saumon', price: '2 400', photo: '/images/plateau-prestige.jpg' },
        { name: 'Dragon Roll Crevettes Tempura', desc: 'Crevettes tempura, concombre, cheese, avocat, saumon laqué', price: '2 600', photo: '/images/plateau-prestige.jpg' },
        { name: 'Spring Roll', desc: 'Salade, galette de riz, saumon frais, avocat, cheese — 06 pièces', price: '1 800', photo: null },
        { name: 'Sushi Time', desc: 'Saumon pané, crevettes tempura, avocat, fromage, saumon laqué', price: '2 800', photo: '/images/plateau-rolls-hero.jpg' },
      ],
    },
    {
      category: 'California Roll',
      subtitle: '04 pièces / 08 pièces',
      dual: true,
      items: [
        { name: 'Végétarien', desc: 'Carottes, concombre, fromage, couverture avocat', price: '800', price2: '1 600', photo: null },
        { name: 'Poulet', desc: 'Poulet pané, concombre, fromage, avocat', price: '850', price2: '1 600', photo: null },
        { name: 'Fresh Salmon', desc: 'Saumon frais/fumé, avocat, fromage', price: '1 000', price2: '1 900', photo: '/images/california-fresh-salmon.jpg' },
        { name: 'Salmon Cheese', desc: 'Fromage, couverture saumon', price: '1 200', price2: '2 300', photo: '/images/plateau-rolls-hero.jpg' },
        { name: 'Tiger Roll', desc: 'Crevettes tempura, avocat, fromage', price: '1 000', price2: '1 900', photo: null },
      ],
    },
    {
      category: 'Crispy Crunchy Sushi',
      subtitle: '08 pièces',
      items: [
        { name: 'Crispy Suremi', desc: '', price: '1 200', photo: '/images/crispy-sushi-assiette.jpg' },
        { name: 'Crispy Poulet', desc: '', price: '1 400', photo: '/images/crispy-sushi-assiette.jpg' },
        { name: 'Crispy Crevettes', desc: '', price: '1 600', photo: '/images/california-fresh-salmon.jpg' },
        { name: 'Crispy Saumon', desc: '', price: '1 300', photo: '/images/crispy-sushi-assiette.jpg' },
      ],
    },
  ],

  plats: [
    {
      category: 'Nems',
      subtitle: '03 pièces',
      items: [
        { name: 'Nems Poulet', desc: '', price: '600', photo: null },
        { name: 'Nems Crevettes', desc: '', price: '800', photo: null },
        { name: 'Nems Saumon', desc: '', price: '1 200', photo: null },
      ],
    },
    {
      category: 'Salades',
      items: [
        { name: 'Salade de Thon', desc: '', price: '1 000', photo: null },
        { name: 'Salade de Saumon Fumé', desc: '', price: '1 500', photo: null },
        { name: 'Salade Crevettes', desc: '', price: '1 700', photo: null },
      ],
    },
    {
      category: 'Wok Thaï',
      subtitle: 'Base de nouilles de blé · Légumes (oignons, poivron, choux, carottes, courgette)',
      items: [
        { name: 'Émincé de Bœuf', desc: 'Romsteak', price: '1 500', photo: null },
        { name: 'Émincé de Poulet', desc: '', price: '1 200', photo: null },
        { name: 'Émincé de Crevettes', desc: '', price: '1 600', photo: null },
      ],
    },
    {
      category: 'Poke Bowl',
      items: [
        { name: 'Poulet', desc: '', price: '1 400', photo: null },
        { name: 'Crevettes', desc: '', price: '1 800', photo: null },
        { name: 'Saumon', desc: '', price: '2 000', photo: null },
      ],
    },
    {
      category: 'Brochettes',
      subtitle: '03 pièces',
      items: [
        { name: 'Poulet / Fromage', desc: '', price: '1 100', photo: '/images/brochettes-crevettes-1.jpg' },
        { name: 'Bœuf / Fromage', desc: '', price: '1 300', photo: null },
        { name: 'Saumon', desc: '', price: '1 600', photo: null },
        { name: 'Crevettes Tempura', desc: '03 pièces', price: '1 200', photo: '/images/brochettes-crevettes-2.jpg' },
      ],
    },
    {
      category: 'Ramen',
      subtitle: 'Nouilles de blé · Légumes · Œuf',
      items: [
        { name: 'Ramen Poulet', desc: '', price: '1 400', photo: null },
        { name: 'Ramen Crevettes', desc: '', price: '1 700', photo: null },
        { name: 'Ramen Bœuf', desc: '', price: '1 600', photo: null },
      ],
    },
  ],

  boissons: [
    {
      category: 'Mocktail',
      items: [
        { name: 'Cinamon Tropic', desc: 'Mandarine, monge, cannelle', price: '450', photo: null },
        { name: 'Stromy Night', desc: 'Grenadine, raisin, fleur d\'orange', price: '500', photo: '/images/mocktail-bougainvilla.jpg' },
        { name: 'Blue Lady', desc: 'Ananas, zeste d\'orange, coco', price: '500', photo: null },
        { name: 'Pina Colada', desc: 'Ananas, coco', price: '550', photo: null },
        { name: 'Bougainvilla', desc: 'Cassis, banane, ananas', price: '650', photo: '/images/mocktail-bougainvilla.jpg' },
      ],
    },
    {
      category: 'Mojito',
      items: [
        { name: 'Mojito Classic', desc: '', price: '450', photo: '/images/mojito-fruits.jpg' },
        { name: 'Mojito Framboise', desc: 'Purée de fruits, Monin', price: '550', photo: '/images/mojito-fruits.jpg' },
        { name: 'Mojito Colada', desc: 'Sirop de fruit, Monin', price: '550', photo: null },
        { name: 'Mojito de Fruits', desc: '', price: '750', photo: '/images/mojito-fruits.jpg' },
      ],
    },
    {
      category: 'Sélections Barista',
      items: [
        { name: 'Café Capsules — L\'Or', desc: '', price: '200', photo: null },
        { name: 'Café Capsules — Café Noir', desc: '', price: '300', photo: null },
        { name: 'Café Capsules — Caps', desc: '', price: '150', photo: null },
        { name: 'Espresso en grains', desc: '', price: '200', photo: null },
        { name: 'Iced Macchiato', desc: 'Caramel, noisettes, vanille', price: '400', photo: '/images/milkshake-ferrero.jpg' },
        { name: 'Café Glacé', desc: '', price: '300', photo: '/images/the-matcha-cafe-glace.jpg' },
        { name: 'Affogato', desc: '', price: '350', photo: null },
        { name: 'Frappuccino', desc: 'Café, caramel', price: '450', photo: '/images/milkshake-ferrero.jpg' },
        { name: 'Bubble Thé', desc: '', price: '600', photo: null },
        { name: 'Thé Vert Matcha', desc: '', price: '600', photo: '/images/the-matcha-cafe-glace.jpg' },
      ],
    },
    {
      category: 'Milkshake',
      subtitle: 'Base : Lait + Glace vanille — 300¥ · Suppléments au choix',
      items: [
        { name: 'Banane / Nutella / Caramel', desc: 'Supplément par ajout', price: '150', photo: null },
        { name: 'Lotus / Kit Kat / Boeno / Speculoos', desc: 'Supplément par ajout', price: '250', photo: null },
        { name: 'Snickers', desc: 'Supplément', price: '300', photo: null },
        { name: 'Céréales / Raffaello / Ferrero / Fruits secs', desc: 'Supplément par ajout', price: '200', photo: null },
        { name: 'Flocon d\'avoine / Dattes', desc: 'Supplément par ajout', price: '150', photo: null },
      ],
    },
  ],

  sucre: [
    {
      category: 'Nos Crêpes Brûlées',
      subtitle: 'Toutes servies avec une crème spéciale',
      items: [
        { name: 'Formule 1', desc: 'Banane, caramel, amande effilée', price: '500', photo: null },
        { name: 'Formule 2', desc: 'Banane, chocolat, céréales', price: '650', photo: null },
        { name: 'Formule 3', desc: 'Banane, purée de fruits, caviar de fruits', price: '750', photo: null },
        { name: 'Crêpe Sushi', desc: 'Chocolat, brownie + boule de glace', price: '850', photo: null },
        { name: 'Crêpe Fettucine', desc: '', price: '750', photo: null },
        { name: 'Crêpe Aumonière', desc: 'Pomme poêlée à la cannelle', price: '950', photo: null },
      ],
    },
    {
      category: 'Pancake',
      items: [
        { name: 'Pancake Sirop d\'Érable', desc: '', price: '650', photo: '/images/pancake-fruits.jpg' },
        { name: 'Pancake aux Fruits', desc: 'Mélange de fruits', price: '750', photo: '/images/pancake-fruits.jpg' },
      ],
    },
    {
      category: 'Coupes de Glaces',
      items: [
        { name: 'Banana Split', desc: '', price: '800', photo: '/images/banana-split.jpg' },
        { name: 'Coupelle de Fruits', desc: '', price: '950', photo: '/images/banana-split.jpg' },
        { name: 'Nougat Glacé', desc: '', price: '750', photo: null },
      ],
    },
    {
      category: 'Spaghetti Ice Cream',
      subtitle: 'Choisissez votre supplément',
      items: [
        { name: 'Vanille / Pistache / Chocolat / Cassis', desc: 'Supplément au choix', price: '350', photo: null },
      ],
    },
  ],
}

// Dérive les libellés des deux formats à partir du sous-titre
// ("04 pièces / 08 pièces" → ["04 pcs", "08 pcs"]).
function dualLabels(cat) {
  if (cat.subtitle && cat.subtitle.includes('/')) {
    return cat.subtitle
      .split('/')
      .map(s => s.trim().replace('pièces', 'pcs').replace('pièce', 'pc'))
  }
  return ['Simple', 'Double']
}

// Fiche produit : photo (ou placeholder) + ajout au panier.
function ItemModal({ item, cat, onClose }) {
  const { addItem } = useCart()
  const isDual = Boolean(cat.dual)
  const labels = dualLabels(cat)
  const [variant, setVariant] = useState(0)
  const [added, setAdded] = useState(false)

  const priceStr = isDual ? (variant === 0 ? item.price : item.price2) : item.price

  const handleAdd = () => {
    addItem({
      key: `${cat.category}::${item.name}::${isDual ? labels[variant] : ''}`,
      name: item.name,
      category: cat.category,
      variant: isDual ? labels[variant] : null,
      price: parsePrice(priceStr),
      priceLabel: priceStr,
      photo: item.photo || null,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark/90 backdrop-blur-md p-4 animate-overlay-in"
      onClick={onClose}
    >
      <div
        className="card-dark relative w-full max-w-md overflow-hidden animate-modal-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-dark/70 backdrop-blur border border-white/15 text-white/70 hover:text-gold hover:border-gold/60 hover:rotate-90 transition-all duration-300"
        >
          ✕
        </button>

        {/* Image ou placeholder */}
        {item.photo ? (
          <div className="relative h-60 overflow-hidden">
            <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/20 to-transparent" />
          </div>
        ) : (
          <div className="relative h-60 flex flex-col items-center justify-center gap-4 overflow-hidden">
            {/* halo doré animé */}
            <div className="absolute w-48 h-48 rounded-full bg-gold/20 blur-3xl animate-glow" />
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full border border-gold/30 bg-gold/[0.06]">
              <span className="text-4xl select-none">🍣</span>
            </div>
            <p className="relative font-sans text-[11px] text-white/40 tracking-widest uppercase">
              Photo bientôt disponible
            </p>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent" />
          </div>
        )}

        {/* Corps */}
        <div className="relative px-7 pb-7 -mt-6">
          <span className="inline-block rounded-full bg-gold/10 border border-gold/25 px-3 py-1 font-sans text-[10px] text-gold tracking-widest uppercase">
            {cat.category}
          </span>
          <h3 className="font-serif text-3xl text-white leading-tight mt-3">{item.name}</h3>
          {item.desc && (
            <p className="font-sans text-xs text-white/45 mt-2 leading-relaxed">{item.desc}</p>
          )}

          {/* Prix / choix du format */}
          {isDual ? (
            <div className="flex gap-3 mt-5 mb-7">
              {[0, 1].map(i => (
                <button
                  key={i}
                  onClick={() => setVariant(i)}
                  className={`flex-1 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                    variant === i
                      ? 'border-gold bg-gold/10 shadow-[0_0_20px_-6px_rgba(241,155,179,0.5)]'
                      : 'border-white/10 hover:border-gold/40'
                  }`}
                >
                  <p className="font-sans text-[10px] text-white/40 uppercase tracking-widest">{labels[i]}</p>
                  <p className="font-serif text-xl text-gold mt-0.5">
                    {i === 0 ? item.price : item.price2}
                    <span className="text-sm text-gold/70">¥</span>
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-baseline gap-1 mt-5 mb-7">
              <span className="font-serif text-4xl text-gold">{item.price}</span>
              <span className="font-serif text-xl text-gold/70">¥</span>
            </div>
          )}

          {/* Ajouter au panier */}
          <button
            onClick={handleAdd}
            className={`w-full text-sm ${added ? 'btn-ghost !text-gold !border-gold' : 'btn-primary'}`}
          >
            {added ? '✓ Ajouté au panier' : '🛒 Ajouter au panier'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Price({ value }) {
  return (
    <span className="font-serif text-[15px] text-gold whitespace-nowrap">
      {value}<span className="text-[10px] text-gold/60">¥</span>
    </span>
  )
}

function MenuCategory({ cat, onItemClick }) {
  const labels = cat.dual ? dualLabels(cat) : null
  return (
    <div className="card-dark break-inside-avoid mb-6 p-5">
      {/* En-tête de catégorie */}
      <div className="flex items-start justify-between gap-3 pb-3 mb-1 border-b border-gold/15">
        <div className="min-w-0">
          <h3 className="font-serif text-xl text-gold italic leading-tight">{cat.category}</h3>
          {cat.subtitle && (
            <p className="font-sans text-[10px] text-white/35 tracking-wider mt-1 leading-snug">{cat.subtitle}</p>
          )}
        </div>
        {cat.dual && (
          <div className="flex gap-4 shrink-0 pt-1">
            {labels.map(l => (
              <span key={l} className="w-14 text-right font-sans text-[9px] text-white/30 uppercase tracking-widest">
                {l}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Plats */}
      <div>
        {cat.items.map((item) => {
          const hasPhoto = Boolean(item.photo)
          return (
            <div
              key={item.name}
              onClick={() => onItemClick(item, cat)}
              className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0 -mx-2 px-2 rounded-lg cursor-pointer group hover:bg-gold/[0.06] transition-colors"
            >
              {/* Vignette */}
              <div className="w-9 h-9 shrink-0 overflow-hidden rounded-md border border-gold/20 group-hover:border-gold/50 transition-colors">
                {hasPhoto ? (
                  <img
                    src={item.photo}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gold/[0.06] text-gold/50 text-sm group-hover:text-gold transition-colors">
                    ＋
                  </div>
                )}
              </div>

              {/* Nom + description */}
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[13px] text-white/85 group-hover:text-gold transition-colors leading-tight">
                  {item.name}
                </p>
                {item.desc && (
                  <p className="font-sans text-[10px] text-white/30 leading-tight mt-0.5">{item.desc}</p>
                )}
              </div>

              {/* Prix */}
              {cat.dual ? (
                <div className="flex gap-4 shrink-0">
                  <span className="w-14 text-right"><Price value={item.price} /></span>
                  <span className="w-14 text-right"><Price value={item.price2} /></span>
                </div>
              ) : (
                <Price value={item.price} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('sushis')
  const [selected, setSelected] = useState(null)

  return (
    <section id="menu" className="py-28 bg-dark-800">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="section-label">こんにちは</p>
          <h2 className="section-title">
            Notre <span className="italic text-gold">Carte</span>
          </h2>
          <div className="gold-divider" />
          <p className="font-sans text-xs text-white/35 tracking-widest">
            Cliquez sur un plat pour l'ajouter à votre commande
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-white/10 text-white/40 hover:border-gold/30 hover:text-white/70'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu items — grille masonry sur 2 colonnes */}
        <div className="columns-1 md:columns-2 gap-6">
          {menu[activeTab].map(cat => (
            <MenuCategory
              key={cat.category}
              cat={cat}
              onItemClick={(item, c) => setSelected({ item, cat: c })}
            />
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="font-sans text-xs text-white/25 tracking-widest mb-8">
            Informations allergènes disponibles sur demande
          </p>
          <a href="#commander" className="btn-primary text-sm">🛒 Voir ma commande</a>
        </div>

      </div>

      {/* Fiche produit */}
      {selected && (
        <ItemModal item={selected.item} cat={selected.cat} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
