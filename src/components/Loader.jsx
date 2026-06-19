export default function Loader({ label = 'CHARGEMENT EN COURS...' }) {
  return (
    <div className="loader">
      <div className="portal-ring">
        <div className="portal-inner" />
        <div className="portal-core" />
      </div>
      <p className="loader-text">// {label}</p>
    </div>
  )
}
