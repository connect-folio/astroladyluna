"use client";

import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";
import NewsletterInlineForm from "@/components/sections/NewsletterInlineForm";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function NewsletterPageContent() {
  const { lang } = useLanguage();
  const t = translations[lang].newsletter;

  return (
    <>
      {/* ── Split hero ── */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left — plum */}
        <div className="bg-plum flex items-center justify-center p-12 md:p-16 min-h-[50vh]">
          <FadeUp delay={0} className="max-w-sm w-full flex flex-col gap-6">
            <p className="font-body text-xs tracking-widest text-rose uppercase">
              {t.weeklyLettersLabel}
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-cream leading-tight">
              {t.heading}
            </h1>
            <p className="font-body text-base text-lavender leading-relaxed">
              {t.body}
            </p>
            <div className="flex flex-col gap-0 border-t border-mauve/30 pt-6 mt-2">
              {t.teasers.map((teaser) => (
                <p
                  key={teaser}
                  className="font-body text-sm text-lavender/70 py-3 border-b border-mauve/20"
                >
                  {teaser}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Right — cream */}
        <div className="bg-cream flex items-center justify-center p-12 md:p-16 min-h-[50vh]">
          <FadeUp delay={0.15} className="max-w-xs w-full flex flex-col gap-6">
            <p className="font-body text-xs tracking-widest text-mauve uppercase">
              {t.startReadingLabel}
            </p>
            <h2 className="font-display text-4xl text-plum leading-tight">
              {t.freeIssuesHeading}
            </h2>
            <p className="font-body text-sm text-mauve leading-relaxed">
              {t.freeIssuesBody}
            </p>
            <NewsletterInlineForm
              variant="dark"
              buttonLabel={t.getFirstLetterButton}
            />
          </FadeUp>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section className="bg-cream border-t border-plum/10 py-12 px-6 text-center">
        <p className="font-display text-2xl text-plum italic mb-4">
          {t.socialProof}
        </p>
        <Link
          href="https://instagram.com/ladyluna.1111"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs text-mauve tracking-widest uppercase hover:text-plum transition-colors"
        >
          @ladyluna.1111
        </Link>
      </section>
    </>
  );
}
