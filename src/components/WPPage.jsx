import useWpContent from '../hooks/useWpContent'
import SafeHtml from './SafeHtml'
import Loader from './Loader'
import ErrorBox from './ErrorBox'
import WpLogo from './WpLogo'

function formatDate(isoStr) {
  const d = new Date(isoStr)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy} à ${hh}:${min}`
}

export default function WPPage({ slug }) {
  const { page, loading, error } = useWpContent(slug)

  if (loading) return <Loader label="LOADING DATA FROM SWISS DOME..." />
  if (error) return <ErrorBox msg={error} />
  if (!page) return <ErrorBox msg={`Page "${slug}" introuvable dans WordPress.`} />

  const author = page._embedded?.author?.[0]?.name ?? '—'
  const featuredImg = page._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null

  return (
    <article className="wp-article cyber-box">
      <header className="article-header">
        <WpLogo />
        <SafeHtml tag="h1" className="article-title" html={page.title.rendered} />
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
  )
}
