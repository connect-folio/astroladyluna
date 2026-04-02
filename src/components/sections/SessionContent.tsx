"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const CALENDLY_URLS = [
  {
    default: "https://calendly.com/astroladyluna-info/quick-c",
    firstTimer: null,
    isFree: true,
  },
  {
    default: "https://calendly.com/astroladyluna-info/solar-return",
    firstTimer: "https://calendly.com/astroladyluna-info/solar-return-88",
    isFree: false,
  },
  {
    default: "https://calendly.com/astroladyluna-info/30min",
    firstTimer: "https://calendly.com/astroladyluna-info/birth-chart-88",
    isFree: false,
  },
];

export default function SessionContent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isFirstTimer, setIsFirstTimer] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang].session;

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
        }),
      });
      const data = await res.json();
      setIsFirstTimer(data.isFirstTimer ?? false);
      setEmailSubmitted(true);
    } catch {
      setEmailSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectSession(index: number) {
    const entry = CALENDLY_URLS[index];
    const url =
      !entry.isFree && isFirstTimer && entry.firstTimer
        ? entry.firstTimer
        : entry.default;
    setSelectedUrl(url);
    setTimeout(() => {
      scrollTargetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  return (
    <div className="bg-cream">
      {/* ── First-timer gate ── */}
      <div className="py-8 px-6 md:px-16">
        <div className="max-w-lg">
          {!emailSubmitted ? (
            <div className="border border-rose/50 p-6">
              <p className="font-body text-xs tracking-widest text-mauve uppercase mb-3">
                {t.firstTime}
              </p>
              <p className="font-body text-sm text-plum/70 mb-6 leading-relaxed">
                {t.firstTimeBody}
              </p>
              <form onSubmit={handleGateSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder={t.firstNamePlaceholder}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="rounded-none border-plum/20 font-body text-sm"
                    required
                  />
                  <Input
                    placeholder={t.lastNamePlaceholder}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-none border-plum/20 font-body text-sm"
                    required
                  />
                </div>
                <Input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-none border-plum/20 font-body text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-plum text-cream font-body text-xs tracking-widest uppercase py-3 px-6 hover:bg-mauve transition-colors disabled:opacity-50"
                >
                  {loading ? "..." : t.unlockButton}
                </button>
              </form>
            </div>
          ) : (
            <p className="font-body text-sm tracking-wide">
              {isFirstTimer ? (
                <span className="text-rose">{t.rateUnlocked}</span>
              ) : (
                <span className="text-mauve">{t.welcomeBack}</span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* ── Session cards ── */}
      <div className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.sessions.map((session, i) => (
            <motion.div
              key={session.title}
              className="border border-plum/20 p-8 flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            >
              <span className="font-body text-xs tracking-widest text-rose uppercase">
                {CALENDLY_URLS[i].isFree
                  ? lang === "es" ? "GRATIS" : "FREE"
                  : isFirstTimer
                  ? "$88"
                  : "$111"}
              </span>
              <h3 className="font-display text-2xl text-plum">{session.title}</h3>
              <p className="font-body text-xs text-mauve tracking-wide">
                {session.duration}
              </p>
              <p className="font-body text-sm text-plum/70 leading-relaxed flex-1">
                {session.description}
              </p>
              <button
                onClick={() => handleSelectSession(i)}
                className="font-body text-xs tracking-widest uppercase text-plum border border-plum/30 py-3 px-6 hover:bg-plum hover:text-cream transition-colors mt-auto"
              >
                {CALENDLY_URLS[i].isFree ? session.bookFree : session.bookSession}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Calendly embed ── */}
      {selectedUrl && (
        <div ref={scrollTargetRef} className="px-6 md:px-16 pb-16">
          <iframe
            src={selectedUrl}
            width="100%"
            className="min-h-[600px] md:h-[700px]"
            frameBorder="0"
            title={t.iframeTitle}
          />
        </div>
      )}
    </div>
  );
}
