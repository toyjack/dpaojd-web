// app/jyobatsu-search/components/SearchForm.tsx
"use client";

import { useState } from "react";
import type { FilterOptions, SearchFormData } from "@/lib/supabase/type";

interface SearchFormProps {
  filterOptions: FilterOptions | null;
  onSearch: (formData: SearchFormData) => void;
  loading: boolean;
}

export default function SearchForm({
  filterOptions,
  onSearch,
  loading,
}: SearchFormProps) {
  const [formData, setFormData] = useState<SearchFormData>({
    honbunSearch: "",
    shomeiSearch: "",
    henshaSearch: "",
    shuppanshaSearch: "",
    jobatsuNameSearch: "",
    yearFrom: "",
    yearTo: "",
    mojiShurui: "",
    crossLine: true,
    matchType: "all",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleReset = () => {
    setFormData({
      honbunSearch: "",
      shomeiSearch: "",
      henshaSearch: "",
      shuppanshaSearch: "",
      jobatsuNameSearch: "",
      yearFrom: "",
      yearTo: "",
      mojiShurui: "",
      crossLine: true,
      matchType: "all",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow-lg border border-base-300"
    >
      <div className="card-body space-y-4">
        <h2 className="card-title text-2xl font-serif text-primary">
          内容検索
        </h2>

        {/* 本文検索 */}
        <div className="form-control">
          <label htmlFor="honbunSearch" className="label">
            <span className="label-text font-medium">本文検索</span>
          </label>
          <input
            id="honbunSearch"
            type="text"
            value={formData.honbunSearch}
            onChange={(e) =>
              setFormData({ ...formData, honbunSearch: e.target.value })
            }
            placeholder="本文の内容を検索"
            className="input input-bordered w-full"
          />
          <label className="label cursor-pointer justify-start gap-2 mt-2">
            <input
              id="crossLine"
              type="checkbox"
              checked={formData.crossLine}
              onChange={(e) =>
                setFormData({ ...formData, crossLine: e.target.checked })
              }
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="label-text">全文検索を有効化</span>
          </label>
        </div>

        {/* 書名検索 */}
        <div className="form-control">
          <label htmlFor="shomeiSearch" className="label">
            <span className="label-text font-medium">書名</span>
          </label>
          <input
            id="shomeiSearch"
            type="text"
            value={formData.shomeiSearch}
            onChange={(e) =>
              setFormData({ ...formData, shomeiSearch: e.target.value })
            }
            placeholder="書名を検索"
            className="input input-bordered w-full"
          />
        </div>

        {/* 編者検索 */}
        <div className="form-control">
          <label htmlFor="henshaSearch" className="label">
            <span className="label-text font-medium">編者</span>
          </label>
          <input
            id="henshaSearch"
            type="text"
            value={formData.henshaSearch}
            onChange={(e) =>
              setFormData({ ...formData, henshaSearch: e.target.value })
            }
            placeholder="編者を検索"
            className="input input-bordered w-full"
          />
        </div>

        {/* 出版社検索 */}
        <div className="form-control">
          <label htmlFor="shuppanshaSearch" className="label">
            <span className="label-text font-medium">出版</span>
          </label>
          <input
            id="shuppanshaSearch"
            type="text"
            value={formData.shuppanshaSearch}
            onChange={(e) =>
              setFormData({ ...formData, shuppanshaSearch: e.target.value })
            }
            placeholder="出版社を検索"
            className="input input-bordered w-full"
          />
        </div>

        {/* 序跋名称検索 */}
        <div className="form-control">
          <label htmlFor="jobatsuNameSearch" className="label">
            <span className="label-text font-medium">序跋名称</span>
          </label>
          <input
            id="jobatsuNameSearch"
            type="text"
            value={formData.jobatsuNameSearch}
            onChange={(e) =>
              setFormData({ ...formData, jobatsuNameSearch: e.target.value })
            }
            placeholder="序跋名称を検索"
            className="input input-bordered w-full"
          />
        </div>

        {/* 出版年範囲 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">出版年（西暦）</span>
          </label>
          <div className="join w-full">
            <input
              type="number"
              value={formData.yearFrom}
              onChange={(e) =>
                setFormData({ ...formData, yearFrom: e.target.value })
              }
              placeholder={
                filterOptions?.出版年西暦範囲.min?.toString() || "開始年"
              }
              className="input input-bordered join-item flex-1"
            />
            <span className="btn btn-ghost join-item pointer-events-none">
              ～
            </span>
            <input
              type="number"
              value={formData.yearTo}
              onChange={(e) =>
                setFormData({ ...formData, yearTo: e.target.value })
              }
              placeholder={
                filterOptions?.出版年西暦範囲.max?.toString() || "終了年"
              }
              className="input input-bordered join-item flex-1"
            />
          </div>
        </div>

        {/* 文字種選択 */}
        {filterOptions?.本文文字種選択肢 && (
          <div className="form-control">
            <label htmlFor="mojiShurui" className="label">
              <span className="label-text font-medium">文字種</span>
            </label>
            <select
              id="mojiShurui"
              value={formData.mojiShurui}
              onChange={(e) =>
                setFormData({ ...formData, mojiShurui: e.target.value })
              }
              className="select select-bordered w-full"
            >
              <option value="">すべて</option>
              {filterOptions.本文文字種選択肢.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 匹配類型 */}
        <div className="form-control">
          <label htmlFor="matchType" className="label">
            <span className="label-text font-medium"></span>
          </label>
          <select
            id="matchType"
            value={formData.matchType}
            onChange={(e) =>
              setFormData({
                ...formData,
                matchType: e.target.value as "all" | "direct" | "partial",
              })
            }
            className="select select-bordered w-full"
          >
            <option value="all">すべて</option>
            <option value="direct">完全一致のみ</option>
            <option value="partial">部分一致を含む</option>
          </select>
        </div>

        {/* ボタン */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex-1"
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
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-outline"
          >
            リセット
          </button>
        </div>

        {/* 統計情報 */}
        {filterOptions && <div className="divider" />}
        {filterOptions && (
          <div className="stats shadow bg-base-200 w-full">
            <div className="stat place-items-center">
              <div className="stat-title">総文献数</div>
              <div className="stat-value text-primary text-2xl">
                {filterOptions.総文献数.toLocaleString()}
              </div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">総記錄数</div>
              <div className="stat-value text-secondary text-2xl">
                {filterOptions.総記錄数.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
