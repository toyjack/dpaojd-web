import { createClient } from "@/lib/supabase/server";

async function DocumentItemPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  const supabase = createClient();

  const document = await (await supabase).from("jyobatsu_raw_text").select("*").eq("id", documentId).single() ;
  console.log(document) ;

  return <div>
    <h2>
      Document ID: {documentId}
    </h2>
    <div>
      <h4>Contents</h4>
      <pre>{document.data?.text}</pre>
    </div>
  </div>;
}
export default DocumentItemPage;
