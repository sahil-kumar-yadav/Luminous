export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed left-2 top-2 z-50 rounded-lg bg-black/80 px-3 py-2 text-white"
    >
      Skip to content
    </a>
  );
}