export function ErrorMessage({ message }) {
  const displayMessage =
    message.length > 0 ? message : "Enter text to search for movies";
  return <p className="error">{displayMessage}</p>;
}
