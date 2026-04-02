"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function CoursePresignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    early_bird: boolean;
  } | null>(null);
  const [error, setError] = useState("");
  const { lang } = useLanguage();
  const t = translations[lang].course;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/course/presignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <p className="font-body text-sm text-lavender leading-relaxed max-w-md">
        {result.early_bird ? t.confirmEarlyBird : t.confirmNormal}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <Input
        type="text"
        placeholder={t.namePlaceholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="rounded-none bg-cream text-plum border-mauve/30 placeholder:text-plum/50 font-body text-sm"
      />
      <Input
        type="email"
        placeholder={t.emailPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-none bg-cream text-plum border-mauve/30 placeholder:text-plum/50 font-body text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-rose text-plum font-body text-xs tracking-widest uppercase py-3 px-8 hover:bg-cream transition-colors disabled:opacity-50"
      >
        {loading ? "..." : t.reserveButton}
      </button>
      {error && <p className="font-body text-xs text-rose/80">{error}</p>}
    </form>
  );
}
