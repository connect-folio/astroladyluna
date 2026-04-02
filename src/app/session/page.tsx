import SessionHero from "@/components/sections/SessionHero";
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
      <SessionHero />
      <SessionContent />
    </>
  );
}
