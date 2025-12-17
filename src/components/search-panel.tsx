"use client";

import { useState } from "react";

type SearchResult = {
  id: string;
  text: string;
  snippet: string;
  score: number;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body p-4">
            <div className="join join-vertical sm:join-horizontal w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="検索キーワードを入力..."
                className="input input-bordered join-item flex-1 focus:outline-offset-0"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary join-item"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    検索中...
                  </>
                ) : (
                  "検索"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {total > 0 && (
        <div className="alert border-base-300 bg-base-200 mb-6">
          <svg
            className="w-5 h-5 text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Search Results</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="font-medium text-secondary">{total} 件の結果</span>
        </div>
      )}

      <div className="space-y-4">
        {results.map((result) => (
          <article
            key={result.id}
            className="card bg-base-100 border border-base-300 hover:shadow-lg hover:border-accent transition-all duration-200"
          >
            <div className="card-body">
              <h2 className="card-title text-xl font-serif">
                <a
                  href={`/documents/${result.id}`}
                  className="link link-hover link-primary"
                >
                  {result.id}
                </a>
              </h2>
              <div
                className="text-base-content leading-relaxed line-clamp-3 search-snippet"
                dangerouslySetInnerHTML={{ __html: result.snippet }}
              />
            </div>
          </article>
        ))}
      </div>

      {results.length === 0 && !loading && query && (
        <div className="hero min-h-[300px]">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>No Results</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg text-neutral">検索結果が見つかりませんでした</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
