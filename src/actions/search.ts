"use server";

import { createClient } from "@/lib/supabase/server";
import type {
  FilterOptions,
  JyobatsuSearchParams,
  JyobatsuSearchResultAdvanced,
} from "@/lib/supabase/type";

export async function searchJyobatsu(
  searchParams: JyobatsuSearchParams,
  pageSize: number = 50,
  pageNumber: number = 1,
  orderBy: string = "relevance",
) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("search_jyobatsu_advanced", {
    search_params: searchParams,
    page_size: pageSize,
    page_number: pageNumber,
    order_by: orderBy,
  });

  if (error) {
    console.error("Search error:", error);
    return { data: null, error: error.message };
  }

  return {
    data: data as JyobatsuSearchResultAdvanced[],
    error: null,
  };
}

export async function getFilterOptions() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_jyobatsu_filter_options");

  if (error) {
    console.error("Filter options error:", error);
    return { data: null, error: error.message };
  }

  return {
    data: data as FilterOptions,
    error: null,
  };
}
