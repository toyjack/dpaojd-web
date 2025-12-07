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
        <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-xl shadow-sm border border-amber-200 p-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索キーワードを入力..."
            className="flex-1 px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
          >
            {loading ? "検索中..." : "検索"}
          </button>
        </div>
      </form>

      {total > 0 && (
        <div className="mb-6 flex items-center gap-2 text-amber-800">
          <svg
            className="w-5 h-5"
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
          <p className="font-medium">{total} 件の結果</p>
        </div>
      )}

      <div className="space-y-4">
        {results.map((result) => (
          <article
            key={result.id}
            className="bg-white border border-amber-100 rounded-xl p-6 hover:shadow-lg hover:border-amber-300 transition-all duration-200"
          >
            <h2 className="text-xl font-serif font-semibold mb-3">
              <a
                href={`/documents/${result.id}`}
                className="text-amber-900 hover:text-amber-700 hover:underline decoration-2 underline-offset-4"
              >
                {result.id}
              </a>
            </h2>
            <div
              className="text-gray-700 leading-relaxed line-clamp-3 search-snippet"
              dangerouslySetInnerHTML={{ __html: result.snippet }}
            />
          </article>
        ))}
      </div>

      {results.length === 0 && !loading && query && (
        <div className="text-center py-12 text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-amber-300"
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
          <p className="text-lg">検索結果が見つかりませんでした</p>
        </div>
      )}
    </div>
  );
}
