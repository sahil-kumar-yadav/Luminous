
import "./globals.css";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import GlobalVoiceCommands from "@/components/GlobalVoiceCommands";



export const metadata = {
  title: 'Luminous Web',
  description: 'An accessible website with speech-first navigation for blind users.'
};

export default function RootLayout({ children }) {
  return (

    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-white text-black dark:bg-neutral-950 dark:text-neutral-50 font-sans antialiased">
        {/* Skip to main content link for keyboard users */}
        <SkipLink />

        {/* Site header / navigation */}
        <header role="banner" className="border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
          <Nav />
        </header>

        {/* Main content area */}
        <main
          id="main-content"
          role="main"
          className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
        >
          <GlobalVoiceCommands />
          {children}
        </main>

        {/* Footer / site info */}
        <footer role="contentinfo" className="border-t border-neutral-200 dark:border-neutral-800 mt-8">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
