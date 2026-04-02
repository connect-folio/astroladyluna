"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroEntrance() {
  return (
    <div className="relative z-10 flex flex-col items-center gap-6">
      <motion.h1
        className="font-display text-5xl md:text-9xl text-cream tracking-[0.2em] uppercase leading-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        LADY ◌ LUNA
      </motion.h1>
      <motion.p
        className="font-body text-xs text-rose tracking-[0.4em] uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
      >
        Guía Astrológica
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <Link
          href="/session"
          className="font-body text-xs tracking-widest uppercase px-8 py-3 border border-cream text-cream hover:bg-cream hover:text-plum transition-colors"
        >
          Book a Session
        </Link>
        <Link
          href="/newsletter"
          className="font-body text-xs tracking-widest uppercase px-8 py-3 text-mauve hover:text-cream transition-colors"
        >
          Read the Letters
        </Link>
      </motion.div>
    </div>
  );
}
