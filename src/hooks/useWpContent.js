import { useState, useEffect } from 'react'
import { getPageBySlug } from '../api/wordpress'

export default function useWpContent(slug) {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setPage(null)

    getPageBySlug(slug)
      .then(data => { console.log('[WP] slug:', slug, '→', data); setPage(data) })
      .catch(err => { console.error('[WP] error:', err); setError(err.message) })
      .finally(() => setLoading(false))
  }, [slug])

  return { page, loading, error }
}
