"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function CoursePresignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    early_bird: boolean;
  } | null>(null);
  const [error, setError] = useState("");

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
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <p className="font-body text-sm text-lavender leading-relaxed max-w-md">
        {result.early_bird
          ? "You're in. Since you signed up before May 15, you'll receive a free 20-minute Quick Connect session with Lady Luna. Check your email."
          : "You're on the list. We'll email you when the course launches June 1."}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="rounded-none bg-cream text-plum border-mauve/30 placeholder:text-plum/50 font-body text-sm"
      />
      <Input
        type="email"
        placeholder="Your email"
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
        {loading ? "..." : "Reserve My Spot"}
      </button>
      {error && <p className="font-body text-xs text-rose/80">{error}</p>}
    </form>
  );
}
