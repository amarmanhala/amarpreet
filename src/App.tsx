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
  about: { eyebrow: '04 / About', title: 'Curious by default. Particular about the details.', intro: 'I’m Amarpreet, a designer and developer in Toronto. I care about quiet, useful software and the small decisions that make it feel natural.' },
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
        <span className="avatar" aria-hidden="true">AP</span><span className="slash">/</span>
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
          Senior Frontend Developer with over 4 years of end-to-end experience in digital products, spanning SaaS, fintech, and AI-driven B2C applications. Currently, I work at Fintelics. Previously, I was a Design Lead at <a href="https://nibex.io/" target="_blank" rel="noreferrer">Nibex.io</a> and worked at <a href="https://www.linkedin.com/company/mors-llc/home/" target="_blank" rel="noreferrer">MORS</a> and <a href="https://remocapp.com/" target="_blank" rel="noreferrer">Remocapp</a>.
          <br />Feel free to reach out to me through any of the channels below.
        </p>
        <nav className="social-links" aria-label="Contact links">
          <a href="mailto:hello@amarpreet.ca">Email me <span>↗</span></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
        </nav>
      </section>
      <section className="folder-grid" aria-label="Explore portfolio">
        {folders.map((folder, index) => <Folder key={folder.title} folder={folder} index={index} />)}
      </section>
      <p className="hover-hint"><span>↖</span> Hover over a folder to peek inside</p>
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
      {page === 'about' && (
        <section className="about-panel">
          <div className="about-monogram" aria-hidden="true">A</div>
          <div><p>I like work that starts with a real question and ends with something simple enough to feel obvious. My process moves easily between a sketch, a conversation, and working code.</p><p>When I’m away from the screen, you’ll usually find me exploring Toronto, collecting references, or learning how something was made.</p><a href="mailto:hello@amarpreet.ca">Let’s make something good ↗</a></div>
        </section>
      )}
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
        <Route path="/about" element={<InteriorPage page="about" />} /><Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
