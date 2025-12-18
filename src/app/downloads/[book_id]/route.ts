import type { NextRequest } from "next/server";
import { update_count } from "@/actions/update-stat";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ book_id: string }> },
) {
  const supabase = createClient();
  const { book_id } = await context.params;

  const { data: textData, error: textError } = await (await supabase)
    .from("jyobatsu_raw_text")
    .select()
    .eq("id", book_id)
    .single();

  if (textError || !textData || !textData.text) {
    return new Response("File not found", { status: 404 });
  }
  const file = new Blob([textData.text], { type: "text/plain" });

  await update_count(parseInt(book_id, 10), "download");

  return new Response(file, {
    headers: {
      "Content-Disposition": `attachment; filename="book_${book_id}.txt"`,
      "Content-Type": "text/plain",
    },
  });
}
