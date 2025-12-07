import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";


export async function GET(request: NextRequest) {
  const supabase = createClient();

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const { data, error, count } = await (await supabase).rpc("search_jyobatsu_raw_text", {
      search_query: query,
    });

    if (error) throw error;

    return NextResponse.json({
      results: data,
      total: count,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
