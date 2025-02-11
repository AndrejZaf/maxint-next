import { getCategories } from "@/actions/explore/get-categories.action";
import { getDeposits } from "@/actions/explore/get-deposits.action";
import { DepositChart } from "@/components/deposit-chart";
import ExploreCards from "@/components/explore/explore-cards";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Deposit } from "@/types/deposit";
import { ExploreCategory } from "@/types/explore-category";
import { CircleDollarSign } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const ExploreTabs = ({ selectedTab }: { selectedTab: string }) => {

    const t = useTranslations("Explore");



    //
    // useEffect(() => {
    //     setSelectedSubTab("");
    //     fetchData(selectedTab);
    // }, [selectedTab]);
    //
    // if (!selectedSubTab || !tabs || error) {
    //     return null;
    // }

    return (<>
            {/*<Tabs defaultValue={selectedSubTab} onValueChange={async (val) => {*/}
            {/*    */}
            {/*}}>*/}
            {/*    <ScrollArea>*/}
            {/*        <div className="w-full relative h-10 mt-2">*/}
            {/*            <TabsList className="flex absolute h-10">*/}
            {/*                */}
            {/*            </TabsList>*/}
            {/*        </div>*/}
            {/*        <ScrollBar orientation={"horizontal"} />*/}
            {/*    </ScrollArea>*/}
            {/*</Tabs>*/}
            {/*{deposits && selectedSubTab && <DepositChart deposits={deposits} selectedSubTab={selectedSubTab} />}*/}
            {/*<ExploreCards deposits={deposits} />*/}
        </>
    );
};
export default ExploreTabs;
