import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

type Theme = 'light' | 'dark'

const folders = [
  { title: 'Selected Work', to: '/work', tone: 'blue', cards: ['Systems', 'Product', 'Details'] },
  { title: 'Case Studies', to: '/case-studies', tone: 'peach', cards: ['Research', 'Process', 'Outcomes'] },
  { title: 'Experience', to: '/experience', tone: 'green', cards: ['Craft', 'Teams', 'Growth'] },
  { title: 'About Me', to: '/about', tone: 'lilac', cards: ['Values', 'Offline', 'Hello'] },
]

const pageCopy = {
  work: { eyebrow: '01 / Selected work', title: 'A small collection of considered work.', intro: 'A home for the products, systems, and digital details I’m proud to have shaped. Case studies are being prepared with the care the work deserves.' },
  notes: { eyebrow: '02 / Case studies', title: 'A closer look at how the work came together.', intro: 'The thinking, decisions, and details behind selected products—from the first question through to a considered outcome.' },
  experience: { eyebrow: '03 / Experience', title: 'Working across design and development.', intro: 'I enjoy the point where clear thinking becomes a tangible interface—collaborating closely, prototyping quickly, and refining the details.' },
}

function useTorontoTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])
  return time
}

function Header({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  const time = useTorontoTime()
  return (
    <header className="site-header">
      <Link className="identity" to="/" aria-label="Amarpreet, home">
        <img className="brand-logo" src="/amar-logo.png" alt="" /><span className="slash">/</span>
        <span className="place">Toronto</span><span className="clock" aria-label={`Toronto time ${time}`}>{time}</span>
      </Link>
      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? '◐' : '◑'}
        </button>
      </div>
    </header>
  )
}

function Folder({ folder, index }: { folder: (typeof folders)[number]; index: number }) {
  return (
    <Link className={`folder-card ${folder.tone}`} to={folder.to} style={{ '--delay': `${index * 70}ms` } as React.CSSProperties}>
      <span className="folder-visual" aria-hidden="true">
        <span className="paper paper-back"><b>{folder.cards[0]}</b><i /><i /><i /></span>
        <span className="paper paper-middle"><b>{folder.cards[1]}</b><span className="mini-grid"><i /><i /><i /></span></span>
        <span className="paper paper-front"><span className="paper-kicker">0{index + 1}</span><b>{folder.cards[2]}</b><i className="paper-rule" /></span>
        <img src="/folder.webp" alt="" />
      </span>
      <span className="folder-copy"><strong>{folder.title}</strong></span>
    </Link>
  )
}

function Home() {
  return (
    <main className="home">
      <section className="intro" aria-labelledby="intro-title">
        <h1 id="intro-title" className="greeting">Hi, I’m Amar <span aria-hidden="true">👋🏻</span></h1>
        <p className="bio">
          Senior Frontend Developer with over 4 years of end-to-end experience in digital products, spanning SaaS, fintech, and AI-driven B2C applications. Currently, I work at <strong>Fintelics</strong>.
          <br />Feel free to reach out to me through any of the channels below.
        </p>
        <nav className="social-links" aria-label="Contact links">
          <a href="mailto:amar.manhala@gmail.com">Email me <span>↗</span></a>
          <a href="https://www.linkedin.com/in/hyumanamar/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
          <a href="https://github.com/amarmanhala" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
        </nav>
      </section>
      <section className="folder-grid" aria-label="Explore portfolio">
        {folders.map((folder, index) => <Folder key={folder.title} folder={folder} index={index} />)}
      </section>
      <p className="hover-hint">
        <svg viewBox="0 0 34 28" aria-hidden="true">
          <path d="M31 24C20 25 11 19 8 8" />
          <path d="M3 12 8 7l6 4" />
        </svg>
        Hover over a folder to peek inside
      </p>
    </main>
  )
}

