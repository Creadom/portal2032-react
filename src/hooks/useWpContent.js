import { useState, useEffect } from "react";
import { getPageBySlug } from "../api/wordpress";

/**
 * React hook to fetch a WordPress page by its slug.
 *
 * This hook performs a side-effect: it calls `getPageBySlug` when the
 * `slug` argument changes. While the request is in flight the `loading`
 * flag is true. On success the `page` object is set to the fetched value
 * (or `null` if no page was found). On failure the `error` string will
 * contain the error message.
 *
 * The hook also logs the request and any errors to the console for
 * debugging purposes.
 *
 * @param {string|null} slug - The slug of the WordPress page to fetch.
 *   If `null` or an empty value is passed the hook will still call the
 *   API but the behaviour depends on the remote endpoint. Prefer passing
 *   a valid non-empty slug string.
 * @returns {{
 *   page: Object|null,
 *   loading: boolean,
 *   error: string|null
 * }} An object containing the fetched `page` (or `null`), a `loading`
 * boolean indicating an in-progress request, and an `error` string when
 * the fetch failed.
 *
 * @example
 * const { page, loading, error } = useWpContent('about');
 */

export default function useWpContent(slug) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPage(null);

    getPageBySlug(slug)
      .then((data) => {
        console.log("[WP] slug:", slug, "→", data);
        setPage(data);
      })
      .catch((err) => {
        console.error("[WP] error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return { page, loading, error };
}
