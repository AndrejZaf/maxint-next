import { getCategories } from "@/actions/explore/get-categories.action";
import { getCredits } from "@/actions/explore/get-credits.action";
import { getDeposits } from "@/actions/explore/get-deposits.action";
import { CreditChart } from "@/components/credit-chart";
import { DepositChart } from "@/components/deposit-chart";
import CreditTable from "@/components/explore/credit-table";
import DepositTable from "@/components/explore/deposit-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Credit } from "@/types/credit";
import { Deposit } from "@/types/deposit";
import { ExploreCategory } from "@/types/explore-category";
import { CircleDollarSign } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const ExploreTabs = ({ selectedTab }: { selectedTab: string }) => {
    const [selectedSubTab, setSelectedSubTab] = useState<string | null>();
    const t = useTranslations("Explore");
    const [tabs, setTabs] = useState<ExploreCategory[] | null>([]);
    const [deposits, setDeposits] = useState<Deposit[] | null>([]);
    const [credits, setCredits] = useState<Credit[] | null>([]);
    const [error, setError] = useState<string | undefined>();
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
        const { data, error } = await getDeposits(tab);
        setCredits(null);
        setDeposits(data);
        setError(error?.name);
    };

    const fetchCredits = async (tab: string | null) => {
        if (!tab) return;
        const { data, error } = await getCredits(tab);
        setDeposits(null);
        setCredits(data);
        setError(error?.name);
    };

    useEffect(() => {
        setSelectedSubTab("");
        fetchData(selectedTab);
    }, [selectedTab]);

    console.log(credits)
    if (!selectedSubTab || !tabs || error) {
        return null;
    }

    return (<>
            <Tabs defaultValue={selectedSubTab} onValueChange={async (val) => {
                setSelectedSubTab(val);
                if (selectedTab === "deposit") {
                    await fetchDeposits(val);
                } else {
                    await fetchCredits(val);
                }
            }}>
                {deposits && selectedSubTab && <DepositChart deposits={deposits} selectedSubTab={selectedSubTab} />}
                {credits && selectedSubTab && <CreditChart credits={credits} selectedSubTab={selectedSubTab} />}
                <ScrollArea>
                    <div className="w-full relative h-10 mt-2">
                        <TabsList className="flex absolute h-10">
                            {tabs && tabs.sort((a, b) => a.offerCategory.localeCompare(b.offerCategory)).map(category => {
                                return <TabsTrigger value={category.offerCategory} key={category.offerCategory}>
                                    <div className="flex items-center gap-2">
                                        <CircleDollarSign size={16} />
                                        {t(category.offerCategory)}
                                    </div>
                                </TabsTrigger>;
                            })}
                        </TabsList>
                    </div>
                    <ScrollBar orientation={"horizontal"} />
                </ScrollArea>
            </Tabs>
            {deposits && selectedSubTab ? (<DepositTable deposits={deposits} />) : ""}
            {credits && selectedSubTab ? (<CreditTable credits={credits} />) : ""}
        </>
    );
};
export default ExploreTabs;
