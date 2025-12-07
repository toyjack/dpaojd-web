import { createClient } from "./supabase/server";

const supabase = createClient();
export async function searchJyobatsuRawText(keyword: string) {
  const { data, error } = await (await supabase).rpc(
    "search_jyobatsu_raw_text",
    {
      search_query: keyword,
    },
  );
  if (error) {
    throw error;
  }
  return data;
}
