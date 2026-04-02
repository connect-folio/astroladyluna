"use client";

import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";
import NewsletterInlineForm from "@/components/sections/NewsletterInlineForm";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const PRODUCT_HREFS = ["/session", "/course", "/newsletter"] as const;

export default function HomeContent() {
  const { lang } = useLanguage();
  const t = translations[lang].home;

  return (
    <>
      {/* ── Section 2: Products ── */}
      <section className="bg-cream py-24 px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.4em] text-mauve uppercase mb-12 text-center">
          {t.whatIOffer}
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.products.map((p, i) => (
            <FadeUp key={PRODUCT_HREFS[i]} delay={i * 0.1}>
              <div className="border border-plum/10 rounded-none p-8 flex flex-col gap-4 hover:shadow-md transition-shadow h-full">
                <span className="font-body text-xs tracking-[0.3em] text-mauve uppercase">
                  {p.tag}
                </span>
                <h2 className="font-display text-2xl text-plum">{p.title}</h2>
                <p className="font-body text-sm text-plum/70 flex-1 leading-relaxed">
                  {p.body}
                </p>
                <p className="font-body text-sm text-mauve">{p.price}</p>
                <Link
                  href={PRODUCT_HREFS[i]}
                  className="font-body text-xs tracking-widest text-plum hover:text-mauve transition-colors mt-auto"
                >
                  {p.cta}
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Section 3: About strip ── */}
      <section className="bg-plum py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeUp delay={0}>
            <blockquote className="font-display text-3xl text-cream italic leading-snug">
              {t.quote}
            </blockquote>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex flex-col gap-4">
              <p className="font-body text-sm text-lavender leading-relaxed">
                {t.aboutBody}
              </p>
              <Link
                href="https://instagram.com/ladyluna.1111"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs tracking-widest text-mauve hover:text-lavender transition-colors uppercase"
              >
                {t.followCta}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Section 4: Newsletter inline CTA ── */}
      <section className="bg-rose/20 py-16 px-6">
        <div className="max-w-md mx-auto flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-4xl text-plum">
            {t.newsletterHeading}
          </h2>
          <p className="font-body text-sm text-mauve">{t.newsletterSubheading}</p>
          <div className="w-full mt-2">
            <NewsletterInlineForm
              variant="dark"
              buttonLabel={t.subscribeButton}
            />
          </div>
        </div>
      </section>
    </>
  );
}
