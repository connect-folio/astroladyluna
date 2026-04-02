"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/session", label: "Session" },
  { href: "/course", label: "Course" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cream" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-sm tracking-[0.3em] uppercase text-current"
        >
          LADY ◌ LUNA
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-body text-xs tracking-widest uppercase text-current hover:text-mauve transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="text-current p-1 bg-transparent border-0"
            >
              <Menu size={20} strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent side="right" className="bg-cream border-l border-plum/10 w-64">
              <nav className="flex flex-col gap-8 mt-16 px-6">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="font-body text-sm tracking-widest uppercase text-plum hover:text-mauve transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
