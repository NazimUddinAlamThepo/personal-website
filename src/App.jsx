import { BrowserRouter } from 'react-router-dom'
import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
import Skills         from './components/Skills'
import Projects       from './components/Projects'
import Education      from './components/Education'
import MLResearch     from './components/MLResearch'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop      from './components/BackToTop'
import { useTheme }   from './hooks/useTheme'

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <BrowserRouter>
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Sticky navbar */}
      <Navbar dark={dark} toggle={toggle} />

      {/* Main page sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <MLResearch />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </BrowserRouter>
  )
}
