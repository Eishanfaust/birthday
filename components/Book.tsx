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
        <div className="relative w-full max-w-2xl mx-auto aspect-[3/4] md:aspect-[4/5] perspective-2000">
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
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/10 via-black/5 to-transparent z-10" />

                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')] z-20" />

                        <div className="relative z-0 w-full h-full flex flex-col items-center justify-center p-8 md:p-12">
                            {pages[currentPage].type === "cover" && (
                                <div className="text-center space-y-6">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Heart className="mx-auto text-rose-400 fill-rose-400" size={64} />
                                    </motion.div>
                                    <h1 className="text-4xl md:text-6xl serif text-rose-900 leading-tight">
                                        Happy<br />Birthday
                                    </h1>
                                    <p className="text-2xl md:text-3xl serif italic text-rose-700/70">
                                        To my favorite person
                                    </p>
                                    <div className="pt-8">
                                        <span className="px-6 py-2 rounded-full border border-rose-200 text-rose-500 font-medium tracking-widest uppercase text-sm">
                                            Sweet 24
                                        </span>
                                    </div>
                                </div>
                            )}

                            {pages[currentPage].type === "letter" && (
                                <div className="w-full h-full flex flex-col items-center justify-center space-y-6 text-center">
                                    <div className="max-w-md space-y-4">
                                        <h2 className="text-3xl serif text-rose-900 italic">Dearest,</h2>
                                        <div className="text-lg md:text-xl leading-relaxed text-zinc-700 serif space-y-4">
                                            {pages[currentPage].content}
                                        </div>
                                        <p className="text-xl serif text-rose-800 pt-4">— Forever yours</p>
                                    </div>
                                </div>
                            )}

                            {pages[currentPage].type === "photo" && pages[currentPage].image && (
                                <div className="relative w-full h-full flex flex-col items-center justify-between">
                                    <div className="relative w-full flex-grow rounded-sm overflow-hidden border-8 border-white shadow-lg rotate-1">
                                        <Image
                                            src={pages[currentPage].image!}
                                            alt={pages[currentPage].caption || "Memory"}
                                            fill
                                            className="object-cover"
                                            priority={currentPage < 3}
                                        />
                                    </div>
                                    {pages[currentPage].caption && (
                                        <p className="mt-6 text-xl serif italic text-rose-900/80">
                                            {pages[currentPage].caption}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-20 z-50">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="p-3 rounded-full bg-white/80 hover:bg-white text-rose-900 shadow-xl disabled:opacity-0 transition-all border border-rose-100"
                    >
                        <ChevronLeft size={32} />
                    </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-20 z-50">
                    <button
                        onClick={nextPage}
                        disabled={currentPage === pages.length - 1}
                        className="p-3 rounded-full bg-white/80 hover:bg-white text-rose-900 shadow-xl disabled:opacity-0 transition-all border border-rose-100"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

                {/* Page Counter */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-rose-900/40 text-sm font-medium tracking-widest">
                    {currentPage + 1} / {pages.length}
                </div>
            </div>
        </div>
    );
}
