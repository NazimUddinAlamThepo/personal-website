import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
import Skills         from './components/Skills'
import Projects       from './components/Projects'
import Education      from './components/Education'
import MLResearch     from './components/MLResearch'
import LearningLog    from './components/LearningLog'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop      from './components/BackToTop'
import { useTheme }   from './hooks/useTheme'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <BrowserRouter>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Sticky navbar */}
      <Navbar dark={dark} toggle={toggle} />

      {/* Routes */}
      <Routes>
        {/* Home page - all sections except Learning and Projects */}
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <About />
              <Skills />
              <Education />
              <MLResearch />
              <Contact />
            </main>
          }
        />

        {/* Projects page */}
        <Route
          path="/projects"
          element={
            <main>
              <Projects />
            </main>
          }
        />

        {/* Learning page */}
        <Route
          path="/learning"
          element={
            <main>
              <LearningLog />
            </main>
          }
        />
      </Routes>

      <Footer />
      <BackToTop />
    </BrowserRouter>
  )
}
