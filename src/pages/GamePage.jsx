export default function GamePage() {
  return (
    <div className="game-page">
      <h1 className="page-title">// Play Portal 2032</h1>
      <div className="game-wrapper">
        <iframe
          src="https://wizzardledgent.github.io/PortalWebsite/game-content/index.html"
          title="Portal 2032 Game"
          className="game-frame"
          allowFullScreen
        />
      </div>
    </div>
  )
}
