import type { Metadata } from "next";
import Link from "next/link";
import HeroGlow from "@/components/sections/HeroGlow";
import HeroEntrance from "@/components/sections/HeroEntrance";
import NewsletterInlineForm from "@/components/sections/NewsletterInlineForm";
import FadeUp from "@/components/ui/FadeUp";
import { personSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Lady Luna — Guía Astrológica",
  description:
    "Astrology readings, courses, and weekly cosmic guidance by Camila, Lady Luna. Book a personal session, join the course waitlist, or subscribe to The Lady Luna Letter.",
  openGraph: {
    images: [{ url: "/og?title=Lady+Luna&subtitle=Guía+Astrológica", width: 1200, height: 630 }],
  },
};

const products = [
  {
    tag: "PERSONAL READING",
    title: "Book a Session",
    body: "A one-on-one reading tailored to your chart. Three formats available — from a free quick connect to a deep 80-minute exploration.",
    price: "From free · $111",
    cta: "Explore Sessions →",
    href: "/session",
  },
  {
    tag: "SELF-STUDY",
    title: "Learn to Read the Stars",
    body: "A self-paced video course on tarot and astrology fundamentals. Launching June 1, 2026.",
    price: "From $200 · Early access available",
    cta: "Join the Waitlist →",
    href: "/course",
  },
  {
    tag: "WEEKLY LETTERS",
    title: "The Lady Luna Letter",
    body: "Weekly cosmic guidance delivered to your inbox. Four issues free, then $17/month.",
    price: "Free to start · $17/mo",
    cta: "Subscribe Free →",
    href: "/newsletter",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />

      {/* ── Section 1: Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center bg-plum px-6 text-center">
        <HeroGlow />
        <HeroEntrance />
      </section>

      {/* ── Section 2: Products ── */}
      <section className="bg-cream py-24 px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.4em] text-mauve uppercase mb-12 text-center">
          WHAT I OFFER
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <FadeUp key={p.href} delay={i * 0.1}>
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
                  href={p.href}
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
              &ldquo;The stars don&apos;t control you. They help you understand
              yourself.&rdquo;
            </blockquote>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex flex-col gap-4">
              <p className="font-body text-sm text-lavender leading-relaxed">
                I&apos;m Camila — Lady Luna. I&apos;ve spent years studying the
                language of the cosmos so I can help you decode yours. Whether
                you&apos;re seeking clarity, direction, or simply want to
                understand yourself more deeply, the chart is the map.
              </p>
              <Link
                href="https://instagram.com/ladyluna.1111"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs tracking-widest text-mauve hover:text-lavender transition-colors uppercase"
              >
                Follow along @ladyluna.1111
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Section 4: Newsletter inline CTA ── */}
      <section className="bg-rose/20 py-16 px-6">
        <div className="max-w-md mx-auto flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-4xl text-plum">
            Start with 4 free issues
          </h2>
          <p className="font-body text-sm text-mauve">
            No credit card. Just your email.
          </p>
          <div className="w-full mt-2">
            <NewsletterInlineForm
              variant="dark"
              buttonLabel="Subscribe Free"
            />
          </div>
        </div>
      </section>
    </>
  );
}
