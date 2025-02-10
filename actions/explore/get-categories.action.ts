"use server";

import { ExploreCategory } from "@/types/explore-category";
import { createClient } from "@/utils/supabase/server";

export const getCategories = async (tab: string) => {
    const supabase = await createClient();
    if (tab === "deposit") {
        const { data, error } = await supabase
            .from("DepositAvailableCategories")
            .select("*")
            .returns<ExploreCategory[]>();
        data?.sort()
        return { data, error };
    } else {
        const { data, error } = await supabase
            .from("CreditAvailableCategories")
            .select("offerCategory:category")
            .returns<ExploreCategory[]>();
        return { data, error };
    }
};
