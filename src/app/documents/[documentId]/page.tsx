import Link from "next/link";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

async function DocumentItemPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  const supabase = createClient();

  const document = await (await supabase)
    .from("jyobatsu_raw_text")
    .select("*")
    .eq("id", documentId)
    .single();

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-amber-50 to-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-6 group"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
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

          <article className="bg-white rounded-xl shadow-lg border border-amber-200 p-8">
            <header className="mb-6 pb-6 border-b border-amber-100">
              <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">
                {documentId}
              </h1>
              <p className="text-sm text-amber-600">文書ID: {documentId}</p>
            </header>

            <section>
              <h2 className="text-xl font-serif font-semibold text-amber-900 mb-4">
                内容
              </h2>
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
                <pre className="whitespace-pre-wrap font-serif text-gray-800 leading-relaxed text-lg">
                  {document.data?.text}
                </pre>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DocumentItemPage;
