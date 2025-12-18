// app/jyobatsu-search/components/SearchResults.tsx
"use client";

import Link from "next/link";
import type { JyobatsuSearchResultAdvancedReturns } from "@/actions/search";

interface SearchResultsProps {
  results: JyobatsuSearchResultAdvancedReturns;
  totalCount: number;
}

export default function SearchResults({
  results,
  totalCount,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="hero min-h-[300px]">
        <div className="hero-content text-center">
          <p className="text-lg text-neutral">検索結果がありません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="alert border-base-300 bg-base-200">
        <svg
          className="w-5 h-5 text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Search Results Count</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="font-medium text-secondary">
          検索結果: {totalCount.toLocaleString()} 件
        </span>
      </div>

      <div className="space-y-4">
        {results.map((record) => (
          <div
            key={record.ID}
            className="card bg-base-100 border border-base-300 hover:shadow-lg hover:border-accent transition-all duration-200"
          >
            <div className="card-body">
              {/* タイトル行 */}
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={`/book/${record.文献ID}`}
                  className="text-xl font-serif font-bold text-primary flex-1 link link-hover"
                >
                  {record.書名}
                </Link>
                <span
                  className={`badge badge-sm whitespace-nowrap ${
                    record.匹配状態 === "✓ 完整匹配"
                      ? "badge-success"
                      : record.匹配状態 === "⚠ 可能部分匹配"
                      ? "badge-warning"
                      : "badge-ghost"
                  }`}
                >
                  {record.匹配状態}
                </span>
              </div>

              {/* メタデータグリッド */}
              <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                <div className="flex gap-2">
                  <span className="font-medium text-secondary">文献ID:</span>
                  <span className="text-base-content">{record.文献ID}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-secondary">順序:</span>
                  <span className="text-base-content">
                    {record.同一ID内順序}
                  </span>
                </div>
                {record.編者 && (
                  <div className="flex gap-2">
                    <span className="font-medium text-secondary">編者:</span>
                    <span className="text-base-content">{record.編者}</span>
                  </div>
                )}
                {record.出版年西暦 && (
                  <div className="flex gap-2">
                    <span className="font-medium text-secondary">出版年:</span>
                    <span className="text-base-content">
                      {record.出版年西暦}
                      {record.出版年和暦 && ` (${record.出版年和暦})`}
                    </span>
                  </div>
                )}
                {record.序跋名称 && (
                  <div className="flex gap-2">
                    <span className="font-medium text-secondary">
                      序跋名称:
                    </span>
                    <span className="text-base-content">{record.序跋名称}</span>
                  </div>
                )}
                {record.出版社 && (
                  <div className="flex gap-2 col-span-2">
                    <span className="font-medium text-secondary">出版社:</span>
                    <span className="text-base-content">{record.出版社}</span>
                  </div>
                )}
                {record.所在表示 && (
                  <div className="flex gap-2">
                    <span className="font-medium text-secondary">所在:</span>
                    <span className="text-base-content">{record.所在表示}</span>
                  </div>
                )}
              </div>

              {/* 本文内容 */}
              <div className="divider my-2" />
              <div
                className="prose prose-sm max-w-none text-base-content leading-relaxed"
                dangerouslySetInnerHTML={{ __html: record.高亮本文 || "" }}
              />

              {/* 関連度スコア */}
              {record.relevance_score && record.relevance_score > 0 && (
                <div className="text-xs text-neutral mt-2">
                  関連度: {record.relevance_score.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
