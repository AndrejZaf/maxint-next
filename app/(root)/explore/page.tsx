import ExploreTabs from "@/components/explore/explore-tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvailableCategory } from "@/types/available-category";
import { createClient } from "@/utils/supabase/server";
import { CircleDollarSign, CreditCard } from "lucide-react";

const ExplorePage = async () => {
    const supabase = await createClient();
    const { data: availableCategories, error: availableCategoriesError } = await supabase
        .from("DepositAvailableCategories")
        .select("*")
        .returns<AvailableCategory[]>();

    const { data, error } = await supabase
        .from("Deposit")
        .select("*")
        .eq("offerCategory", "checking")
        .order("offerAPY", {
            ascending: false,
            nullsFirst: false,  // This achieves NULLS LAST
        });
    return (
        <div className="container space-y-4">
            <h1 className="text-3xl font-semibold">Explore</h1>
            <Tabs defaultValue="deposit">
                <TabsList>
                    <TabsTrigger value="deposit">
                        <div className="flex items-center gap-2">
                            <CircleDollarSign size={16} />
                            Deposit
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="credit">
                        <div className="flex items-center gap-2">
                            <CreditCard size={16} />
                            Credit
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="deposit"><ExploreTabs tabs={availableCategories ?? []} /></TabsContent>
                <TabsContent value="credit">Change your password here.</TabsContent>
            </Tabs>
        </div>
    );
};
export default ExplorePage;
