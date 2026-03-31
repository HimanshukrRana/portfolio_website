"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

type BlogItem = {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description: string;
  tags: string[];
};

type FilterKey = "all" | "ai" | "webdev";

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recent";
  }
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const loadBlogs = async (mode: "initial" | "refresh") => {
    if (mode === "initial") {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const response = await fetch("/api/blogs", { cache: "no-store" });
      const data = (await response.json()) as { blogs?: BlogItem[] };
      setBlogs(data.blogs ?? []);
      setHasError(false);
      setLastUpdated(new Date().toISOString());
    } catch {
      setHasError(true);
      if (mode === "initial") {
        setBlogs([]);
      }
    } finally {
      if (mode === "initial") {
        setLoading(false);
      } else {
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    loadBlogs("initial");
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    if (activeFilter === "all") return true;
    return blog.tags.some((tag) => tag.toLowerCase() === activeFilter);
  });

  return (
    <section id="blogs" className="px-6 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Blogs"
            title="Tech and AI reads from public APIs"
            description="Fresh articles and stories aggregated from DEV Community and Hacker News AI feeds."
          />
        </Reveal>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex w-fit items-center gap-1 rounded-xl border border-border bg-card/65 p-1">
            {[
              { key: "all", label: "All" },
              { key: "ai", label: "AI" },
              { key: "webdev", label: "Web Dev" },
            ].map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key as FilterKey)}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  activeFilter === filter.key
                    ? "bg-[#8f00ff]/20 text-[#d6a6ff]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground">
              {lastUpdated
                ? `Updated ${formatDate(lastUpdated)}`
                : "Waiting for latest feed"}
            </p>
            <button
              type="button"
              onClick={() => loadBlogs("refresh")}
              disabled={refreshing}
              className="rounded-full border border-[#b84dff]/40 bg-[#8f00ff]/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#d6a6ff] transition hover:border-[#d6a6ff]/70"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`blog-skeleton-${index}`}
                  className="animate-pulse rounded-3xl border border-border bg-card/60 p-5"
                >
                  <div className="h-4 w-1/3 rounded bg-background/60" />
                  <div className="mt-4 h-6 w-full rounded bg-background/60" />
                  <div className="mt-2 h-6 w-5/6 rounded bg-background/60" />
                  <div className="mt-4 h-4 w-full rounded bg-background/60" />
                </div>
              ))
            : filteredBlogs.map((blog, index) => (
                <Reveal key={blog.url} delay={index * 0.04}>
                  <article className="group h-full rounded-3xl border border-border bg-card/65 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#b84dff]/45 hover:shadow-[0_0_30px_rgba(143,0,255,0.18)]">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#b84dff]">
                      {blog.source}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug">{blog.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                      {blog.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={`${blog.url}-${tag}`}
                          className="rounded-full border border-border bg-background/65 px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(blog.publishedAt)}
                      </span>
                      <a
                        href={blog.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#c266ff] transition group-hover:text-[#d6a6ff]"
                      >
                        Read <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
        </div>

        {!loading && !filteredBlogs.length ? (
          <p className="mt-6 text-sm text-muted-foreground">
            {hasError
              ? "Could not load blogs right now. Please try refresh."
              : "No blogs found for this filter right now."}
          </p>
        ) : null}
      </div>
    </section>
  );
}
