type BlogItem = {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description: string;
  tags: string[];
};

type DevtoArticle = {
  title: string;
  url: string;
  description: string;
  published_at: string;
  tag_list: string[];
};

type HNHit = {
  title: string | null;
  story_title: string | null;
  url: string | null;
  story_url: string | null;
  created_at: string;
};

function normalizeDate(value: string) {
  try {
    return new Date(value).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function uniqByUrl(items: BlogItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

async function fetchDevto(tag: string, limit: number) {
  const response = await fetch(
    `https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&per_page=${limit}`,
    { next: { revalidate: 1800 } },
  );

  if (!response.ok) {
    throw new Error(`DEV.to request failed with status ${response.status}`);
  }

  const data = (await response.json()) as DevtoArticle[];

  return data.map((article) => ({
    title: article.title,
    url: article.url,
    source: "DEV Community",
    publishedAt: normalizeDate(article.published_at),
    description: article.description || "Latest developer article from DEV.",
    tags: article.tag_list ?? [],
  })) satisfies BlogItem[];
}

async function fetchHnAi(limit: number) {
  const response = await fetch(
    `https://hn.algolia.com/api/v1/search_by_date?query=ai&tags=story&hitsPerPage=${limit}`,
    { next: { revalidate: 1800 } },
  );

  if (!response.ok) {
    throw new Error(`HN Algolia request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { hits: HNHit[] };

  return data.hits
    .map((hit) => {
      const title = hit.title ?? hit.story_title;
      const url = hit.url ?? hit.story_url;

      if (!title || !url) {
        return null;
      }

      return {
        title,
        url,
        source: "Hacker News",
        publishedAt: normalizeDate(hit.created_at),
        description: "Trending AI-related story from the Hacker News ecosystem.",
        tags: ["ai", "hn"],
      } satisfies BlogItem;
    })
    .filter((item): item is BlogItem => item !== null);
}

export async function GET() {
  try {
    const [devAi, devTech, hnAi] = await Promise.all([
      fetchDevto("ai", 4),
      fetchDevto("webdev", 4),
      fetchHnAi(6),
    ]);

    const merged = uniqByUrl([...devAi, ...devTech, ...hnAi])
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      .slice(0, 6);

    return Response.json({ blogs: merged });
  } catch {
    return Response.json({ blogs: [] }, { status: 200 });
  }
}
