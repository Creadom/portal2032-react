import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import WPPage from './components/WPPage'
import MediaGallery from './components/MediaGallery'
import GamePage from './pages/GamePage'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<WPPage slug="introduction" />} />
          <Route path="/logbook" element={<WPPage slug="logbook" />} />
          <Route path="/description" element={<WPPage slug="description" />} />
          <Route path="/result" element={
            <>
              <WPPage slug="result" />
              <MediaGallery />
            </>
          } />
          <Route path="/links" element={<WPPage slug="links" />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>Portal 2032 — HES-SO Valais-Wallis · 64-31 Web Development</p>
      </footer>
    </div>
  )
}
