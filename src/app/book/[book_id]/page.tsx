import Link from "next/link";
import { get_count, update_count } from "@/actions/update-stat";
import MainTextViewer from "@/components/main-text";
import { createClient } from "@/lib/supabase/server";

async function BookItemPage({
  params,
}: {
  params: Promise<{ book_id: string }>;
}) {
  const supabase = createClient();
  const { book_id } = await params;
  const { data: records, error: recordsError } = await (await supabase)
    .from("jyobatsu_records")
    .select()
    .eq("文献ID", parseInt(book_id, 10))
    .order("同一ID内順序", { ascending: true });

  if (recordsError) {
    console.error("Supabase error:", recordsError);
  }

  if (!records || records.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-linear-to-b from-amber-50 to-white">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link
              href="/results"
              className="btn btn-ghost btn-sm gap-2 text-primary hover:text-secondary mb-6"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Back to Search</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              検索に戻る
            </Link>
            <div className="hero min-h-[400px]">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Not Found</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-lg text-neutral">
                    文献ID {book_id} のレコードが見つかりませんでした
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const book_meta = records[0];

  await update_count(book_meta.文献ID!, "access");

  const { access_count, download_count } = await get_count(
    parseInt(book_id, 10)
  );

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-amber-50 to-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* <Link
            href="/results"
            className="btn btn-ghost btn-sm gap-2 text-primary hover:text-secondary mb-6"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Back to Search</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            検索に戻る
          </Link> */}

          {/* Book Header */}
          <div className="card bg-base-100 shadow-lg border border-base-300 mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">
                    {book_meta.書名}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <div className="badge badge-outline badge-primary">
                      文献ID: {book_meta.文献ID}
                    </div>
                    {book_meta["本文文字種"] && (
                      <div className="badge badge-outline badge-secondary">
                        {book_meta["本文文字種"]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="divider" />

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {book_meta.編者 && (
                  <div className="flex gap-2">
                    <span className="font-medium text-secondary min-w-24">
                      編者:
                    </span>
                    <span className="text-base-content">{book_meta.編者}</span>
                  </div>
                )}
                {book_meta["出版社・出版人・印刷所"] && (
                  <div className="flex gap-2">
                    <span className="font-medium text-secondary min-w-24">
                      出版:
                    </span>
                    <span className="text-base-content">
                      {book_meta["出版社・出版人・印刷所"]}
                    </span>
                  </div>
                )}
                {book_meta["出版年（西暦）"] && (
                  <div className="flex gap-2">
                    <span className="font-medium text-secondary min-w-24">
                      出版年:
                    </span>
                    <span className="text-base-content">
                      {book_meta["出版年（西暦）"]}
                      {book_meta["出版年（和暦）"] &&
                        ` (${book_meta["出版年（和暦）"]})`}
                    </span>
                  </div>
                )}
                {book_meta["序跋名称"] && (
                  <div className="flex gap-2">
                    <span className="font-medium text-secondary min-w-24">
                      序跋名称:
                    </span>
                    <span className="text-base-content">
                      {book_meta["序跋名称"]}
                    </span>
                  </div>
                )}
              </div>

              {/* Access Data */}
              {(book_meta["作成者"] || book_meta["データ作成日"]) && (
                <>
                  <div className="divider" />
                  <div className="stats stats-vertical sm:stats-horizontal shadow bg-base-200 w-full">
                    {book_meta["作成者"] && (
                      <div className="stat">
                        <div className="stat-title">作成者</div>
                        <div className="stat-value text-primary text-lg">
                          {book_meta["作成者"]}
                        </div>
                      </div>
                    )}
                    {book_meta["データ作成日"] && (
                      <div className="stat">
                        <div className="stat-title">データ作成日</div>
                        <div className="stat-value text-secondary text-lg">
                          {book_meta["データ作成日"]}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="mt-6 stats stats-vertical sm:stats-horizontal shadow bg-base-200 w-full">
                <div className="stat">
                  <div className="stat-title">閲覧回数</div>
                  <div className="stat-value text-primary text-lg">
                    {access_count}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">ダウンロード回数</div>
                  <div className="stat-value text-secondary text-lg">
                    {download_count}
                  </div>
                </div>
              </div>

              <div className="divider" />

              {/* Download Link */}
              <div className="flex gap-4 justify-end">
                <Link
                  href={`/downloads/${book_id}`}
                  className="btn btn-primary gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Download</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  テキストファイルをダウンロード
                </Link>
              </div>
            </div>
          </div>

          {/* Main Text Content */}

          <MainTextViewer records={records} />
        </div>
      </main>
    </div>
  );
}

export default BookItemPage;
