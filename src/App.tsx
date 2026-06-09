import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Menu from './components/Menu'
import About from './components/About'
import Story from './components/Story'
import GoesTo from './components/GoesTo'
import Visit from './components/Visit'
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
        <Marquee />
        <Menu />
        <About />
        <Story />
        <GoesTo />
        <Visit />
      </main>
      <WhatsAppFab />
      <Footer />
    </>
  )
}
