import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import BlogList from "@/components/sections/BlogList";

export const metadata: Metadata = {
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
    .filter((f) => f.endsWith(".mdx") && !f.includes(".es."))
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
  return <BlogList posts={posts} />;
}
