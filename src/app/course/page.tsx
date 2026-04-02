import CountdownTimer from "@/components/sections/CountdownTimer";
import CoursePresignupForm from "@/components/sections/CoursePresignupForm";
import FadeUp from "@/components/ui/FadeUp";
import { courseSchema } from "@/lib/jsonld";

export const metadata = {
  title: "Astrology Course — Coming June 2026",
  description:
    "A self-paced video course on tarot and astrology fundamentals by Lady Luna. Launching June 1, 2026. Pre-sign before May 15 for a free session.",
  openGraph: {
    images: [{ url: "/og?title=Astrology+Course&subtitle=Launching+June+2026", width: 1200, height: 630 }],
  },
};

const curriculum = [
  {
    number: "01",
    title: "The Language of the Sky",
    description:
      "Learn to read planetary positions, signs, and houses as a coherent system.",
  },
  {
    number: "02",
    title: "Your Natal Chart",
    description:
      "Decode your birth chart — the map of who you are and what you're here to do.",
  },
  {
    number: "03",
    title: "Tarot as a Mirror",
    description:
      "Use tarot not as fortune-telling but as a tool for self-reflection and decision-making.",
  },
  {
    number: "04",
    title: "Living by the Cycles",
    description:
      "Moon phases, retrogrades, and transits — how to align your life with cosmic rhythms.",
  },
];

export default function CoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema()) }}
      />
      {/* ── Section 1: Hero ── */}
      <section className="bg-plum min-h-screen flex items-center justify-center px-6 text-center">
        <div className="flex flex-col items-center gap-6 max-w-3xl">
          <p className="font-body text-xs text-rose tracking-[0.4em] uppercase">
            Coming June 1, 2026
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-cream leading-tight">
            Learn to Read the Stars
          </h1>
          <p className="font-body text-base text-lavender max-w-xl leading-relaxed">
            A self-paced video course in tarot and astrological self-discovery.
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
            The Curriculum
          </p>
          <h2 className="font-display text-4xl text-plum mb-16">
            Four modules. One transformation.
          </h2>

          <div className="flex flex-col divide-y divide-plum/10">
            {curriculum.map((item, i) => (
              <FadeUp key={item.number} delay={i * 0.05}>
                <div className="py-8 grid grid-cols-[3rem_1fr] gap-6 items-start">
                  <span className="font-body text-xs text-mauve tracking-widest">
                    {item.number}
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
            4–5 video modules · 90–120 minutes total · Self-paced · Lifetime
            access
          </p>
        </div>
      </section>

      {/* ── Section 4: Pre-signup form ── */}
      <section className="bg-plum py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl text-cream leading-snug">
              Pre-sign before May 15 and get a free 20-minute session with Lady
              Luna.
            </h2>
            <p className="font-body text-sm text-lavender mt-4">
              Course pricing: Early access $200 · Regular $250–300
            </p>
          </div>
          <CoursePresignupForm />
        </div>
      </section>
    </>
  );
}
