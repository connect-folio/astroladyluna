"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface Session {
  label: string;
  title: string;
  duration: string;
  description: string;
  calendlyUrl: string;
  calendlyFirstTimer?: string;
  isFree?: boolean;
}

const SESSIONS: Session[] = [
  {
    label: "FREE",
    title: "Quick Connect",
    duration: "20 minutes",
    description:
      "A short, focused reading to answer one burning question. Perfect if you're new to astrology or just curious.",
    calendlyUrl: "https://calendly.com/astroladyluna-info/quick-c",
    isFree: true,
  },
  {
    label: "$111",
    title: "Solar Return",
    duration: "80 minutes",
    description:
      "A deep reading anchored in your solar return chart — what the year ahead holds for you, and how to navigate it with intention.",
    calendlyUrl: "https://calendly.com/astroladyluna-info/solar-return",
    calendlyFirstTimer:
      "https://calendly.com/astroladyluna-info/solar-return-88",
  },
  {
    label: "$111",
    title: "Birth Chart Reading",
    duration: "80 minutes",
    description:
      "A comprehensive reading of your natal chart. Understand your sun, moon, rising, and the patterns that have shaped your life.",
    calendlyUrl: "https://calendly.com/astroladyluna-info/30min",
    calendlyFirstTimer:
      "https://calendly.com/astroladyluna-info/birth-chart-88",
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

  function handleSelectSession(session: Session) {
    const url =
      !session.isFree && isFirstTimer && session.calendlyFirstTimer
        ? session.calendlyFirstTimer
        : session.calendlyUrl;
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
                First Time?
              </p>
              <p className="font-body text-sm text-plum/70 mb-6 leading-relaxed">
                Enter your name and email to unlock your first-session rate.
              </p>
              <form onSubmit={handleGateSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="rounded-none border-plum/20 font-body text-sm"
                    required
                  />
                  <Input
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-none border-plum/20 font-body text-sm"
                    required
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
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
                  {loading ? "..." : "Unlock Discount"}
                </button>
              </form>
            </div>
          ) : (
            <p className="font-body text-sm tracking-wide">
              {isFirstTimer ? (
                <span className="text-rose">
                  First-session rate unlocked. Your price: $88.
                </span>
              ) : (
                <span className="text-mauve">
                  Welcome back. Your sessions are below.
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* ── Session cards ── */}
      <div className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {SESSIONS.map((session, i) => (
            <motion.div
              key={session.title}
              className="border border-plum/20 p-8 flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            >
              <span className="font-body text-xs tracking-widest text-rose uppercase">
                {session.isFree
                  ? "FREE"
                  : isFirstTimer
                  ? "$88"
                  : session.label}
              </span>
              <h3 className="font-display text-2xl text-plum">{session.title}</h3>
              <p className="font-body text-xs text-mauve tracking-wide">
                {session.duration}
              </p>
              <p className="font-body text-sm text-plum/70 leading-relaxed flex-1">
                {session.description}
              </p>
              <button
                onClick={() => handleSelectSession(session)}
                className="font-body text-xs tracking-widest uppercase text-plum border border-plum/30 py-3 px-6 hover:bg-plum hover:text-cream transition-colors mt-auto"
              >
                {session.isFree ? "Book Free →" : "Book Session →"}
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
            title="Book a session with Lady Luna"
          />
        </div>
      )}
    </div>
  );
}
