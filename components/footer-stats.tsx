"use client"

import { useState, useEffect } from "react"
import { AppStatistics } from "@/lib/statistics-types"
import { Separator } from "@/components/ui/separator"

export default function FooterStats() {
  const [statistics, setStatistics] = useState<AppStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<'cn' | 'en'>('cn')

  useEffect(() => {
    fetchStatistics()
    // 获取当前语言
    const pathname = window.location.pathname
    setLang(pathname.includes('/en') ? 'en' : 'cn')
  }, [])

  const fetchStatistics = async () => {
    try {
      setLoading(true)

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
      console.error('Error fetching footer statistics:', err);
    } finally {
      setLoading(false)
    }
  }

  const labels = {
    cn: {
      totalDownloads: '总下载',
      yesterdayStarts: '昨日启动'
    },
    en: {
      totalDownloads: 'Total Downloads',
      yesterdayStarts: 'Yesterday Starts'
    }
  }

  if (loading || !statistics) {
    return (
      <div className="flex items-center gap-4">
        <div className="space-y-1">
          <div className="text-xs text-fd-muted-foreground">{labels[lang].totalDownloads}</div>
          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <Separator orientation="vertical" className="h-8" />
        <div className="space-y-1">
          <div className="text-xs text-fd-muted-foreground">{labels[lang].yesterdayStarts}</div>
          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="space-y-1">
        <div className="text-xs text-fd-muted-foreground">{labels[lang].totalDownloads}</div>
        <div className="text-sm font-mono text-fd-foreground">
          {statistics.totalDownloadCount.toLocaleString()}
        </div>
      </div>
      <Separator orientation="vertical" className="h-8" />
      <div className="space-y-1">
        <div className="text-xs text-fd-muted-foreground">{labels[lang].yesterdayStarts}</div>
        <div className="text-sm font-mono text-fd-foreground">
          {statistics.yesterdayAppStartCount.toLocaleString()}
        </div>
      </div>
    </div>
  )
}
