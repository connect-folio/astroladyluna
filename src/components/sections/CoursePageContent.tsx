"use client";

import FadeUp from "@/components/ui/FadeUp";
import CountdownTimer from "@/components/sections/CountdownTimer";
import CoursePresignupForm from "@/components/sections/CoursePresignupForm";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const MODULE_NUMBERS = ["01", "02", "03", "04"] as const;

export default function CoursePageContent() {
  const { lang } = useLanguage();
  const t = translations[lang].course;

  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className="bg-plum min-h-screen flex items-center justify-center px-6 text-center">
        <div className="flex flex-col items-center gap-6 max-w-3xl">
          <p className="font-body text-xs text-rose tracking-[0.4em] uppercase">
            {t.launchLabel}
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-cream leading-tight">
            {t.heading}
          </h1>
          <p className="font-body text-base text-lavender max-w-xl leading-relaxed">
            {t.subheading}
          </p>
        </div>
      </section>

      {/* ── Section 2: Countdown Timer ── */}
      <section className="bg-plum pb-20 px-6">
        <CountdownTimer />
      </section>

      {/* ── Section 3: Curriculum ── */}
      <section className="bg-cream py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs tracking-widest text-mauve uppercase mb-4">
            {t.curriculumLabel}
          </p>
          <h2 className="font-display text-4xl text-plum mb-16">
            {t.curriculumHeading}
          </h2>

          <div className="flex flex-col divide-y divide-plum/10">
            {t.modules.map((item, i) => (
              <FadeUp key={MODULE_NUMBERS[i]} delay={i * 0.05}>
                <div className="py-8 grid grid-cols-[3rem_1fr] gap-6 items-start">
                  <span className="font-body text-xs text-mauve tracking-widest">
                    {MODULE_NUMBERS[i]}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-plum mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-plum/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <p className="font-body text-sm text-mauve mt-12 pt-8 border-t border-plum/10">
            {t.modulesMeta}
          </p>
        </div>
      </section>

      {/* ── Section 4: Pre-signup form ── */}
      <section className="bg-plum py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl text-cream leading-snug">
              {t.presignupHeading}
            </h2>
            <p className="font-body text-sm text-lavender mt-4">
              {t.presignupPricing}
            </p>
          </div>
          <CoursePresignupForm />
        </div>
      </section>
    </>
  );
}
