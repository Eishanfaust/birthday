"use client";

import Book from "@/components/Book";
import { motion } from "framer-motion";

export default function Home() {
  const photoPages = Array.from({ length: 24 }, (_, i) => ({
    type: "photo" as const,
    image: `/images/${i + 1}.jpeg`,
    caption: i === 0 ? "Where it all began..." : i === 23 ? "To many more years together ❤️" : undefined,
  }));

  const pages = [
    { type: "cover" as const },
    {
      type: "letter" as const,
      content: (
        <div className="space-y-4">
          <p>Happy 24th birthday!</p>
          <p>
            It’s incredible to think about the journey you’ve had so far.
            You are the most beautiful soul I know, inside and out.
            These 24 photos represent just a fraction of the reasons
            why I fall for you every single day.
          </p>
          <p>
            Here’s to you, to us, and to the beautiful journey ahead.
            I love you more than words can say.
          </p>
        </div>
      ),
    },
    ...photoPages,
  ];

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 py-16 bg-[#FAF9F6]">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full z-10 flex flex-col items-center"
      >
        <header className="text-center mb-8 space-y-2">
          <p className="text-rose-400 font-medium tracking-[0.3em] uppercase text-[10px] md:text-xs">A special gift for her</p>
          <h2 className="text-xl md:text-2xl serif italic text-rose-900/60">24 Years of You</h2>
        </header>

        <Book pages={pages} />

        <footer className="mt-12 text-center">
          <p className="text-rose-900/30 text-xs md:text-sm serif italic">
            Tap the arrows to turn the pages
          </p>
        </footer>
      </motion.div>
    </main>
  );
}
