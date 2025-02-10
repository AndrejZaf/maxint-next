"use server";

import { Profile } from "@/types/profile";
import { createClient } from "@/utils/supabase/server";

export const getUserInfo = async (userId: string | undefined) => {
    if (!userId) {
        throw Error("Invalid user id");
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from("Profile")
        .select("*")
        .eq("userId", userId)
        .returns<Profile[]>();
    if (!data || !data.length || error) {
        throw Error("User not found");
    }
    return data;
};