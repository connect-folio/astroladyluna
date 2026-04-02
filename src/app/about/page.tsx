import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Lady Luna — Camila",
  description:
    "Meet Camila, the astrological guide behind Lady Luna. Sessions, courses, and weekly letters on astrology and self-discovery.",
  openGraph: {
    images: [{ url: "/og?title=About+Lady+Luna&subtitle=Guía+Astrológica", width: 1200, height: 630 }],
  },
};

const stripPhotos = [
  { src: "/images/lady-luna-book.jpeg", alt: "Lady Luna with a book" },
  { src: "/images/lady-luna-orange.jpeg", alt: "Lady Luna in studio" },
  { src: "/images/lady-luna-yoga-2.jpeg", alt: "Lady Luna in meditation" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className="bg-cream pt-24 pb-0">
        {/* Full-width portrait */}
        <div className="relative w-full h-[600px] overflow-hidden">
          <Image
            src="/images/lady-luna-book-2.jpeg"
            alt="Lady Luna — Camila"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          {/* Gradient fade to cream at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream to-transparent" />
        </div>

        {/* Name below photo */}
        <div className="text-center px-6 pb-12 -mt-4 relative z-10">
          <h1 className="font-display text-7xl text-plum">Lady Luna</h1>
          <p className="font-body text-xs tracking-widest text-mauve mt-2">
            Guía Astrológica · Camila
          </p>
        </div>
      </section>

      {/* ── Section 2: Bio ── */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Two-photo grid */}
          <div className="grid grid-cols-2 gap-4 mb-16">
            <div className="relative h-72 overflow-hidden">
              <Image
                src="/images/lady-luna-yoga.jpeg"
                alt="Lady Luna in nature"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="relative h-72 overflow-hidden">
              <Image
                src="/images/lady-luna-yoga-2.jpeg"
                alt="Lady Luna meditating"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Bio text */}
          <div className="flex flex-col gap-6 font-body text-plum/80 leading-relaxed text-base">
            <p>
              I&apos;m Camila. I go by Lady Luna — not as a persona, but as a
              reflection of what I do. The moon is a teacher. So is your natal
              chart.
            </p>
            <p>
              I started studying astrology because I needed a map. I was
              navigating big decisions — the kind that don&apos;t come with
              instructions — and I found that the birth chart asked better
              questions than anything else I&apos;d tried.
            </p>
            <p>
              Today I work with people one-on-one, through a self-paced course
              coming in June, and through a weekly letter that lands in your
              inbox every Sunday. All of it is oriented toward the same thing:
              helping you understand yourself better.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center mt-10 gap-6">
            <Link
              href="/session"
              className="bg-plum text-cream font-body text-xs tracking-widest uppercase py-3 px-8 hover:bg-mauve transition-colors"
            >
              Book a Session
            </Link>
            <Link
              href="/newsletter"
              className="text-mauve font-body text-sm hover:text-plum transition-colors"
            >
              Get the weekly letter
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 3: Photo strip ── */}
      <section className="bg-plum py-0 overflow-hidden">
        <div className="flex overflow-x-auto gap-0">
          {stripPhotos.map((photo) => (
            <div
              key={photo.src}
              className="relative flex-none w-[80vw] md:w-[33.333vw] h-80 overflow-hidden"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 80vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
