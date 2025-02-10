"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function demoLogin() {
    const supabase = await createClient();
    const data = { email: "test@maxint.com", password: "12345678" };
    const { data: d1, error } = await supabase.auth.signInWithPassword(data);
    if (error) {
        redirect("/error");
    }

    console.log(d1)
    revalidatePath("/", "layout");
    redirect("/");
}