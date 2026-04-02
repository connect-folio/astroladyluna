"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PHOTOS = [
  { src: "/assets/lady-luna-sunlight.jpeg", alt: "Lady Luna in golden sunlight" },
  { src: "/assets/lady-luna-green.jpeg", alt: "Lady Luna in nature" },
  { src: "/assets/lady-luna-winter.jpeg", alt: "Lady Luna in winter light" },
];

export default function PhotoCarousel() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % PHOTOS.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-plum">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={PHOTOS[index].src}
            alt={PHOTOS[index].alt}
            fill
            className="object-cover object-top"
            priority={index === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev arrow */}
      <button
        onClick={prev}
        aria-label="Previous photo"
        className="absolute left-6 top-1/2 -translate-y-1/2 text-cream opacity-60 hover:opacity-100 transition-opacity text-2xl font-light z-10 select-none"
      >
        ←
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Next photo"
        className="absolute right-6 top-1/2 -translate-y-1/2 text-cream opacity-60 hover:opacity-100 transition-opacity text-2xl font-light z-10 select-none"
      >
        →
      </button>
    </div>
  );
}
