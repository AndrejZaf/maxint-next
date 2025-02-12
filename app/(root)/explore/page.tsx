"use client";

import ExploreTabs from "@/components/explore/explore-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIcon } from "@/utils/icon.util";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ExplorePage = () => {
    const [selectedTab, setSelectedTab] = useState<string>("deposit");
    const t = useTranslations("Explore");
    return (
        <div className="container space-y-4">
            <h1 className="text-3xl font-semibold">{t("explore")}</h1>
            <Tabs defaultValue={selectedTab} onValueChange={async (val) => {
                setSelectedTab(val);
            }}>
                <TabsList>
                    <TabsTrigger value="deposit">
                        <div className="flex items-center gap-2">
                            {getIcon("deposit")}
                            {t("deposit")}
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="credit">
                        <div className="flex items-center gap-2">
                            {getIcon("credit")}
                            {t("credit")}
                        </div>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <ExploreTabs selectedTab={selectedTab} />
        </div>
    );
};
export default ExplorePage;
