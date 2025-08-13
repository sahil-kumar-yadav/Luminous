export default function Footer() {
  return (
    <footer className="mt-10 border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <p className="text-sm opacity-80">© {new Date().getFullYear()} AccessibleWeb — Built for inclusive access.</p>
      </div>
    </footer>
  );
}