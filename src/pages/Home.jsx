import { useRef } from 'react'
import GalaxyAnimation from '../components/GalaxyAnimation'
import About from '../components/About'
import Skills from '../components/Skills'
import Education from '../components/Education'
import Contact from '../components/Contact'

export default function Home({ dark }) {
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const educationRef = useRef(null)
  const contactRef = useRef(null)

  return (
    <main>
      {/* Galaxy Hero Section */}
      <GalaxyAnimation dark={dark} />

      {/* About Section */}
      <section id="about-home" ref={aboutRef} className="py-0">
        <About />
      </section>

      {/* Skills Section */}
      <section id="skills-home" ref={skillsRef} className="py-0">
        <Skills />
      </section>

      {/* Education Section */}
      <section id="education-home" ref={educationRef} className="py-0">
        <Education />
      </section>

      {/* Contact Section */}
      <section id="contact-home" ref={contactRef} className="py-0">
        <Contact />
      </section>
    </main>
  )
}
