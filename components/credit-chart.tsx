"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Credit } from "@/types/credit";
import { generateGreenHSLColors } from "@/utils/color.util";
import { useTranslations } from "next-intl";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";

const chartConfig = {
    estimatedEarning: {
        label: "Estimated Earning",
    },
    name: {
        label: "Name",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig;

export function CreditChart({ credits, selectedSubTab }: { selectedSubTab: string, credits: Credit[] | null }) {
    const t = useTranslations("Explore");
    if (!credits) {
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
                        data={credits}
                        layout="horizontal"
                    >
                        <CartesianGrid vertical={false} />
                        <YAxis
                            dataKey="estimatedEarning" type="number"
                            hide
                        />
                        <XAxis
                            dataKey="name"
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
                            dataKey="estimatedEarning"
                            layout="horizontal"
                            fill="var(--color-desktop)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="name"
                                position="middle"
                                offset={2}
                                className="fill-[--color-label]"
                                fontSize={10}
                                angle={-90}
                            />
                            <LabelList
                                dataKey="estimatedEarning"
                                position="top"
                                offset={2}
                                className="fill-foreground"
                                fontSize={12}
                            />
                            {credits.map((item, index) => {
                                const colors = generateGreenHSLColors(credits.length);
                                return (
                                    <Cell
                                        key={item.name}
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
