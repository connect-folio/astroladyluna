export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lady Luna",
    alternateName: "Camila",
    url: "https://astroladyluna.com",
    sameAs: ["https://instagram.com/ladyluna.1111"],
    jobTitle: "Astrological Guide",
    description:
      "Astrologer and tarot reader offering personal sessions, courses, and weekly guidance.",
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Astrology Reading — Lady Luna",
    provider: { "@type": "Person", name: "Lady Luna" },
    offers: [
      {
        "@type": "Offer",
        name: "Quick Connect",
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Solar Return",
        price: "111",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Birth Chart Reading",
        price: "111",
        priceCurrency: "USD",
      },
    ],
  };
}

export function courseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Learn to Read the Stars",
    description:
      "A self-paced video course on tarot and astrology fundamentals.",
    provider: { "@type": "Person", name: "Lady Luna" },
    offers: { "@type": "Offer", price: "200", priceCurrency: "USD" },
  };
}

export function articleSchema(post: {
  title: string;
  date: string;
  excerpt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: "Lady Luna" },
    publisher: { "@type": "Organization", name: "Lady Luna" },
    description: post.excerpt,
  };
}
