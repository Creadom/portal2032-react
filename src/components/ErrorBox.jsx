/**
 * Simple presentational component that displays an error message box.
 *
 * This component renders a styled container with a fixed error tag and
 * the provided message. It is purely presentational and has no side
 * effects.
 *
 * @param {{msg: string}} props - Component props.
 * @param {string} props.msg - The human-readable error message to show.
 * @returns {JSX.Element} A markup block containing the error information.
 */
export default function ErrorBox({ msg }) {
  return (
    <div className="error-box">
      <p className="error-tag">// ERROR</p>
      <p className="error-msg">{msg}</p>
    </div>
  );
}
