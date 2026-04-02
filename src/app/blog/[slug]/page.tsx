import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { articleSchema } from "@/lib/jsonld";

interface Frontmatter {
  title: string;
  date: string;
  excerpt: string;
  category: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

function getPostSource(slug: string): string | null {
  const filePath = path.join(
    process.cwd(),
    "src/content/blog",
    `${slug}.mdx`
  );
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(".mdx", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const source = getPostSource(slug);
  if (!source) return {};
  const { frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  });
  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent(frontmatter.title)}&subtitle=${encodeURIComponent(frontmatter.excerpt ?? "")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const source = getPostSource(slug);
  if (!source) notFound();

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  const jsonLd = articleSchema({
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Post hero ── */}
      <section className="bg-cream pt-28 pb-8 px-6 md:px-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-lavender/20 text-mauve font-body text-xs uppercase tracking-wide px-2 py-1">
              {frontmatter.category}
            </span>
            <span className="font-body text-xs text-mauve/60">
              {frontmatter.date}
            </span>
          </div>
          <h1 className="font-display text-5xl text-plum leading-tight">
            {frontmatter.title}
          </h1>
        </div>
      </section>

      {/* ── MDX content ── */}
      <section className="bg-cream pb-24 px-6 md:px-16">
        <div className="max-w-2xl mx-auto prose-custom font-body text-plum/80 leading-relaxed space-y-6 [&_p]:text-plum/80 [&_p]:leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-plum [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-plum [&_strong]:text-plum [&_a]:text-mauve [&_a]:underline [&_a]:underline-offset-2">
          {content}
        </div>

        {/* ── Footer ── */}
        <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-plum/10 flex items-center justify-between">
          <p className="font-body text-xs text-mauve">
            Written by Lady Luna
          </p>
          <Link
            href="/session"
            className="font-body text-xs tracking-widest uppercase text-plum border border-plum/30 px-5 py-2 hover:bg-plum hover:text-cream transition-colors"
          >
            Book a Session →
          </Link>
        </div>
      </section>
    </>
  );
}
