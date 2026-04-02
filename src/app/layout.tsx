import type { Metadata } from "next";
import { Raleway, Cormorant_Garamond } from "next/font/google";
import { cookies } from "next/headers";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://astroladyluna.com"),
  title: {
    default: "Lady Luna — Guía Astrológica",
    template: "%s | Lady Luna",
  },
  description:
    "Astrology readings, courses, and weekly cosmic guidance by Camila, Lady Luna. Book a personal session, join the course waitlist, or subscribe to The Lady Luna Letter.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://astroladyluna.com",
    siteName: "Lady Luna",
    images: [{ url: "/og?title=Lady+Luna&subtitle=Guía+Astrológica", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ladyluna1111",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultLang = cookieStore.get("ll_lang")?.value ?? "en";

  return (
    <html
      lang={defaultLang}
      className={`${raleway.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider defaultLang={defaultLang}>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
