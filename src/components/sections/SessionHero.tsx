"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function SessionHero() {
  const { lang } = useLanguage();
  const t = translations[lang].session;

  return (
    <section className="bg-cream pt-28 pb-12 px-6 md:px-16">
      <div className="max-w-3xl">
        <p className="font-body text-xs text-mauve tracking-widest uppercase mb-6">
          {t.breadcrumb}
        </p>
        <h1 className="font-display text-6xl text-plum leading-tight">
          {t.heading}
        </h1>
        <p className="font-body text-base text-mauve mt-4 leading-relaxed">
          {t.subheading}
        </p>
      </div>
    </section>
  );
}
