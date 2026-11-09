import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

type Theme = 'light' | 'dark'

const folders = [
  { title: 'Selected Work', to: '/work', tone: 'blue', cards: ['Systems', 'Product', 'Details'], preview: 'paper' },
  { title: 'Case Studies', to: '/case-studies', tone: 'peach', cards: ['Research', 'Process', 'Outcomes'], preview: 'paper' },
  { title: 'Tech Stack', to: '/tech-stack', tone: 'green', cards: ['React', 'TypeScript', 'ChatGPT'], preview: 'tech' },
  { title: 'About Me', to: '/about', tone: 'lilac', cards: ['Khalsa College', 'Amritsar', 'Toronto'], preview: 'places' },
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
        {folder.preview === 'places' ? (
          <>
            <span className="paper paper-back preview-card photo-preview">
              <img src="/khalsa-college.jpg" alt="" title="Khalsa College · Harvinder Chandigarh · CC BY-SA 4.0" /><b>Khalsa College</b>
            </span>
            <span className="paper paper-middle preview-card photo-preview">
              <img src="/amritsar-street.jpg" alt="" title="Amritsar street · Paul Simpson · CC BY 2.0" /><b>Amritsar</b>
            </span>
            <span className="paper paper-front preview-card photo-preview">
              <img src="/toronto-cn-tower.jpg" alt="" title="CN Tower from Duncan Street · Vikulinkaaa · CC BY-SA 4.0" /><b>Toronto</b>
            </span>
          </>
        ) : folder.preview === 'tech' ? (
          <>
            <span className="paper paper-back preview-card tech-preview"><img src="/react-icon.svg" alt="" /><b>React</b></span>
            <span className="paper paper-middle preview-card tech-preview"><img src="/typescript-icon.svg" alt="" /><b>TypeScript</b></span>
            <span className="paper paper-front preview-card tech-preview"><img src="/chatgpt-icon.svg" alt="" /><b>ChatGPT</b></span>
          </>
        ) : (
          <>
            <span className="paper paper-back"><b>{folder.cards[0]}</b><i /><i /><i /></span>
            <span className="paper paper-middle"><b>{folder.cards[1]}</b><span className="mini-grid"><i /><i /><i /></span></span>
            <span className="paper paper-front"><span className="paper-kicker">0{index + 1}</span><b>{folder.cards[2]}</b><i className="paper-rule" /></span>
          </>
        )}
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

const stackItems = [
  { name: 'TypeScript', color: '#3178c6', note: 'My default for building reliable frontends with clearer contracts and safer changes.' },
  { name: 'JavaScript', color: '#b58b00', note: 'The foundation of my frontend work and the language I use to understand the web deeply.' },
  { name: 'React', color: '#087ea4', note: 'I use React to build responsive product interfaces, reusable components, and scalable application flows.' },
  { name: 'Git', color: '#f05032', note: 'I use Git to keep changes focused, traceable, and easy to collaborate on.' },
  { name: 'GitHub', color: '#6e5494', note: 'Where I manage code reviews, project history, and the path from a change to production.' },
  { name: 'Vite', color: '#646cff', note: 'My preferred frontend tooling for a fast local workflow and lean production builds.' },
  { name: 'Playwright', color: '#2ead33', note: 'I use browser automation to validate real user flows and catch regressions before release.' },
  { name: 'Docker', color: '#2496ed', note: 'I use containers to create repeatable environments across development, testing, and delivery.' },
  { name: 'Java', color: '#e76f00', note: 'I use Java when product work reaches backend services and structured business logic.' },
  { name: 'Spring Boot', color: '#6db33f', note: 'My choice for shaping dependable APIs and production-ready Java services.' },
  { name: 'GCP', color: '#4285f4', note: 'I work with Google Cloud to deploy and operate products beyond the local environment.' },
  { name: 'Agentic coding', color: '#7c3aed', note: 'I use agentic workflows to plan, implement, test, and iterate with tighter feedback loops.' },
  { name: 'Codex', color: '#10a37f', note: 'A hands-on engineering collaborator in my workflow, from exploration through production changes.' },
  { name: 'RAG', color: '#8b5cf6', note: 'I use retrieval-augmented generation to ground AI experiences in useful, trusted context.' },
  { name: 'PostgreSQL', color: '#336791', note: 'For relational data models that stay understandable as a product grows.' },
  { name: 'Cloudflare', color: '#f38020', note: 'I use the edge for fast delivery, deployment, and resilient web experiences.' },
  { name: 'Figma', color: '#a259ff', note: 'Where I explore product ideas, align details, and bridge design decisions into code.' },
  { name: 'shadcn/ui', color: '#707070', note: 'A practical starting point for accessible components that can still feel distinctly product-led.' },
  { name: 'Tailwind CSS', color: '#06b6d4', note: 'I use Tailwind to move quickly while keeping layout, spacing, and responsive behavior consistent.' },
  { name: 'Design systems', color: '#e64980', note: 'I build reusable patterns that help teams ship coherent interfaces without slowing down.' },
]

function TechStackPage() {
  return (
    <main className="about-page tech-stack-page">
      <h1 className="sr-only">Tech stack</h1>

      <section className="about-intro">
        <p>My stack follows the way I build: start with the product experience, move through APIs and data, then ship and run it in the cloud. I choose tools that help teams move quickly without giving up clarity or quality.</p>
        <p>AI is part of that workflow, not a separate layer. I use agentic coding and Codex to explore, implement, and validate faster—and RAG when a product needs useful answers grounded in real context.</p>
      </section>

      <section className="tech-copy" aria-label="Technologies and experience">
        {stackItems.map((item) => (
          <p key={item.name}>
            <strong style={{ color: item.color }}>{item.name}</strong> — {item.note}
          </p>
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
