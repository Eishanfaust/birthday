"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Photo {
    src: string;
    caption: string;
}

interface LeafletAlbumProps {
    photos: Photo[];
}

export default function LeafletAlbum({ photos }: LeafletAlbumProps) {
    return (
        <div className="w-full py-12 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto flex justify-center gap-2 group">
                {photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ width: "20%" }}
                        whileHover={{ width: "40%" }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="h-[400px] relative rounded-2xl overflow-hidden paper-shadow cursor-pointer flex-shrink-0"
                    >
                        <Image
                            src={photo.src}
                            alt={photo.caption}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end">
                            <p className="text-white serif italic text-lg leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {photo.caption}
                            </p>
                        </div>

                        {/* Folder fold effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 mix-blend-overlay pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
