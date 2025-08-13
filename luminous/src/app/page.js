import Image from "next/image";

export default function Home() {
  return (
    <section aria-labelledby="home-heading">
      <h1 id="home-heading" className="mb-4 text-3xl font-extrabold tracking-tight">Welcome to AccessibleWeb</h1>
      <p className="max-w-2xl text-lg">
        This site is optimized for screen readers and keyboard use. Use the
        <strong> Skip to content</strong> link to jump into the main area. Navigate to
        News, Music, Books, or Feedback using the top navigation. Speech commands will
        be added next.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-6">
        <li>All interactive elements are keyboard focusable.</li>
        <li>High-contrast defaults and visible focus outlines are enabled.</li>
        <li>Landmarks (header, main, footer) help screen reader navigation.</li>
      </ul>
    </section>
  );
}
