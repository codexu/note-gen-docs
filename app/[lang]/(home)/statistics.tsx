"use client"

import { useState, useEffect } from "react"
import { AppStatisticsChart } from "@/components/app-statistics-chart"
import { AppStatistics } from "@/lib/statistics-types"

export default function HomeStatistics() {
  const [statistics, setStatistics] = useState<AppStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch from internal API (no authentication required)
      const response = await fetch('/api/internal/statistics')
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }
      
      const result = await response.json()
      
      if (result.code !== 0) {
        throw new Error(`API error: ${result.msg}`)
      }
      
      setStatistics(result.data)

    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError(err instanceof Error ? err.message : "获取统计数据失败")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">加载统计数据中...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="text-destructive text-4xl mb-4">⚠️</div>
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={fetchStatistics}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                重试
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!statistics) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">应用统计</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            查看应用的下载和启动统计数据，了解用户使用趋势
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-6 border">
            <div className="text-sm font-medium text-muted-foreground mb-2">昨日下载</div>
            <div className="text-2xl font-bold">{statistics.yesterdayDownloadCount.toLocaleString()}</div>
          </div>
          <div className="bg-card rounded-lg p-6 border">
            <div className="text-sm font-medium text-muted-foreground mb-2">总下载量</div>
            <div className="text-2xl font-bold">{statistics.totalDownloadCount.toLocaleString()}</div>
            {statistics.githubDownloads && (
              <div className="text-xs text-muted-foreground mt-1">
                包含 GitHub: {statistics.githubDownloads.toLocaleString()}
              </div>
            )}
          </div>
          <div className="bg-card rounded-lg p-6 border">
            <div className="text-sm font-medium text-muted-foreground mb-2">昨日启动</div>
            <div className="text-2xl font-bold">{statistics.yesterdayAppStartCount.toLocaleString()}</div>
          </div>
          <div className="bg-card rounded-lg p-6 border">
            <div className="text-sm font-medium text-muted-foreground mb-2">总启动量</div>
            <div className="text-2xl font-bold">{statistics.totalAppStartCount.toLocaleString()}</div>
          </div>
        </div>

        {/* GitHub Stats */}
        {statistics.githubStars !== undefined && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-6 border">
              <div className="text-sm font-medium text-muted-foreground mb-2">GitHub Stars</div>
              <div className="text-2xl font-bold">{statistics.githubStars.toLocaleString()}</div>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <div className="text-sm font-medium text-muted-foreground mb-2">GitHub Forks</div>
              <div className="text-2xl font-bold">{statistics.githubForks?.toLocaleString() || 0}</div>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <div className="text-sm font-medium text-muted-foreground mb-2">GitHub 下载</div>
              <div className="text-2xl font-bold">{statistics.githubDownloads?.toLocaleString() || 0}</div>
            </div>
          </div>
        )}

        {/* Chart */}
        <AppStatisticsChart
          downloadData={statistics.downloadCount7Day}
          startData={statistics.appStartCount7Day}
        />
      </div>
    </section>
  )
}
