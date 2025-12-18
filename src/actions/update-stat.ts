"use server";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/libdatabase.types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
);
export async function get_count(book_id: number) {
  const { data, error } = await supabase.from("jyobatsu_book_stat").select().eq("book_id", book_id).single()
  if (error) {
    console.error("Book stat get error:", error);
    return {
      access_count: 0,
      download_count: 0
    };
  }

  if (!data) {
    return {
      access_count: 0,
      download_count: 0
    }
  }

  return {
    access_count: data.access_count || 0,
    download_count: data.download_count || 0
  }
}

export async function update_count(book_id: number, column: "access" | "download") {
  const { data: currentData, error: currentDataError } = await supabase
    .from("jyobatsu_book_stat")
    .select()
    .eq("book_id", book_id)
    .single();

  if (currentDataError) {
    console.error("Book stat update error:", currentDataError);
  }

  if (!currentData) {
    const { error } = await supabase.from("jyobatsu_book_stat").insert({
      book_id,
    });
    if (error) {
      console.error("Book stat insert error:", error);
      return { data: null, error: error.message };
    }
  }

  const { error } = await supabase
    .from("jyobatsu_book_stat")
    .update({
      download_count: currentData!.download_count! + (column === "download" ? 1 : 0),
      access_count: currentData!.access_count! + (column === "access" ? 1 : 0),
    })
    .eq("book_id", book_id);

  if (error) {
    console.error("Book stat update error:", error);
    return { data: null, error: error.message };
  }
}
