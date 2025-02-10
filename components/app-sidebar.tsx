"use client";

import LocaleSwitcher from "@/components/locale/locale-switcher";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Compass, Frame, PieChart } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const t = useTranslations("Sidebar");
    const data = {
        projects: [
            {
                name: t("accounts"),
                url: "/accounts",
                icon: Frame,
            },
            {
                name: t("budget"),
                url: "/budget",
                icon: PieChart,
            },
            {
                name: t("explore"),
                url: "/explore",
                icon: Compass,
            },
        ],
    };
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-3xl truncate font-['BC_Alphapipe_TSB_Bold']">
                  Maxint
                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <LocaleSwitcher />
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
