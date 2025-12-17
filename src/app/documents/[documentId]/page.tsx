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

          <article className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <div className="pb-6 border-b border-base-300">
                <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                  {documentId}
                </h1>
                <div className="badge badge-outline badge-warning">
                  文書ID: {documentId}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-serif font-semibold text-primary mb-4">
                  内容
                </h2>
                <div className="mockup-code bg-base-200 border border-base-300">
                  <pre className="px-6 whitespace-pre-wrap font-serif text-base-content leading-relaxed text-lg">
                    {document.data?.text}
                  </pre>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DocumentItemPage;
