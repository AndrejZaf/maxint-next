import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvailableCategory } from "@/types/available-category";
import { CircleDollarSign } from "lucide-react";
import React from "react";

const ExploreTabs = ({ tabs }: { tabs: AvailableCategory[] }) => {
    return (
        <Tabs defaultValue="checking">
            <ScrollArea>
                <div className="w-full relative h-10">
                    <TabsList className="flex absolute h-10">
                        {tabs.sort((a, b) => a.offerCategory.localeCompare(b.offerCategory)).map(category => {
                            return <TabsTrigger value={category.offerCategory} key={category.offerCategory}>
                                <div className="flex items-center gap-2">
                                    <CircleDollarSign size={16} />
                                    {category.offerCategory}
                                </div>
                            </TabsTrigger>;
                        })}
                    </TabsList>
                </div>
                <ScrollBar orientation={"horizontal"} />
            </ScrollArea>
            <TabsContent value="deposit">Make changes to your account here.</TabsContent>
            <TabsContent value="credit">Change your password here.</TabsContent>
        </Tabs>
    );
};
export default ExploreTabs;
