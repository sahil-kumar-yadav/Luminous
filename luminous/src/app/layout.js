import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";



export const metadata = {
  title: 'Luminous Web',
  description: 'An accessible website with speech-first navigation for blind users.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-neutral-950 dark:text-neutral-50">
        <SkipLink />
        <Nav />
        <main id="main-content" role="main" className="mx-auto max-w-5xl px-4 py-6">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
