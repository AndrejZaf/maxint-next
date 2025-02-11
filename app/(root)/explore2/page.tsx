"use client";

import { getCategories } from "@/actions/explore/get-categories.action";
import { getCredits } from "@/actions/explore/get-credits.action";
import { getDeposits } from "@/actions/explore/get-deposits.action";
import { CreditChart } from "@/components/credit-chart";
import { DepositChart } from "@/components/deposit-chart";
import CreditTable from "@/components/explore/credit-table";
import DepositTable from "@/components/explore/deposit-table";
import Loading from "@/components/loading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Credit } from "@/types/credit";
import { Deposit } from "@/types/deposit";
import { ExploreCategory } from "@/types/explore-category";
import { getIcon } from "@/utils/icon.util";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";


const ExploreSecondaryPage = () => {
    const [selectedTab, setSelectedTab] = useState<string>("deposit");
    const t = useTranslations("Explore");
    const [deposits, setDeposits] = useState<Deposit[] | null>([]);
    const [credits, setCredits] = useState<Credit[] | null>([]);
    const [error, setError] = useState<string | undefined>();
    const [tabs, setTabs] = useState<ExploreCategory[] | null>([]);
    const [selectedSubTab, setSelectedSubTab] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const fetchData = async (tab: string) => {
        const { data, error } = await getCategories(tab);
        setTabs(data);
        setSelectedSubTab(data && data[0].offerCategory);
        setError(error?.name);
        if (tab === "deposit") {
            await fetchDeposits(data && data[0].offerCategory);
        } else {
            await fetchCredits(data && data[0].offerCategory);
        }
    };

    const fetchDeposits = async (tab: string | null) => {
        if (!tab) return;
        setLoading(true);
        const { data, error } = await getDeposits(tab);
        setCredits(null);
        setDeposits(data);
        setError(error?.name);
        setLoading(false);
    };

    const fetchCredits = async (tab: string | null) => {
        if (!tab) return;
        setLoading(true);
        const { data, error } = await getCredits(tab);
        setDeposits(null);
        setCredits(data);
        setError(error?.name);
        setLoading(false);
    };

    useEffect(() => {
        fetchData(selectedTab);
    }, [selectedTab]);

    if (error) {
        return null;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container space-y-4">
            <h1 className="text-3xl font-semibold">{t("explore")}</h1>
            <div className="flex gap-4">
                <Select defaultValue={selectedTab} value={selectedTab} onValueChange={async (val) => {
                    await fetchData(val);
                    setSelectedTab(val);
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="deposit">
                            <div className="flex items-center gap-2">
                                {getIcon("deposit")}{t("deposit")}
                            </div>
                        </SelectItem>
                        <SelectItem value="credit">
                            <div className="flex items-center gap-2">
                                {getIcon("credit")}{t("credit")}
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue={selectedSubTab ?? ""} value={selectedSubTab ?? ""} onValueChange={async (val) => {
                    setSelectedSubTab(val);
                    if (selectedTab === "deposit") {
                        await fetchDeposits(val);
                    } else {
                        await fetchCredits(val);
                    }
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        {tabs && tabs.sort((a, b) => a.offerCategory.localeCompare(b.offerCategory)).map(category => {
                            return <SelectItem value={category.offerCategory} key={category.offerCategory}>
                                <div className="flex items-center gap-2">
                                    {getIcon(category.offerCategory)}
                                    {t(category.offerCategory)}
                                </div>
                            </SelectItem>;
                        })}
                    </SelectContent>
                </Select>
            </div>
            {deposits && selectedSubTab ? (<>
                <DepositChart deposits={deposits} selectedSubTab={selectedSubTab} />
                <DepositTable deposits={deposits} /></>) : ""}
            {credits && selectedSubTab ? (<>
                <CreditChart credits={credits} selectedSubTab={selectedSubTab} />
                <CreditTable credits={credits} />
            </>) : ""}
        </div>
    );
};
export default ExploreSecondaryPage;
