import { getCategories } from "@/actions/explore/get-categories.action";
import { getDeposits } from "@/actions/explore/get-deposits.action";
import { DepositChart } from "@/components/deposit-chart";
import ExploreCards from "@/components/explore/explore-cards";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    const [error, setError] = useState<string | undefined>();
    const fetchData = async (tab: string) => {
        const { data, error } = await getCategories(tab);
        setTabs(data);
        setSelectedSubTab(data && data[0].offerCategory);
        setError(error?.name);
        await fetchDeposits(data && data[0].offerCategory);
    };

    const fetchDeposits = async (tab: string | null) => {
        if (!tab) return;
        const { data, error } = await getDeposits(tab);
        setDeposits(data);
        setError(error?.name);
    };

    useEffect(() => {
        setSelectedSubTab("");
        fetchData(selectedTab);
    }, [selectedTab]);

    if (!selectedSubTab || !tabs || error) {
        return null;
    }

    return (<>
            <Tabs defaultValue={selectedSubTab} onValueChange={async (val) => {
                setSelectedSubTab(val);
                await fetchDeposits(val);
            }}>
                {deposits && selectedSubTab && <DepositChart deposits={deposits} selectedSubTab={selectedSubTab} />}
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
            <ExploreCards deposits={deposits} />
        </>
    );
};
export default ExploreTabs;
