import Link from 'next/link';

const linkBase =
  "px-4 py-2 rounded-lg text-sm font-medium transition-colors " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "hover:bg-gray-100 ";

export default function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="border-b border-neutral-200  bg-white/80 backdrop-blur shadow-sm"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold text-gray-900">
          LuminousWeb
        </Link>
        <div className="flex gap-2" role="menubar" aria-label="Sections">
          <Link href="/news" className={linkBase} role="menuitem">
            News
          </Link>
          <Link href="/music" className={linkBase} role="menuitem">
            Music
          </Link>
          <Link href="/books" className={linkBase} role="menuitem">
            Books
          </Link>
          <Link href="/feedback" className={linkBase} role="menuitem">
            Feedback
          </Link>
        </div>
      </div>
    </nav>
  );
}
