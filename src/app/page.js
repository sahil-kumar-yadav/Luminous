"use client"

import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import Main from "@/components/Main/Main";
import Nav from "@/components/Navbar/Nav";
import SearchBox from "@/components/Search/SearchBox";
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
        {/* <title>My Next.js App</title> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <SearchBox/>
      

      <Main>
        <Section
          title="A Comprehensive Tool for visually impaired"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid asperiores quisquam inventore magni? Ex totam doloribus rem minus magni adipisci ipsum aspernatur architecto nesciunt, explicabo inventore repellat sint perspiciatis a ipsam repellendus!"
        >

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
