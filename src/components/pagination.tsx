"use client";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export default function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  loading,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisThreshold = 7;

    if (totalPages <= showEllipsisThreshold) {
      // すべてのページを表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 省略記号を使用
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="card bg-base-100 shadow-lg border border-base-300">
      <div className="card-body p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-base-content">
            <span className="font-medium">
              {((currentPage - 1) * pageSize + 1).toLocaleString()}
            </span>
            {" - "}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, totalCount).toLocaleString()}
            </span>
            {" / "}
            <span className="font-medium">{totalCount.toLocaleString()}</span> 件
          </div>

          <div className="join">
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="join-item btn btn-sm"
            >
              «
            </button>

            {getPageNumbers().map((page) =>
              typeof page === "number" ? (
                <button
                  type="button"
                  key={page}
                  onClick={() => onPageChange(page)}
                  disabled={loading}
                  className={`join-item btn btn-sm ${
                    currentPage === page ? "btn-primary" : ""
                  }`}
                >
                  {page}
                </button>
              ) : (
                <button
                  type="button"
                  key={`ellipsis-${page}-${Math.random()}`}
                  className="join-item btn btn-sm btn-disabled"
                  disabled
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
              className="join-item btn btn-sm"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
