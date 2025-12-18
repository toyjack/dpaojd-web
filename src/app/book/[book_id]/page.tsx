import Link from "next/link";
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
    return <div>No records found for book_id: {book_id}</div>;
  }

  const book_meta = records[0];

  return (
    <div>
      <h2>BookItemPage</h2>
      {/* Display book metadata here */}
      <div>
        <p>文献ID: {book_meta.文献ID}</p>
        <p>著者: {book_meta.編者}</p>
        <p>タイトル: {book_meta.書名}</p>
        <p>出版社・出版人・印刷所: {book_meta["出版社・出版人・印刷所"]}</p>
        <p>出版年（和暦）: {book_meta["出版年（和暦）"]}</p>
        <p>出版年（西暦）: {book_meta["出版年（西暦）"]}</p>
        <p>本文文字種: {book_meta["本文文字種"]}</p>
        <p>序跋名称: {book_meta["序跋名称"]}</p>
      </div>

      {/* access data */}
      <div>
        <h3>アクセスデータ</h3>
        <p>作成者: {book_meta["作成者"]}</p>
        <p>データ作成日: {book_meta["データ作成日"]}</p>
        <p>アクセス数: </p>
        <p>ダウンロード数: </p>
      </div>

      <div className="divider"></div>
      {/* Download link */}
      <div>
        <h3>Download Text File</h3>
        <Link href={`/downloads/${book_id}`}>Download Book Text</Link>
      </div>
      <div className="divider"></div>

      {/* 本文 */}
      <div>
        <h3>本文</h3>
        <div className="text-xl [writing-mode:vertical-rl]">
          {records.map((record) => (
            <div key={record.ID} className="flex">
              <div className="h-8 [writing-mode:horizontal-tb] text-center">
                {record.同一ID内順序}
              </div>
              <div>{record.本文}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default BookItemPage;
