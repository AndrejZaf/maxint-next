"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";
import { EarthIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    defaultValue: string;
    items: Array<{ value: string; label: string }>;
};
export default function LocaleSwitcherSelect({ defaultValue, items }: Props) {
    const { isMobile } = useSidebar();
    const t = useTranslations("LocaleSwitcher");
    const onChange = async (value: string) => {
        const locale = value as Locale;
        await setUserLocale(locale);
    };
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <EarthIcon className="size-4" />
                            <div className="flex items-center justify-center gap-2 px-1 py-1.5 text-left text-sm">
                                {t(defaultValue)}
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        {items.map(item => <DropdownMenuItem onClick={() => onChange(item.value)} key={item.value}
                                                             className="cursor-pointer">
                            {item.label}
                        </DropdownMenuItem>)}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}