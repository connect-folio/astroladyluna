import NewsletterPageContent from "@/components/sections/NewsletterPageContent";

export const metadata = {
  title: "The Lady Luna Letter",
  description:
    "Weekly cosmic guidance by Lady Luna. 4 issues free, then $17/month. No credit card required to start.",
  openGraph: {
    images: [{ url: "/og?title=The+Lady+Luna+Letter&subtitle=Weekly+Cosmic+Guidance", width: 1200, height: 630 }],
  },
};

export default function NewsletterPage() {
  return <NewsletterPageContent />;
}
