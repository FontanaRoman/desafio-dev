export default function ErrorMessage({ error }) {
  return (
    error && <span className="text-red-500 text-sm">{error.message}</span>
  );
}
