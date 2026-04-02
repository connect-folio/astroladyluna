"use client";

import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
}

interface Props {
  posts: PostMeta[];
}

export default function BlogList({ posts }: Props) {
  const { lang } = useLanguage();
  const t = translations[lang].blog;

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-cream pt-28 pb-12 px-6 md:px-16">
        <div className="max-w-4xl">
          <h1 className="font-display text-6xl text-plum leading-tight">
            {t.heading}
          </h1>
          <p className="font-body text-sm text-mauve mt-4">{t.subheading}</p>
        </div>
      </section>

      {/* ── Post grid ── */}
      <section className="bg-cream pb-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <p className="font-body text-sm text-mauve">{t.noPosts}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, i) => (
                <FadeUp key={post.slug} delay={i * 0.08}>
                  <article className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-lavender/20 text-mauve font-body text-xs uppercase tracking-wide px-2 py-1">
                        {post.category}
                      </span>
                      <span className="font-body text-xs text-mauve/60">
                        {post.date}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="font-display text-2xl text-plum hover:text-mauve transition-colors leading-snug">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="font-body text-sm text-plum/70 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-body text-xs text-mauve tracking-widest hover:text-plum transition-colors uppercase mt-1"
                    >
                      {t.readMore}
                    </Link>
                  </article>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
