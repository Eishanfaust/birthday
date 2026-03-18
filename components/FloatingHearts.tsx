"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const HEART_COUNT = 40; // Total hearts

const Heart = ({ delay, side }: { delay: number; side: "left" | "right" }) => {
    const [coords] = useState(() => ({
        x: side === "left" ? Math.random() * 25 : 75 + Math.random() * 25,
        y: 110,
    }));
    const [size] = useState(() => Math.random() * (45 - 20) + 20);
    const [duration] = useState(() => Math.random() * (15 - 8) + 8);
    const [xOffset] = useState(() => (side === "left" ? Math.random() * 15 : -Math.random() * 15));
    const [color] = useState(() => {
        const colors = ["❤️", "💖", "💗", "💓", "💝"];
        return colors[Math.floor(Math.random() * colors.length)];
    });
    const [rotation] = useState(() => Math.random() * 360);

    return (
        <motion.div
            initial={{ opacity: 0, x: `${coords.x}%`, y: "110vh" }}
            animate={{
                opacity: [0, 1, 1, 0],
                y: "-10vh",
                x: [`${coords.x}%`, `${coords.x + xOffset}%`],
                rotate: [0, rotation],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
            }}
            style={{
                position: "fixed",
                fontSize: size,
                pointerEvents: "none",
                zIndex: 5,
                filter: "drop-shadow(0 0 10px rgba(251, 113, 133, 0.4))",
            }}
        >
            {color}
        </motion.div>
    );
};

export default function FloatingHearts() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
            {Array.from({ length: HEART_COUNT }).map((_, i) => (
                <Heart
                    key={i}
                    delay={i * 0.7}
                    side={i % 2 === 0 ? "left" : "right"}
                />
            ))}
        </div>
    );
}
