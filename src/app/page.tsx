import type { Metadata } from "next";
import HeroGlow from "@/components/sections/HeroGlow";
import HeroEntrance from "@/components/sections/HeroEntrance";
import HomeContent from "@/components/sections/HomeContent";
import { personSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Lady Luna — Guía Astrológica",
  description:
    "Astrology readings, courses, and weekly cosmic guidance by Camila, Lady Luna. Book a personal session, join the course waitlist, or subscribe to The Lady Luna Letter.",
  openGraph: {
    images: [{ url: "/og?title=Lady+Luna&subtitle=Guía+Astrológica", width: 1200, height: 630 }],
  },
};

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

      <HomeContent />
    </>
  );
}
