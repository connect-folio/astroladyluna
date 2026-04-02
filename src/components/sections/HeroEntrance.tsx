"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function HeroEntrance() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

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
        {t.tagline}
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
          {t.bookSession}
        </Link>
        <Link
          href="/newsletter"
          className="font-body text-xs tracking-widest uppercase px-8 py-3 text-mauve hover:text-cream transition-colors"
        >
          {t.readLetters}
        </Link>
      </motion.div>
    </div>
  );
}
