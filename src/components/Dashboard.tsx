"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-01", speed: 222, accuracy: 150 },
  { date: "2024-04-02", speed: 97, accuracy: 180 },
  { date: "2024-04-03", speed: 167, accuracy: 120 },
  { date: "2024-04-04", speed: 242, accuracy: 260 },
  { date: "2024-04-05", speed: 373, accuracy: 290 },
  { date: "2024-04-06", speed: 301, accuracy: 340 },
  { date: "2024-04-07", speed: 245, accuracy: 180 },
  { date: "2024-04-08", speed: 409, accuracy: 320 },
  { date: "2024-04-09", speed: 59, accuracy: 110 },
  { date: "2024-04-10", speed: 261, accuracy: 190 },
  { date: "2024-04-11", speed: 327, accuracy: 350 },
  { date: "2024-04-12", speed: 292, accuracy: 210 },
  { date: "2024-04-13", speed: 342, accuracy: 380 },
  { date: "2024-04-14", speed: 137, accuracy: 220 },
  { date: "2024-04-15", speed: 120, accuracy: 170 },
  { date: "2024-04-16", speed: 138, accuracy: 190 },
  { date: "2024-04-17", speed: 446, accuracy: 360 },
  { date: "2024-04-18", speed: 364, accuracy: 410 },
  { date: "2024-04-19", speed: 243, accuracy: 180 },
  { date: "2024-04-20", speed: 89, accuracy: 150 },
  { date: "2024-04-21", speed: 137, accuracy: 200 },
  { date: "2024-04-22", speed: 224, accuracy: 170 },
  { date: "2024-04-23", speed: 138, accuracy: 230 },
  { date: "2024-04-24", speed: 387, accuracy: 290 },
  { date: "2024-04-25", speed: 215, accuracy: 250 },
  { date: "2024-04-26", speed: 75, accuracy: 130 },
  { date: "2024-04-27", speed: 383, accuracy: 420 },
  { date: "2024-04-28", speed: 122, accuracy: 180 },
  { date: "2024-04-29", speed: 315, accuracy: 240 },
  { date: "2024-04-30", speed: 454, accuracy: 380 },
  { date: "2024-05-01", speed: 165, accuracy: 220 },
  { date: "2024-05-02", speed: 293, accuracy: 310 },
  { date: "2024-05-03", speed: 247, accuracy: 190 },
  { date: "2024-05-04", speed: 385, accuracy: 420 },
  { date: "2024-05-05", speed: 481, accuracy: 390 },
  { date: "2024-05-06", speed: 498, accuracy: 520 },
  { date: "2024-05-07", speed: 388, accuracy: 300 },
  { date: "2024-05-08", speed: 149, accuracy: 210 },
  { date: "2024-05-09", speed: 227, accuracy: 180 },
  { date: "2024-05-10", speed: 293, accuracy: 330 },
  { date: "2024-05-11", speed: 335, accuracy: 270 },
  { date: "2024-05-12", speed: 197, accuracy: 240 },
  { date: "2024-05-13", speed: 197, accuracy: 160 },
  { date: "2024-05-14", speed: 448, accuracy: 490 },
  { date: "2024-05-15", speed: 473, accuracy: 380 },
  { date: "2024-05-16", speed: 338, accuracy: 400 },
  { date: "2024-05-17", speed: 499, accuracy: 420 },
  { date: "2024-05-18", speed: 315, accuracy: 350 },
  { date: "2024-05-19", speed: 235, accuracy: 180 },
  { date: "2024-05-20", speed: 177, accuracy: 230 },
  { date: "2024-05-21", speed: 82, accuracy: 140 },
  { date: "2024-05-22", speed: 81, accuracy: 120 },
  { date: "2024-05-23", speed: 252, accuracy: 290 },
  { date: "2024-05-24", speed: 294, accuracy: 220 },
  { date: "2024-05-25", speed: 201, accuracy: 250 },
  { date: "2024-05-26", speed: 213, accuracy: 170 },
  { date: "2024-05-27", speed: 420, accuracy: 460 },
  { date: "2024-05-28", speed: 233, accuracy: 190 },
  { date: "2024-05-29", speed: 78, accuracy: 130 },
  { date: "2024-05-30", speed: 340, accuracy: 280 },
  { date: "2024-05-31", speed: 178, accuracy: 230 },
  { date: "2024-06-01", speed: 178, accuracy: 200 },
  { date: "2024-06-02", speed: 470, accuracy: 410 },
  { date: "2024-06-03", speed: 103, accuracy: 160 },
  { date: "2024-06-04", speed: 439, accuracy: 380 },
  { date: "2024-06-05", speed: 88, accuracy: 140 },
  { date: "2024-06-06", speed: 294, accuracy: 250 },
  { date: "2024-06-07", speed: 323, accuracy: 370 },
  { date: "2024-06-08", speed: 385, accuracy: 320 },
  { date: "2024-06-09", speed: 438, accuracy: 480 },
  { date: "2024-06-10", speed: 155, accuracy: 200 },
  { date: "2024-06-11", speed: 92, accuracy: 150 },
  { date: "2024-06-12", speed: 492, accuracy: 420 },
  { date: "2024-06-13", speed: 81, accuracy: 130 },
  { date: "2024-06-14", speed: 426, accuracy: 380 },
  { date: "2024-06-15", speed: 307, accuracy: 350 },
  { date: "2024-06-16", speed: 371, accuracy: 310 },
  { date: "2024-06-17", speed: 475, accuracy: 520 },
  { date: "2024-06-18", speed: 107, accuracy: 170 },
  { date: "2024-06-19", speed: 341, accuracy: 290 },
  { date: "2024-06-20", speed: 408, accuracy: 450 },
  { date: "2024-06-21", speed: 169, accuracy: 210 },
  { date: "2024-06-22", speed: 317, accuracy: 270 },
  { date: "2024-06-23", speed: 480, accuracy: 530 },
  { date: "2024-06-24", speed: 132, accuracy: 180 },
  { date: "2024-06-25", speed: 141, accuracy: 190 },
  { date: "2024-06-26", speed: 434, accuracy: 380 },
  { date: "2024-06-27", speed: 448, accuracy: 490 },
  { date: "2024-06-28", speed: 149, accuracy: 200 },
  { date: "2024-06-29", speed: 103, accuracy: 160 },
  { date: "2024-06-30", speed: 446, accuracy: 400 },
];

const chartConfig = {
  speed: {
    label: "Speed",
    color: "hsl(var(--chart-1))",
  },
  accuracy: {
    label: "Accuracy",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DashBoard() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card className="rounded-lg">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Analysis</CardTitle>
          <CardDescription>Typing speed and accuracy</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSpeed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-speed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-speed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillAccuracy" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-accuracy)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-accuracy)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="accuracy"
              type="natural"
              fill="url(#fillAccuracy)"
              stroke="var(--color-accuracy)"
              stackId="a"
            />
            <Area
              dataKey="speed"
              type="natural"
              fill="url(#fillSpeed)"
              stroke="var(--color-speed)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
