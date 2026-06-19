export default function ErrorBox({ msg }) {
  return (
    <div className="error-box">
      <p className="error-tag">// ERROR</p>
      <p className="error-msg">{msg}</p>
    </div>
  )
}
