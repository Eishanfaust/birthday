"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Heart } from "lucide-react";
import Image from "next/image";

interface Page {
    type: "cover" | "letter" | "photo";
    content?: React.ReactNode;
    image?: string;
    caption?: string;
}

interface BookProps {
    pages: Page[];
}

export default function Book({ pages }: BookProps) {
    const [currentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="relative w-full max-w-[90vw] md:max-w-2xl mx-auto aspect-[3/4.5] md:aspect-[4/5] perspective-2000 scale-[0.9] sm:scale-100 origin-center transition-transform">
            <div className="relative w-full h-full preserve-3d">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full bg-paper rounded-lg book-shadow overflow-hidden border border-black/5"
                    >
                        {/* Spine Shadow */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-black/10 via-black/5 to-transparent z-10" />

                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')] z-20" />

                        <div className="relative z-0 w-full h-full flex flex-col items-center justify-center p-4 md:p-12">
                            {pages[currentPage].type === "cover" && (
                                <div className="text-center space-y-4 md:space-y-6">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Heart className="mx-auto text-rose-400 fill-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.5)] w-12 h-12 md:w-16 md:h-16" />
                                    </motion.div>
                                    <div className="space-y-1 md:space-y-2">
                                        <h1 className="text-3xl md:text-6xl serif text-rose-900 leading-tight gold-text">
                                            Happy<br />Birthday
                                        </h1>
                                        <div className="h-0.5 w-16 md:w-24 mx-auto bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                                        <p className="text-xl md:text-3xl serif italic text-rose-700/80">
                                            Laxmi Bhandari
                                        </p>
                                        <p className="text-[10px] md:text-base serif italic text-rose-400/60 uppercase tracking-widest">
                                            aka Bhandu
                                        </p>
                                    </div>
                                    <div className="pt-2 md:pt-8">
                                        <span className="px-4 md:px-6 py-1 md:py-2 rounded-full border gold-border bg-white/50 text-rose-700 font-medium tracking-widest uppercase text-[10px] md:text-sm shadow-sm">
                                            Sweet 24
                                        </span>
                                    </div>
                                </div>
                            )}

                            {pages[currentPage].type === "letter" && (
                                <div className="w-full h-full flex flex-col items-center justify-center space-y-4 md:space-y-6 text-center">
                                    <div className="max-w-md space-y-2 md:space-y-4 overflow-y-auto px-2 max-h-full">
                                        <h2 className="text-2xl md:text-3xl serif text-rose-900 italic">Dearest Laxmi,</h2>
                                        <div className="text-base md:text-xl leading-relaxed text-zinc-700 serif space-y-2 md:space-y-4 font-light">
                                            {pages[currentPage].content}
                                        </div>
                                        <p className="text-lg md:text-xl serif text-rose-800 pt-2 gold-text">— Forever yours</p>
                                    </div>
                                </div>
                            )}

                            {pages[currentPage].type === "photo" && pages[currentPage].image && (
                                <div className="relative w-full h-full flex flex-col items-center justify-between py-4">
                                    <div className="relative w-full flex-grow rounded-sm overflow-hidden border-[8px] md:border-[12px] border-white shadow-2xl rotate-1 ring-1 ring-black/5">
                                        <Image
                                            src={pages[currentPage].image!}
                                            alt={pages[currentPage].caption || "Memory"}
                                            fill
                                            className="object-cover"
                                            priority={currentPage < 3}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                                    </div>
                                    {pages[currentPage].caption && (
                                        <div className="mt-3 md:mt-4 text-center px-2">
                                            <p className="text-sm md:text-xl serif italic text-rose-900/80 leading-snug">
                                                {pages[currentPage].caption}
                                            </p>
                                            <div className="h-px w-8 md:w-12 mx-auto mt-1 md:mt-2 bg-rose-200" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-20 z-50">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="p-2 md:p-3 rounded-full bg-white/90 hover:bg-white text-rose-900 shadow-xl disabled:opacity-0 transition-all border border-rose-100 backdrop-blur-sm"
                    >
                        <ChevronLeft size={24} className="md:w-8 md:h-8" />
                    </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-20 z-50">
                    <button
                        onClick={nextPage}
                        disabled={currentPage === pages.length - 1}
                        className="p-2 md:p-3 rounded-full bg-white/90 hover:bg-white text-rose-900 shadow-xl disabled:opacity-0 transition-all border border-rose-100 backdrop-blur-sm"
                    >
                        <ChevronRight size={24} className="md:w-8 md:h-8" />
                    </button>
                </div>

                {/* Page Counter */}
                <div className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 text-rose-900/40 text-[10px] md:text-sm font-medium tracking-widest">
                    {currentPage + 1} / {pages.length}
                </div>
            </div>
        </div>
    );
}
