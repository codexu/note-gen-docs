export interface DailyDataPoint {
  timeData: string;
  data: number;
}

export interface AppStatistics {
  yesterdayDownloadCount: number
  totalDownloadCount: number
  yesterdayAppGetStrategyCount: number
  totalAppGetStrategyCount: number
  yesterdayAppUpgradeCount: number
  totalAppUpgradeCount: number
  yesterdayAppStartCount: number
  totalAppStartCount: number
  downloadCount7Day: DailyDataPoint[]
  appGetStrategyCount7Day: DailyDataPoint[]
  appUpgradeCount7Day: DailyDataPoint[]
  appStartCount7Day: DailyDataPoint[]
  // GitHub stats
  githubStars?: number
  githubWatchers?: number
  githubForks?: number
  githubDownloads?: number
}

export interface ApiResponse<T> {
  code: number;
  msg: string;
  traceId: string;
  docs: string;
  data: T;
}

export interface ErrorResponse {
  code: number;
  msg: string;
  traceId?: string;
  docs?: string;
}
