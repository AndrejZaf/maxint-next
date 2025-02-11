"use server";

import { Credit } from "@/types/credit";
import { createClient } from "@/utils/supabase/server";

export const getCredits = async (tab: string) => {
    const supabase = await createClient();
    return supabase.from("Credit")
        .select("*")
        .contains('categories', [tab])
        .order("estimatedEarning", {
            ascending: false,
            nullsFirst: false,  // This achieves NULLS LAST
        }).returns<Credit[]>();
};