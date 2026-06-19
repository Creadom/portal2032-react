import { useState, useEffect } from 'react'
import { getMediaBySlug } from '../api/wordpress'

export default function WpLogo() {
  const [src, setSrc] = useState(null)

  useEffect(() => {
    getMediaBySlug('logo')
      .then(media => media && setSrc(media.source_url))
      .catch(() => {})
  }, [])

  if (!src) return null
  return <img src={src} alt="Portal 2032 Logo" className="wp-logo" />
}
