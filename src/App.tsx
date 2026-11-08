import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

type Theme = 'light' | 'dark'

const folders = [
  { title: 'Selected Work', note: 'A few things I’ve shaped', to: '/work', tone: 'blue', cards: ['Systems', 'Product', 'Details'] },
  { title: 'Field Notes', note: 'Ideas, process & experiments', to: '/notes', tone: 'peach', cards: ['Notes', 'Making', 'Process'] },
  { title: 'Experience', note: 'Where I’ve been useful', to: '/experience', tone: 'green', cards: ['Craft', 'Teams', 'Growth'] },
  { title: 'About Me', note: 'A little more context', to: '/about', tone: 'lilac', cards: ['Values', 'Offline', 'Hello'] },
]

const pageCopy = {
  work: { eyebrow: '01 / Selected work', title: 'A small collection of considered work.', intro: 'A home for the products, systems, and digital details I’m proud to have shaped. Case studies are being prepared with the care the work deserves.' },
  notes: { eyebrow: '02 / Field notes', title: 'Things I’m noticing while making things.', intro: 'Short observations on product craft, systems thinking, and the useful mess between a first idea and a finished experience.' },
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
        <span className="available"><i /> Available for select projects</span>
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
      <span className="folder-copy"><strong>{folder.title}</strong><small>{folder.note}</small></span>
    </Link>
  )
}

function Home() {
  return (
    <main className="home">
      <section className="intro" aria-labelledby="intro-title">
        <p className="eyebrow greeting">Hi, I’m Ehsan <span aria-hidden="true">👋🏻</span></p>
        <h1 id="intro-title">I design and build thoughtful<br />digital experiences.</h1>
        <p className="lede">I turn complex ideas into clear, useful products—with a soft spot for calm interfaces, strong systems, and details that feel just right.</p>
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
          {['Good interfaces explain themselves quietly', 'Prototype the question, not just the answer', 'Consistency should make room for context'].map((title, index) => (
            <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>3 min read</p></article>
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

function Footer() {
  return <footer><span>© {new Date().getFullYear()} Amarpreet</span><nav aria-label="Footer navigation">{folders.map((folder) => <NavLink key={folder.to} to={folder.to}>{folder.title}</NavLink>)}</nav></footer>
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
        <Route path="/notes" element={<InteriorPage page="notes" />} /><Route path="/experience" element={<InteriorPage page="experience" />} />
        <Route path="/about" element={<InteriorPage page="about" />} /><Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
