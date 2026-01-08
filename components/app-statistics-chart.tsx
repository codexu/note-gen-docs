"use client"

import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { DailyDataPoint } from "@/lib/statistics-types"

interface AppStatisticsChartProps {
  downloadData: DailyDataPoint[]
  startData: DailyDataPoint[]
}

const chartConfig = {
  downloads: {
    label: "下载次数",
    color: "var(--chart-1)",
  },
  starts: {
    label: "启动次数", 
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

// Merge download and start data by date
function mergeChartData(downloadData: DailyDataPoint[], startData: DailyDataPoint[]) {
  const dataMap = new Map<string, { downloads: number; starts: number }>()
  
  // Add download data
  downloadData.forEach(item => {
    dataMap.set(item.timeData, {
      downloads: item.data,
      starts: 0
    })
  })
  
  // Add start data
  startData.forEach(item => {
    const existing = dataMap.get(item.timeData) || { downloads: 0, starts: 0 }
    dataMap.set(item.timeData, {
      ...existing,
      starts: item.data
    })
  })
  
  // Convert to array and sort by date (ascending)
  return Array.from(dataMap.entries())
    .map(([timeData, data]) => ({
      timeData,
      ...data
    }))
    .sort((a, b) => {
      // Compare as strings since format is YYMMDD
      if (a.timeData.length === 6 && b.timeData.length === 6) {
        return a.timeData.localeCompare(b.timeData)
      }
      return 0
    })
}

// Format timeData to readable date
function formatTimeData(timeData: string): string {
  // timeData format: "251223" (YYMMDD)
  if (timeData.length !== 6) return timeData
  
  const month = timeData.substring(2, 4)
  const day = timeData.substring(4, 6)
  return `${month}/${day}`
}

export function AppStatisticsChart({ downloadData, startData }: AppStatisticsChartProps) {
  const chartData = mergeChartData(downloadData, startData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>应用统计趋势</CardTitle>
        <CardDescription>
          近 7 天应用下载次数和启动次数
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timeData"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatTimeData}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const timeData = value as string
                    if (timeData.length !== 6) return value
                    
                    const year = 2000 + parseInt(timeData.substring(0, 2))
                    const month = timeData.substring(2, 4)
                    const day = timeData.substring(4, 6)
                    return `${year}/${month}/${day}`
                  }}
                  indicator="dot"
                />
              }
            />
            <Line
              dataKey="downloads"
              type="monotone"
              stroke="var(--color-downloads)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="starts"
              type="monotone"
              stroke="var(--color-starts)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
