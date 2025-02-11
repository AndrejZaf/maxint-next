"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Deposit } from "@/types/deposit";
import { generateGreenHSLColors } from "@/utils/color.util";
import { useTranslations } from "next-intl";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";

const chartConfig = {
    offerAPY: {
        label: "Offer APY",
    },
    offerName: {
        label: "Offer Name",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig;

export function DepositChart({ deposits, selectedSubTab }: { selectedSubTab: string, deposits: Deposit[] | null }) {
    const t = useTranslations("Explore");
    if (!deposits) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t(selectedSubTab)}</CardTitle>
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
                            {deposits.map((item, index) => {
                                const colors = generateGreenHSLColors(deposits.length);
                                return (
                                    <Cell
                                        key={item.offerName}
                                        fill={`hsl(${colors[index]})`}
                                    />
                                );
                            })}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
