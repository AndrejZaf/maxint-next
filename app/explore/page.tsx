import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { CircleDollarSign, CreditCard } from "lucide-react";

const ExplorePage = async () => {
    const supabase = await createClient();
    return (
        <div className="container space-y-4">
            <h1 className="text-3xl font-semibold">Explore</h1>
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">
                        <div className="flex items-center gap-2">
                            <CircleDollarSign size={16} />
                            Deposit
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="password">
                        <div className="flex items-center gap-2">
                            <CreditCard size={16} />
                            Credit
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </div>
    );
};
export default ExplorePage;
