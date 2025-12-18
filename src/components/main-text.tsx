"use client";

import { useEffect, useRef } from "react";
import type { Database } from "@/libdatabase.types";

type JyobatsuRecord = Database["public"]["Tables"]["jyobatsu_records"]["Row"];

function MainTextViewer({ records }: { records: JyobatsuRecord[] }) {
  const textBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll to end
    if (textBoxRef.current) {
      textBoxRef.current.scrollTo(
        textBoxRef.current.scrollWidth,
        textBoxRef.current.scrollHeight
      );
    }
  }, []);

  return (
    <div className="card bg-base-100 shadow-lg border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-2xl font-serif text-primary mb-4">
          本文
        </h2>
        <div className="alert alert-info mb-4">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Info</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            縦書き表示で {records.length} 件のレコードを表示しています
          </span>
        </div>

        {/* 本文 */}
        <div className="overflow-x-auto bg-base-200 rounded-lg p-6 border border-base-300">
          <div
            className="text-xl [writing-mode:vertical-rl]  min-h-[600px]"
            ref={textBoxRef}
          >
            {records.map((record) => (
              <div key={record.ID} className="flex items-start">
                <div className="sticky top-0 bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium [writing-mode:horizontal-tb] mb-2">
                  {record.同一ID内順序}
                </div>
                <div className="font-serif leading-relaxed text-base-content ml-2">
                  {record.本文}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainTextViewer;
