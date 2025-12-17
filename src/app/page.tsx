"use client";

import { useEffect, useState } from "react";
import { getFilterOptions, searchJyobatsu } from "@/actions/search";
import Pagination from "@/components/pagination";
import SearchForm from "@/components/search-form";
import SearchResults from "@/components/search-results";
import type {
  FilterOptions,
  JyobatsuSearchParams,
  JyobatsuSearchResultAdvanced,
  SearchFormData,
} from "@/lib/supabase/type";

export default function JyobatsuSearchPage() {
  const [results, setResults] = useState<JyobatsuSearchResultAdvanced[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSearchParams, setLastSearchParams] =
    useState<SearchFormData | null>(null);

  const PAGE_SIZE = 50;

  // フィルターオプションを読み込み
  useEffect(() => {
    async function loadFilterOptions() {
      const { data, error } = await getFilterOptions();
      if (!error && data) {
        setFilterOptions(data);
      }
    }
    loadFilterOptions();
  }, []);

  const handleSearch = async (formData: SearchFormData, page: number = 1) => {
    setLoading(true);
    setCurrentPage(page);
    setLastSearchParams(formData);

    // フォームデータをAPIパラメータに変換
    const searchParams: JyobatsuSearchParams = {};

    if (formData.honbunSearch) searchParams.本文検索 = formData.honbunSearch;
    if (formData.shomeiSearch) searchParams.書名検索 = formData.shomeiSearch;
    if (formData.henshaSearch) searchParams.編者検索 = formData.henshaSearch;
    if (formData.shuppanshaSearch)
      searchParams.出版社検索 = formData.shuppanshaSearch;
    if (formData.jobatsuNameSearch)
      searchParams.序跋名称検索 = formData.jobatsuNameSearch;
    if (formData.yearFrom)
      searchParams.出版年西暦開始 = parseInt(formData.yearFrom, 10);
    if (formData.yearTo)
      searchParams.出版年西暦終了 = parseInt(formData.yearTo, 10);
    if (formData.mojiShurui) searchParams.本文文字種 = formData.mojiShurui;

    searchParams.cross_line = formData.crossLine;
    searchParams.match_type = formData.matchType;

    const { data, error } = await searchJyobatsu(
      searchParams,
      PAGE_SIZE,
      page,
      "relevance"
    );

    if (error) {
      console.error("Search error:", error);
      setResults([]);
      setTotalCount(0);
    } else if (data && data.length > 0) {
      setResults(data);
      setTotalCount(data[0].total_count);
    } else {
      setResults([]);
      setTotalCount(0);
    }

    setLoading(false);
  };

  const handlePageChange = (page: number) => {
    if (lastSearchParams) {
      handleSearch(lastSearchParams, page);
      // ページトップにスクロール
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero mb-8">
          <div className="hero-content text-center">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                辞書序跋データベース（仮）
              </h1>
              <p className="text-secondary font-light">
                Dictionary Prefaces and Postscripts Database of Japanese
                Dictionaries (Provisional)
              </p>
              <div className="divider divider-primary w-24 mx-auto" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 検索フォーム */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <SearchForm
                filterOptions={filterOptions}
                onSearch={(formData) => handleSearch(formData, 1)}
                loading={loading}
              />
            </div>
          </div>

          {/* 検索結果 */}
          <div className="lg:col-span-2 space-y-4">
            {loading && (
              <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body items-center text-center">
                  <span className="loading loading-spinner loading-lg text-primary" />
                  <p className="mt-4 text-base-content">検索中...</p>
                </div>
              </div>
            )}

            {!loading && results.length > 0 && (
              <>
                <SearchResults results={results} totalCount={totalCount} />
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={PAGE_SIZE}
                  onPageChange={handlePageChange}
                  loading={loading}
                />
              </>
            )}

            {!loading && results.length === 0 && lastSearchParams && (
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
                    <p className="text-lg text-neutral">検索結果がありません</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
