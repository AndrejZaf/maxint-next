import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExploreCategory } from "@/types/explore-category";
import { createClient } from "@/utils/supabase/client";
import { CircleDollarSign } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const ExploreTabs = ({ selectedTab }: { selectedTab: string }) => {
    const supabase = createClient();
    const t = useTranslations("Explore");
    const [tabs, setTabs] = useState<ExploreCategory[] | null>([]);
    const fetchData = async (tab: string) => {
        if (tab === "deposit") {
            const { data: availableCategories, error: availableCategoriesError } = await supabase
                .from("DepositAvailableCategories")
                .select("*")
                .returns<ExploreCategory[]>();
            setTabs(availableCategories);
        } else {
            const { data: availableCategories, error: availableCategoriesError } = await supabase
                .from("CreditAvailableCategories")
                .select("offerCategory:category")
                .returns<ExploreCategory[]>();
            setTabs(availableCategories);
        }
    };

    useEffect(() => {
        fetchData(selectedTab)
    }, [selectedTab])

    return (
        <Tabs defaultValue="checking">
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
    );
};
export default ExploreTabs;
