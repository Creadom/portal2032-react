/**
 * Visual loading indicator used across the app.
 *
 * Renders an animated portal graphic and an optional label. The
 * `label` prop defaults to a French loading string but can be localized
 * by callers.
 *
 * @param {{label?: string}} props - Component props.
 * @param {string} [props.label='CHARGEMENT EN COURS...'] - The text
 *   displayed beneath the loader graphic.
 * @returns {JSX.Element} The loader element.
 */
export default function Loader({ label = "CHARGEMENT EN COURS..." }) {
  return (
    <div className="loader">
      <div className="portal-ring">
        <div className="portal-inner" />
        <div className="portal-core" />
      </div>
      <p className="loader-text">// {label}</p>
    </div>
  );
}
