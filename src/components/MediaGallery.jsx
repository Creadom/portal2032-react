import { useState, useEffect } from 'react'
import { getMedia } from '../api/wordpress'
import Loader from './Loader'
import ErrorBox from './ErrorBox'

export default function MediaGallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getMedia({ perPage: 30 })
      .then(data => setItems(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader label="Chargement des images..." />
  if (error) return <ErrorBox msg={error} />
  if (!items.length) return null

  return (
    <section className="media-gallery">
      <h2 className="gallery-title">// Galerie médias</h2>
      <div className="gallery-grid">
        {items.map(item => (
          <figure key={item.id} className="gallery-item">
            <img
              src={item.source_url}
              alt={item.alt_text || item.title?.rendered || ''}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
