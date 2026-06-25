/**
 * Base URL for the WordPress REST API used by these helpers.
 * @constant {string}
 */
const BASE = "https://dev-portal-2-d.pantheonsite.io/wp-json/wp/v2";

/**
 * Default fetch options used for all requests. `no-store` is used to
 * avoid client-side caching so callers always receive fresh data.
 * @constant {RequestInit}
 */
const FETCH_OPTS = { cache: "no-store" };

/**
 * Fetch a page by its slug.
 *
 * Sends a GET request to the `/pages` endpoint and returns the first
 * matching page object or `null` when no page matches the provided
 * slug. The function throws an Error when the HTTP response status is
 * not in the 2xx range.
 *
 * @param {string} slug - The page slug to query.
 * @returns {Promise<Object|null>} Resolves to the page object or `null`.
 * @throws {Error} When the HTTP response is not ok (non-2xx status).
 */
export async function getPageBySlug(slug) {
  const res = await fetch(
    `${BASE}/pages?slug=${slug}&_embed&_=${Date.now()}`,
    FETCH_OPTS,
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data[0] ?? null;
}

/**
 * Fetch a paginated list of posts.
 *
 * @param {Object} [opts] - Optional parameters.
 * @param {number} [opts.page=1] - Page number to request (1-based).
 * @param {number} [opts.perPage=10] - Number of posts per page.
 * @returns {Promise<Array>} Resolves to an array of post objects.
 * @throws {Error} When the HTTP response is not ok (non-2xx status).
 */
export async function getPosts({ page = 1, perPage = 10 } = {}) {
  const res = await fetch(
    `${BASE}/posts?page=${page}&per_page=${perPage}&_embed`,
    FETCH_OPTS,
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/**
 * Fetch media items.
 *
 * @param {Object} [opts]
 * @param {number} [opts.perPage=30] - Number of media items to return.
 * @returns {Promise<Array>} Resolves to an array of media objects.
 * @throws {Error} When the HTTP response is not ok (non-2xx status).
 */
export async function getMedia({ perPage = 30 } = {}) {
  const res = await fetch(`${BASE}/media?per_page=${perPage}`, FETCH_OPTS);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/**
 * Fetch a media item by its slug.
 *
 * Returns the first matching media object or `null` if none found. Will
 * throw an Error when the HTTP response is not ok.
 *
 * @param {string} slug - The media slug to query.
 * @returns {Promise<Object|null>} Resolves to the media object or `null`.
 * @throws {Error} When the HTTP response is not ok (non-2xx status).
 */
export async function getMediaBySlug(slug) {
  const res = await fetch(`${BASE}/media?slug=${slug}`, FETCH_OPTS);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data[0] ?? null;
}
