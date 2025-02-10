"use server";

import { Deposit } from "@/types/deposit";
import { createClient } from "@/utils/supabase/server";

export const getDeposits = async (tab: string) => {
    const supabase = await createClient();
    return supabase.from("Deposit")
        .select("*")
        .eq("offerCategory", tab)
        .order("offerAPY", {
            ascending: false,
            nullsFirst: false,  // This achieves NULLS LAST
        }).returns<Deposit[]>();
};