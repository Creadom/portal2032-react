import DOMPurify from "dompurify";

/**
 * Safely render an HTML string into the DOM.
 *
 * This component sanitizes the provided `html` string using
 * `DOMPurify.sanitize` and injects it via `dangerouslySetInnerHTML` on
 * the specified tag (default `div`). It intentionally uses a
 * sanitized injection and should be preferred over unsanitized
 * `dangerouslySetInnerHTML` usages.
 *
 * @param {{
 *   html: string|null|undefined,
 *   className?: string,
 *   tag?: string|Function
 * }} props - Component props.
 * @param {string|null|undefined} props.html - The raw HTML string to
 *   sanitize and render. `null`/`undefined` will render an empty string.
 * @param {string} [props.className] - Optional CSS class applied to the
 *   wrapper element.
 * @param {string|Function} [props.tag='div'] - Element type or React
 *   component used as the wrapper.
 * @returns {JSX.Element} The element with sanitized inner HTML.
 */
export default function SafeHtml({ html, className, tag: Tag = "div" }) {
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html ?? "") }}
    />
  );
}
