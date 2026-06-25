import { useState } from 'react'

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

// Modal photo
function PhotoModal({ item, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 font-sans text-xs text-white/40 hover:text-gold tracking-widest uppercase transition-colors"
        >
          Fermer ✕
        </button>

        {/* Image */}
        <img
          src={item.photo}
          alt={item.name}
          className="w-full object-cover border border-gold/10"
        />

        {/* Info */}
        <div className="bg-dark-800 border border-gold/10 border-t-0 px-6 py-4 flex justify-between items-center">
          <div>
            <p className="font-serif text-xl text-white">{item.name}</p>
            {item.desc && <p className="font-sans text-xs text-white/40 mt-1">{item.desc}</p>}
          </div>
          <p className="font-serif text-2xl text-gold ml-4">{item.price}<span className="text-base text-gold/60">¥</span></p>
        </div>
      </div>
    </div>
  )
}

function PriceTag({ price, label }) {
  return (
    <div className="text-right shrink-0 ml-4">
      {label && <p className="font-sans text-[10px] text-white/30 uppercase tracking-widest">{label}</p>}
      <p className="font-serif text-lg text-gold whitespace-nowrap">{price}<span className="text-sm text-gold/70">¥</span></p>
    </div>
  )
}

function MenuCategory({ cat, onPhotoClick }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-6 h-px bg-gold/60" />
        <div>
          <h3 className="font-serif text-2xl text-gold italic">{cat.category}</h3>
          {cat.subtitle && (
            <p className="font-sans text-[11px] text-white/35 tracking-wider mt-0.5">{cat.subtitle}</p>
          )}
        </div>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <div className="space-y-0">
        {cat.items.map((item) => {
          const hasPhoto = Boolean(item.photo)
          return (
            <div
              key={item.name}
              onClick={() => hasPhoto && onPhotoClick(item)}
              className={`flex justify-between items-start py-4 border-b border-white/5 transition-colors group px-2
                ${hasPhoto ? 'cursor-pointer hover:bg-gold/5' : 'hover:bg-white/[0.02]'}`}
            >
              <div className="flex-1 min-w-0 pr-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-serif text-base leading-snug transition-colors
                      ${hasPhoto ? 'text-white/90 group-hover:text-gold' : 'text-white/90'}`}>
                      {item.name}
                    </p>
                    {hasPhoto && (
                      <span className="text-gold/50 group-hover:text-gold transition-colors text-sm shrink-0" title="Voir la photo">
                        📷
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="font-sans text-[11px] text-white/35 mt-0.5 leading-relaxed">{item.desc}</p>
                  )}
                </div>
              </div>

              {cat.dual ? (
                <div className="flex gap-4 shrink-0">
                  <PriceTag price={item.price} label="05 pcs" />
                  <PriceTag price={item.price2} label="10 pcs" />
                </div>
              ) : (
                <PriceTag price={item.price} />
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
  const [selectedItem, setSelectedItem] = useState(null)

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
            Les plats avec 📷 sont cliquables pour voir la photo
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

        {/* Menu items */}
        <div>
          {menu[activeTab].map(cat => (
            <MenuCategory key={cat.category} cat={cat} onPhotoClick={setSelectedItem} />
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="font-sans text-xs text-white/25 tracking-widest mb-8">
            Informations allergènes disponibles sur demande
          </p>
          <a href="#contact" className="btn-gold">Nous contacter</a>
        </div>

      </div>

      {/* Photo modal */}
      {selectedItem && (
        <PhotoModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  )
}
