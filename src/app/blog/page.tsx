import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";

export const metadata = {
  title: "Cosmic Notes",
  description:
    "Astrology insights, moon phases, tarot guidance, and self-discovery by Lady Luna.",
  openGraph: {
    images: [{ url: "/og?title=Cosmic+Notes&subtitle=Astrology+%26+Tarot+by+Lady+Luna", width: 1200, height: 630 }],
  },
};

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
}

function getPosts(): PostMeta[] {
  const contentDir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(".mdx", ""),
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-cream pt-28 pb-12 px-6 md:px-16">
        <div className="max-w-4xl">
          <h1 className="font-display text-6xl text-plum leading-tight">
            Cosmic Notes
          </h1>
          <p className="font-body text-sm text-mauve mt-4">
            Astrology, tarot, and the art of knowing yourself.
          </p>
        </div>
      </section>

      {/* ── Post grid ── */}
      <section className="bg-cream pb-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <p className="font-body text-sm text-mauve">No posts yet.</p>
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
                    Read →
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
