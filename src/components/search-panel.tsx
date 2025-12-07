'use client';

import { useState } from 'react';

type SearchResult = {
  id: string;
  text: string;
  snippet: string;
  score: number;
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
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
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">辞書序跋データベース（仮）</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索キーワードを入力..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '検索中...' : '検索'}
          </button>
        </div>
      </form>
      
      {total > 0 && (
        <p className="text-gray-600 mb-4">{total} 件の結果</p>
      )}
      
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id} className="border rounded-lg p-4 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              <a href={`/documents/${result.id}`} className="text-blue-600 hover:underline">
                {result.id}
              </a>
            </h2>
            <div 
              className="text-gray-700 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: result.snippet }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}