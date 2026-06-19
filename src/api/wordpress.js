const BASE = 'https://dev-portal-2-d.pantheonsite.io/wp-json/wp/v2'

const FETCH_OPTS = { cache: 'no-store' }

export async function getPageBySlug(slug) {
  const res = await fetch(`${BASE}/pages?slug=${slug}&_embed&_=${Date.now()}`, FETCH_OPTS)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return data[0] ?? null
}

export async function getPosts({ page = 1, perPage = 10 } = {}) {
  const res = await fetch(`${BASE}/posts?page=${page}&per_page=${perPage}&_embed`, FETCH_OPTS)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getMedia({ perPage = 30 } = {}) {
  const res = await fetch(`${BASE}/media?per_page=${perPage}`, FETCH_OPTS)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getMediaBySlug(slug) {
  const res = await fetch(`${BASE}/media?slug=${slug}`, FETCH_OPTS)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return data[0] ?? null
}
