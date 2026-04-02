import Link from "next/link";
import { Mail } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-plum/10 py-6 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left">
        {/* Copyright */}
        <p className="font-body text-xs text-mauve">
          © 2026 Lady Luna — Guía Astrológica
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          <Link
            href="https://instagram.com/ladyluna.1111"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lady Luna on Instagram"
            className="text-mauve hover:text-plum transition-colors"
          >
            <InstagramIcon size={16} />
          </Link>
          <Link
            href="mailto:hola@astroladyluna.com"
            aria-label="Email Lady Luna"
            className="text-mauve hover:text-plum transition-colors"
          >
            <Mail size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
