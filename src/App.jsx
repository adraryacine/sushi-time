import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Order from './components/Order'
import Footer from './components/Footer'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Order />
      <Footer />
    </CartProvider>
  )
}