function InteriorPage({ page }: { page: keyof typeof pageCopy }) {
  const copy = pageCopy[page]
  const location = useLocation()
  return (
    <main className="interior" key={location.pathname}>
      <div className="interior-heading">
        <Link className="back-link" to="/">← Back home</Link>
        <p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="interior-intro">{copy.intro}</p>
      </div>
      {page === 'work' && (
        <section className="project-list" aria-label="Selected projects">
          {['A clearer way to navigate complexity', 'A small system with room to grow', 'The useful detail people remember'].map((title, index) => (
            <article className={`project project-${index + 1}`} key={title}>
              <div className="project-art" aria-hidden="true"><span /><span /><span /></div>
              <div><small>Case study · 0{index + 1}</small><h2>{title}</h2><p>Product thinking · Interaction · Systems</p></div>
            </article>
          ))}
        </section>
      )}
      {page === 'notes' && (
        <section className="note-list">
          {['From ambiguity to a clear product direction', 'Building a system with room to grow', 'Refining the details that shape trust'].map((title, index) => (
            <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>Case study</p></article>
          ))}
        </section>
      )}
      {page === 'experience' && (
        <section className="timeline">
          <article><span>Now</span><div><h2>Independent practice</h2><p>Designing and building focused digital products with thoughtful teams.</p></div></article>
          <article><span>Previously</span><div><h2>Product design & development</h2><p>Turning ambiguity into clear flows, prototypes, and production-ready interfaces.</p></div></article>
          <article><span>Always</span><div><h2>Learning in public</h2><p>Following curiosity across technology, craft, and the way people use tools.</p></div></article>
        </section>
      )}
    </main>
  )
}

function AboutPage() {
  return (
    <main className="about-page">
      <Link className="back-link" to="/">← Back home</Link>
      <h1 className="sr-only">About me</h1>

      <section className="about-intro">
        <p>I’m Amar, a frontend developer from Amritsar, India. I’ve always been curious about how things work—and even more interested in how technology can make everyday problems simpler.</p>
        <p>My path has taken me from Amritsar to Canada. I completed my BCA and MCA, then moved to Canada for higher studies, new perspectives, and more room to grow. Each step has taught me to stay curious, adapt quickly, and feel at home in unfamiliar problems.</p>
        <p>Today, I take products from the first rough idea all the way to production. I use AI as a practical part of that process—to explore faster, test assumptions, and turn complex work into useful software. I’m now moving toward Forward Deployed Engineer roles, where I can work closer to real users and own problems end to end.</p>
      </section>

      <section className="journey-card" aria-labelledby="roots-title">
        <figure>
          <img src="/amritsar.jpg" alt="A wide view of the Golden Temple in Amritsar" />
          <figcaption>
            Golden Temple, Amritsar · Photo by <a href="https://commons.wikimedia.org/wiki/User:Satbir_4" target="_blank" rel="noreferrer">Satbir 4</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>
          </figcaption>
        </figure>
        <div className="journey-copy">
          <span>Where it started</span>
          <h2 id="roots-title">Amritsar, India</h2>
          <p>Amritsar is home—the place where my curiosity, values, and instinct to keep moving forward first took shape. It remains an important part of how I see the world, even as my journey continues in Canada.</p>
        </div>
      </section>

      <section className="education-card" aria-labelledby="education-title">
        <div className="education-heading">
          <span>Education</span>
          <h2 id="education-title">Khalsa College</h2>
          <p>I completed my Bachelor of Computer Applications and Master of Computer Applications at Khalsa College. Those years gave me a strong technical foundation and the confidence to keep learning by building.</p>
        </div>
        <figure>
          <img src="/khalsa-college.jpg" alt="The historic main building of Khalsa College in Amritsar" />
          <figcaption>
            Khalsa College, Amritsar · Photo by <a href="https://commons.wikimedia.org/wiki/User:Harvinder_Chandigarh" target="_blank" rel="noreferrer">Harvinder Chandigarh</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>
          </figcaption>
        </figure>
      </section>

      <section className="approach-section" aria-labelledby="approach-title">
        <div className="approach-heading">
          <span>How I work today</span>
          <h2 id="approach-title">Close to the problem. Responsible for the outcome.</h2>
        </div>
        <div className="approach-grid">
          <article><b>01</b><h3>Start with people</h3><p>I listen for the real problem behind the request and keep the people using the product in view.</p></article>
          <article><b>02</b><h3>Build end to end</h3><p>I’m comfortable moving from an early idea and interface through implementation, iteration, and production.</p></article>
          <article><b>03</b><h3>Use AI with purpose</h3><p>I use AI to accelerate exploration and execution while keeping judgment, quality, and the outcome human-led.</p></article>
        </div>
      </section>

      <section className="about-contact">
        <p>Have something thoughtful in mind?</p>
        <a href="mailto:amar.manhala@gmail.com">Let’s talk ↗</a>
      </section>
    </main>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => localStorage.getItem('theme') === 'dark' ? 'dark' : 'light')
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme) }, [theme])
  return (
    <div className="site-shell">
      <ScrollToTop />
      <Header theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home />} /><Route path="/work" element={<InteriorPage page="work" />} />
        <Route path="/case-studies" element={<InteriorPage page="notes" />} /><Route path="/experience" element={<InteriorPage page="experience" />} />
        <Route path="/about" element={<AboutPage />} /><Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
