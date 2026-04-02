import Link from "next/link";
import NewsletterInlineForm from "@/components/sections/NewsletterInlineForm";
import FadeUp from "@/components/ui/FadeUp";

export const metadata = {
  title: "The Lady Luna Letter",
  description:
    "Weekly cosmic guidance by Lady Luna. 4 issues free, then $17/month. No credit card required to start.",
  openGraph: {
    images: [{ url: "/og?title=The+Lady+Luna+Letter&subtitle=Weekly+Cosmic+Guidance", width: 1200, height: 630 }],
  },
};

const teasers = [
  "◌ New Moon in Taurus: What to plant this cycle",
  "◌ Mercury Retrograde survival guide",
  "◌ Your rising sign and why it matters more than you think",
  "◌ The astrology of big decisions",
];

export default function NewsletterPage() {
  return (
    <>
      {/* ── Split hero ── */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left — plum */}
        <div className="bg-plum flex items-center justify-center p-12 md:p-16 min-h-[50vh]">
          <FadeUp delay={0} className="max-w-sm w-full flex flex-col gap-6">
            <p className="font-body text-xs tracking-widest text-rose uppercase">
              Weekly Letters
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-cream leading-tight">
              The Lady Luna Letter
            </h1>
            <p className="font-body text-base text-lavender leading-relaxed">
              Every week, a letter on what the cosmos are saying — and what it
              means for your life. Practical, grounded, and written just for
              you.
            </p>
            <div className="flex flex-col gap-0 border-t border-mauve/30 pt-6 mt-2">
              {teasers.map((teaser) => (
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
              Start Reading Free
            </p>
            <h2 className="font-display text-4xl text-plum leading-tight">
              4 issues, no card required.
            </h2>
            <p className="font-body text-sm text-mauve leading-relaxed">
              After your 4th issue, you&apos;ll be invited to continue at
              $17/month. Cancel anytime.
            </p>
            <NewsletterInlineForm
              variant="dark"
              buttonLabel="Get My First Letter"
            />
          </FadeUp>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section className="bg-cream border-t border-plum/10 py-12 px-6 text-center">
        <p className="font-display text-2xl text-plum italic mb-4">
          Join readers discovering their charts every week.
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
