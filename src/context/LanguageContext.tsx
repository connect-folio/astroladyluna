"use client";

import { useSyncExternalStore, useCallback } from "react";

export type Lang = "en" | "es";

// ─── Module-level store ──────────────────────────────────────────────────────
// A single module instance is guaranteed by the bundler, so every component
// that calls useLanguage() shares the same _lang variable and listener set —
// no React context boundary issues.

let _lang: Lang = "en";

// Initialize synchronously from localStorage on first module load (client only).
// Runs before any component renders, so there is no flash of wrong language.
if (typeof window !== "undefined") {
  try {
    const stored = localStorage.getItem("ll_lang");
    if (stored === "es") _lang = "es";
  } catch {}
}

const _listeners = new Set<() => void>();

function getLang(): Lang {
  return _lang;
}

function setLang(next: Lang): void {
  if (_lang === next) return;
  _lang = next;
  // Update <html lang="..."> in place so screen readers pick it up immediately
  if (typeof document !== "undefined") {
    document.documentElement.lang = next;
  }
  _listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  _listeners.add(listener);
  return () => _listeners.delete(listener);
}

// Server snapshot always returns "en" — the server has no access to localStorage.
// After hydration, useSyncExternalStore will synchronously reconcile with the
// real client value before the browser paints.
function getServerSnapshot(): Lang {
  return "en";
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useLanguage() {
  const lang = useSyncExternalStore(subscribe, getLang, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Lang = _lang === "en" ? "es" : "en";
    setLang(next);
    try {
      localStorage.setItem("ll_lang", next);
    } catch {}
    document.cookie = `ll_lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  return { lang, toggle };
}
