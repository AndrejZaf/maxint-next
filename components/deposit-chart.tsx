"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer, ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Deposit } from "@/types/deposit";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";

const chartConfig = {
    offerAPY: {
        label: "Offer APY",
    },
    offerName: {
        label: "Offer Name"
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig;

export function DepositChart({ selectedSubTab }: { selectedSubTab: string }) {
    const supabase = createClient();
    const [deposits, setDeposits] = useState<Deposit[] | null>([]);
    const fetchData = async (tab: string) => {
        const { data, error } = await supabase.from("Deposit")
            .select("*")
            .eq("offerCategory", tab)
            .order("offerAPY", {
                ascending: false,
                nullsFirst: false,  // This achieves NULLS LAST
            }).returns<Deposit[]>();
        setDeposits(data);
    };

    useEffect(() => {
        fetchData(selectedSubTab);
    }, [selectedSubTab]);

    if (!deposits) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{selectedSubTab}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        className="h-[350px]"
                        accessibilityLayer
                        data={deposits}
                        layout="horizontal"
                    >
                        <CartesianGrid vertical={false} />
                        <YAxis
                            dataKey="offerAPY" type="number"
                            hide
                        />
                        <XAxis
                            dataKey="offerName"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="offerAPY"
                            layout="horizontal"
                            fill="var(--color-desktop)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="offerName"
                                position="middle"
                                offset={2}
                                className="fill-[--color-label]"
                                fontSize={10}
                                angle={-90}
                            />
                            <LabelList
                                dataKey="offerAPY"
                                position="top"
                                offset={2}
                                className="fill-foreground"
                                fontSize={12}
                            />
                            {deposits.map((item) => (
                                <Cell
                                    key={item.offerName}
                                    fill={"#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, "0")}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
