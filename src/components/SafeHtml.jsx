import DOMPurify from 'dompurify'

export default function SafeHtml({ html, className, tag: Tag = 'div' }) {
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html ?? '') }}
    />
  )
}
