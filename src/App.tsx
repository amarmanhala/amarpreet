import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

type Theme = 'light' | 'dark'

const folders = [
  { title: 'Selected Work', to: '/work', tone: 'blue', cards: ['Systems', 'Product', 'Details'] },
  { title: 'Case Studies', to: '/case-studies', tone: 'peach', cards: ['Research', 'Process', 'Outcomes'] },
  { title: 'Tech Stack', to: '/tech-stack', tone: 'green', cards: ['Frontend', 'AI', 'Systems'] },
  { title: 'About Me', to: '/about', tone: 'lilac', cards: ['Values', 'Offline', 'Hello'] },
]

const pageCopy = {
  work: { eyebrow: '01 / Selected work', title: 'A small collection of considered work.', intro: 'A home for the products, systems, and digital details I’m proud to have shaped. Case studies are being prepared with the care the work deserves.' },
  notes: { eyebrow: '02 / Case studies', title: 'A closer look at how the work came together.', intro: 'The thinking, decisions, and details behind selected products—from the first question through to a considered outcome.' },
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
    </main>
  )
}

function AboutPage() {
  return (
    <main className="about-page">
      <h1 className="sr-only">About me</h1>

      <section className="about-intro">
        <p>I’m Amar, a frontend developer from Amritsar, India. I’ve always been curious about how things work—and even more interested in how technology can make everyday problems simpler.</p>
        <p>My path has taken me from Amritsar to Canada. I completed my BCA and MCA, then moved to Canada for higher studies, new perspectives, and more room to grow. Each step has taught me to stay curious, adapt quickly, and feel at home in unfamiliar problems.</p>
        <p>Today, I take products from the first rough idea all the way to production. I use AI as a practical part of that process—to explore faster, test assumptions, and turn complex work into useful software. I’m now moving toward Forward Deployed Engineer roles, where I can work closer to real users and own problems end to end.</p>
      </section>

    </main>
  )
}

const stackGroups = [
  { label: 'Product interface', tools: ['TypeScript', 'JavaScript', 'React'], note: 'The core of how I build clear, maintainable product experiences.' },
  { label: 'Backend & data', tools: ['Java', 'Spring Boot', 'PostgreSQL'], note: 'For dependable APIs, business logic, and data that products can trust.' },
  { label: 'Cloud & delivery', tools: ['GCP', 'Cloudflare'], note: 'The infrastructure I use to ship, scale, and keep products close to users.' },
  { label: 'AI engineering', tools: ['Agentic coding', 'Codex', 'RAG'], note: 'Practical AI workflows for faster execution and context-aware product features.' },
  { label: 'Design systems', tools: ['Figma', 'shadcn/ui', 'Tailwind CSS', 'Design systems'], note: 'A shared language for turning product decisions into consistent interfaces.' },
]

function TechStackPage() {
  return (
    <main className="about-page tech-stack-page">
      <h1 className="sr-only">Tech stack</h1>

      <section className="about-intro">
        <p>My stack follows the way I build: start with the product experience, move through APIs and data, then ship and run it in the cloud. I choose tools that help teams move quickly without giving up clarity or quality.</p>
        <p>AI is part of that workflow, not a separate layer. I use agentic coding and Codex to explore, implement, and validate faster—and RAG when a product needs useful answers grounded in real context.</p>
      </section>

      <section className="stack-list" aria-label="Technology groups">
        {stackGroups.map((group) => (
          <article className="stack-row" key={group.label}>
            <h2>{group.label}</h2>
            <div>
              <p className="stack-tools">
                {group.tools.map((tool) => <span key={tool}>{tool}</span>)}
              </p>
              <p className="stack-note">{group.note}</p>
            </div>
          </article>
        ))}
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
        <Route path="/case-studies" element={<InteriorPage page="notes" />} /><Route path="/tech-stack" element={<TechStackPage />} />
        <Route path="/experience" element={<TechStackPage />} />
        <Route path="/about" element={<AboutPage />} /><Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
