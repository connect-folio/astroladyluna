import CoursePageContent from "@/components/sections/CoursePageContent";
import { courseSchema } from "@/lib/jsonld";

export const metadata = {
  title: "Astrology Course — Coming June 2026",
  description:
    "A self-paced video course on tarot and astrology fundamentals by Lady Luna. Launching June 1, 2026. Pre-sign before May 15 for a free session.",
  openGraph: {
    images: [{ url: "/og?title=Astrology+Course&subtitle=Launching+June+2026", width: 1200, height: 630 }],
  },
};

export default function CoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema()) }}
      />
      <CoursePageContent />
    </>
  );
}
