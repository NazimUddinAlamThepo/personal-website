import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar         from './components/Navbar'
import Footer         from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop      from './components/BackToTop'
import { useTheme }   from './hooks/useTheme'

// Pages
import Home           from './pages/Home'
import AboutPage      from './pages/About'
import SkillsPage     from './pages/Skills'
import ProjectsPage   from './pages/ProjectsPage'
import EducationPage  from './pages/Education'
import ResearchPage   from './pages/Research'
import CertificationsPage from './pages/Certifications'
import LearningPage   from './pages/Learning'
import ContactPage    from './pages/Contact'
import DeepFocusPage  from './pages/DeepFocus'
import DeepFocusActivePage from './pages/DeepFocusActive'
import DeepFocusCompletePage from './pages/DeepFocusComplete'

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
      <ScrollToTop />
      <AppShell dark={dark} toggle={toggle} />
    </BrowserRouter>
  )
}

function AppShell({ dark, toggle }) {
  const { pathname } = useLocation()
  const isDeepFocusRoute = pathname.startsWith('/deep-focus')
  const deepFocusContentClass = isDeepFocusRoute ? 'pt-4 sm:pt-6' : ''

  return (
    <>
      {!isDeepFocusRoute && <ScrollProgress />}
      <Navbar dark={dark} toggle={toggle} />

      <div className={deepFocusContentClass}>
        <Routes>
          <Route path="/"               element={<Home dark={dark} />}              />
          <Route path="/about"          element={<AboutPage />}         />
          <Route path="/skills"         element={<SkillsPage />}        />
          <Route path="/projects"       element={<ProjectsPage />}      />
          <Route path="/education"      element={<EducationPage />}     />
          <Route path="/research"       element={<ResearchPage />}      />
          <Route path="/certifications" element={<CertificationsPage />}/>
          <Route path="/learning"       element={<LearningPage />}      />
          <Route path="/contact"        element={<ContactPage />}       />
          <Route path="/deep-focus"     element={<DeepFocusPage />}     />
          <Route path="/deep-focus/active" element={<DeepFocusActivePage />} />
          <Route path="/deep-focus/complete" element={<DeepFocusCompletePage />} />
        </Routes>
      </div>

      {!isDeepFocusRoute && <Footer />}
      {!isDeepFocusRoute && <BackToTop />}
    </>
  )
}
