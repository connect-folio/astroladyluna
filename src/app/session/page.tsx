import SessionContent from "@/components/sections/SessionContent";
import { serviceSchema } from "@/lib/jsonld";

export const metadata = {
  title: "Book a Session",
  description:
    "Book a personal astrology reading with Lady Luna. Quick Connect (free), Solar Return ($111), or Birth Chart Reading ($111). First-timers get $88.",
  openGraph: {
    images: [{ url: "/og?title=Book+a+Session&subtitle=Personal+Astrology+Readings", width: 1200, height: 630 }],
  },
};

export default function SessionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema()) }}
      />
      {/* ── Hero ── */}
      <section className="bg-cream pt-28 pb-12 px-6 md:px-16">
        <div className="max-w-3xl">
          <p className="font-body text-xs text-mauve tracking-widest uppercase mb-6">
            Lady Luna / Sessions
          </p>
          <h1 className="font-display text-6xl text-plum leading-tight">
            Read Your Stars
          </h1>
          <p className="font-body text-base text-mauve mt-4 leading-relaxed">
            Choose the session that feels right for you.
          </p>
        </div>
      </section>

      <SessionContent />
    </>
  );
}
