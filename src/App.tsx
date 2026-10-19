import { AiSection } from './components/AiSection'
import { Engagement, Faq, Process, Testimonials, WhyHire } from './components/ClientSections'
import { Header } from './components/Header'
import { Thread } from './components/Thread'
import { Hero } from './components/Hero'
import { About, Contact, Experience, Projects, Services, Skills } from './components/Sections'
import { profile } from './data/content'

const year = new Date().getFullYear()

export default function App() {
  return (
    <>
      <Header />
      <Thread>
        <main>
          <Hero />
          <WhyHire />
          <About />
          <Skills />
          <AiSection />
          <Services />
          <Projects />
          <Process />
          <Engagement />
          <Experience />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
      </Thread>
      <footer className="relative py-8 text-center text-sm text-muted">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-thread/60 to-transparent"
        />
        © {year} {profile.name} · Built with React, TypeScript & Tailwind 💙
      </footer>
    </>
  )
}
