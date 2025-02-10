"use server";

import { defaultLocale, Locale } from "@/i18n/config";
import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
    const c = await cookies();
    return c.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
    const c = await cookies();
    c.set(COOKIE_NAME, locale);
}