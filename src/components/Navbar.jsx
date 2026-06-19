import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Introduction' },
  { path: '/logbook', label: 'Logbook' },
  { path: '/description', label: 'Description' },
  { path: '/result', label: 'Result' },
  { path: '/links', label: 'Links' },
  { path: '/game', label: 'Play ▶' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-title">PORTAL</span>
        <span className="brand-year">2032</span>
      </div>
      <nav className="navbar-nav" aria-label="Navigation principale">
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
