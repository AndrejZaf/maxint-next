import { getCategories } from "@/actions/explore/get-categories.action";
import { DepositChart } from "@/components/deposit-chart";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExploreCategory } from "@/types/explore-category";
import { CircleDollarSign } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const ExploreTabs = ({ selectedTab }: { selectedTab: string }) => {
    const [selectedSubTab, setSelectedSubTab] = useState<string | null>();
    const t = useTranslations("Explore");
    const [tabs, setTabs] = useState<ExploreCategory[] | null>([]);
    const [error, setError] = useState<string | undefined>();
    const fetchData = async (tab: string) => {
        const { data, error } = await getCategories(tab);
        setTabs(data);
        setSelectedSubTab(data && data[0].offerCategory);
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
            <DepositChart selectedSubTab={selectedSubTab} />
            <Tabs defaultValue={selectedSubTab} onValueChange={setSelectedSubTab}>
                <ScrollArea>
                    <div className="w-full relative h-10">
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
                {/*<TabsContent value="deposit">Make changes to your account here.</TabsContent>*/}
                {/*<TabsContent value="credit">Change your password here.</TabsContent>*/}
            </Tabs>
        </>
    );
};
export default ExploreTabs;
