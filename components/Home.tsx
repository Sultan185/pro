import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Statement from '@/components/Statement'
import Marquee from '@/components/Marquee'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Motion from '@/components/Motion'

/** The one page of the site. Its language comes from the layout it is rendered in. */
export default function Home() {
  return (
    <main className="relative">
      <Nav />
      {/* The hero is sticky; this sheet slides up over it as the hero recedes. */}
      <Hero />
      <div className="sheet relative z-10 bg-bg">
        <Statement />
        <Marquee />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </div>
      <Motion />
    </main>
  )
}
