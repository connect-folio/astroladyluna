"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  /** Visual variant: "light" = plum bg context, "dark" = cream bg context */
  variant?: "light" | "dark";
  buttonLabel?: string;
}

export default function NewsletterInlineForm({
  variant = "dark",
  buttonLabel = "Get My First Letter",
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Something went wrong");

      // Increment issue count in localStorage for future gate logic
      const current = parseInt(localStorage.getItem("ll_issue_count") ?? "0", 10);
      localStorage.setItem("ll_issue_count", String(current + 1));

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpgrade() {
    setUpgradeLoading(true);
    try {
      const res = await fetch("/api/checkout/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Stripe not configured — fail gracefully
        setUpgradeLoading(false);
      }
    } catch {
      setUpgradeLoading(false);
    }
  }

  const isLight = variant === "light";

  if (success) {
    return (
      <div className="w-full space-y-4">
        <p
          className={`font-body text-sm tracking-wide ${
            isLight ? "text-lavender" : "text-mauve"
          }`}
        >
          You&apos;re in. Your first letter is on its way.
        </p>
        <button
          onClick={handleUpgrade}
          disabled={upgradeLoading}
          className={`w-full py-3 px-6 font-body text-xs tracking-widest uppercase transition-colors disabled:opacity-50 ${
            isLight
              ? "bg-rose text-plum hover:bg-cream"
              : "bg-plum text-cream hover:bg-mauve"
          }`}
        >
          {upgradeLoading ? "..." : "Continue reading — $17/month →"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`w-full rounded-none border font-body text-sm ${
          isLight
            ? "bg-plum/30 border-mauve/40 text-cream placeholder:text-mauve focus:border-rose"
            : "bg-cream border-plum/20 text-plum placeholder:text-mauve/60 focus:border-plum"
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-6 font-body text-xs tracking-widest uppercase transition-colors disabled:opacity-50 ${
          isLight
            ? "bg-rose text-plum hover:bg-cream"
            : "bg-plum text-cream hover:bg-mauve"
        }`}
      >
        {loading ? "..." : buttonLabel}
      </button>
      {error && (
        <p className="font-body text-xs text-rose">{error}</p>
      )}
    </form>
  );
}
