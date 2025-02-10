import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvailableCategory } from "@/types/available-category";
import { CircleDollarSign } from "lucide-react";
import React from "react";

const ExploreTabs = ({ tabs }: { tabs: AvailableCategory[] }) => {
    return (
        <Tabs defaultValue="checking">
            <TabsList>
                {tabs.sort((a, b) => a.offerCategory.localeCompare(b.offerCategory)).map(category => {
                    return <TabsTrigger value={category.offerCategory} key={category.offerCategory}>
                        <div className="flex items-center gap-2">
                            <CircleDollarSign size={16} />
                            {category.offerCategory}
                        </div>
                    </TabsTrigger>
                })}
            </TabsList>
            <TabsContent value="deposit">Make changes to your account here.</TabsContent>
            <TabsContent value="credit">Change your password here.</TabsContent>
        </Tabs>
    );
};
export default ExploreTabs;
