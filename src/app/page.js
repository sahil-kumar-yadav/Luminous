"use client"

import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import Main from "@/components/Main/Main";
import Nav from "@/components/Navbar/Nav";
import Section from "@/components/Section/Section";
import TextToSpeech from "@/components/TextToSpeech/TextToSpeech";
import Head from "next/head";

export default function Home() {

  return (
    <>
      {/* <div>
      <h1 className="mb-5 ">Text to Speech on Hover</h1>
      <TextToSpeech text=" first" />
      <div className="mt-5 mb-5">hello</div>
      <TextToSpeech text=" second" />
    </div> */}
       <Head>
        <title>My Next.js App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main>
        <Section
          title="A Comprehensive Tool for visually impaired"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid asperiores quisquam inventore magni? Ex totam doloribus rem minus magni adipisci ipsum aspernatur architecto nesciunt, explicabo inventore repellat sint perspiciatis a ipsam repellendus!"
        >
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400 left-0 pl-2.5 pointer-events-none">
              <svg slot="left" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              className="block w-full disabled:cursor-not-allowed disabled:opacity-50 pl-11 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 sm:text-base rounded-lg"
              placeholder="Search"
              type="search"
            />
          </div>
        </Section>

        <Section>
          <div className="grid gap-2 space-y-0 grid-cols-2 lg:grid-cols-4">
            <Card href="" icon="key" title="Book Reading" />
            <Card href="" icon="palette" title="News" />
            <Card href="" icon="text-size" title="Music" />
            <Card href="" icon="shuffle" title="Send Email" />
          </div>
        </Section>
      </Main>

      <Footer />
   
    </>
  );
}
