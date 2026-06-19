import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-tag">// HES-SO Valais-Wallis · 64-31</div>
        <h1 className="hero-title">
          <span className="glitch" data-text="PORTAL">PORTAL</span>
          <span className="hero-year">2032</span>
        </h1>
        <p className="hero-subtitle">Between Vintage &amp; Cyberpunk</p>
        <p className="hero-desc">
          The year is 2032. Baxito's quantum AI army controls the Switzerland Dome.
          A group of rebels must use portal technology to escape and take back the world.
        </p>
        <div className="hero-actions">
          <Link to="/introduction" className="btn-primary">Enter the Dome</Link>
          <Link to="/links" className="btn-secondary">Play the Game</Link>
        </div>
      </section>

      <section className="home-grid">
        {[
          { path: '/introduction', label: 'Introduction', desc: 'Story, characters & rules' },
          { path: '/logbook', label: 'Logbook', desc: 'Team work & hours' },
          { path: '/detailed-description', label: 'Skills', desc: 'Technical implementation' },
          { path: '/result', label: 'Result', desc: 'Screenshots & gameplay' },
          { path: '/links', label: 'Links', desc: 'Source code & demo' },
        ].map(({ path, label, desc }) => (
          <Link key={path} to={path} className="home-card">
            <span className="card-label">{label}</span>
            <span className="card-desc">{desc}</span>
          </Link>
        ))}
      </section>
    </div>
  )
}
