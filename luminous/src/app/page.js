
export default function Home() {
  return (
    <section
      aria-labelledby="home-heading"
      className="text-black px-4 py-12 sm:px-6 lg:px-8"
    >
     
      <div className="max-w-3xl mx-auto">
        <h1
          id="home-heading"
          className="text-4xl font-bold tracking-tight text-gray-900  mb-6"
        >
          Welcome to LuminousWeb
        </h1>

        <p className="text-lg leading-relaxed text-gray-700 ">
          This site is optimized for screen readers and keyboard use. Use the
          <strong> Skip to content</strong> link to jump into the main area. Navigate to
          News, Music, Books, or Feedback using the top navigation. Speech commands will
          be added next.
        </p>

        <ul className="list-disc space-y-3 pl-6 text-gray-700">
          <li className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
            All interactive elements are keyboard focusable.
          </li>
          <li className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
            High-contrast defaults and visible focus outlines are enabled.
          </li>
          <li className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
            Landmarks (header, main, footer) help screen reader navigation.
          </li>
        </ul>
      </div>
    </section>

  );
}
