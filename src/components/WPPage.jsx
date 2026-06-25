import useWpContent from "../hooks/useWpContent";
import SafeHtml from "./SafeHtml";
import Loader from "./Loader";
import ErrorBox from "./ErrorBox";
import WpLogo from "./WpLogo";

/**
 * Format an ISO date/time string into a human readable French-styled
 * date with time.
 *
 * This is an internal helper used by `WPPage` and is deterministic; it
 * returns a string in the form `DD/MM/YYYY à HH:MM`.
 *
 * @private
 * @param {string} isoStr - An ISO-8601 timestamp string.
 * @returns {string} Formatted date/time string.
 */
function formatDate(isoStr) {
  const d = new Date(isoStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} à ${hh}:${min}`;
}

/**
 * Page component that fetches and renders a WordPress page by slug.
 *
 * The component uses `useWpContent(slug)` to request the page. It
 * renders a `Loader` while loading, an `ErrorBox` on error or when the
 * page is missing, and otherwise renders the article with title,
 * byline, optional featured image and the page content (safely
 * sanitized via `SafeHtml`).
 *
 * Props:
 * @param {{slug: string}} props - Component props.
 * @param {string} props.slug - The slug of the WordPress page to load.
 *
 * @returns {JSX.Element} The rendered article for the requested page.
 */
export default function WPPage({ slug }) {
  const { page, loading, error } = useWpContent(slug);

  if (loading) return <Loader label="LOADING DATA FROM SWISS DOME..." />;
  if (error) return <ErrorBox msg={error} />;
  if (!page)
    return <ErrorBox msg={`Page "${slug}" introuvable dans WordPress.`} />;

  const author = page._embedded?.author?.[0]?.name ?? "—";
  const featuredImg =
    page._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

  return (
    <article className="wp-article cyber-box">
      <header className="article-header">
        <WpLogo />
        <SafeHtml
          tag="h1"
          className="article-title"
          html={page.title.rendered}
        />
        <p className="article-byline">
          Par <strong>{author}</strong> le {formatDate(page.date)}
        </p>
      </header>

      {featuredImg && (
        <img
          src={featuredImg}
          alt={page.title.rendered}
          className="featured-image"
        />
      )}

      <SafeHtml html={page.content.rendered} className="wp-content" />
    </article>
  );
}
