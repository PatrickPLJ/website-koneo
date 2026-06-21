import Nav from './components/Nav'
import Hero from './components/Hero'
import Brands from './components/Brands'
import PriceList from './components/PriceList'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Brands />
        <PriceList />
        <About />
        <Contact />
      </main>
      <WhatsAppFab />
      <Footer />
    </>
  )
}
