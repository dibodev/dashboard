export type topStats = {
  name: string
  value: number
  comparison_value?: number
  change?: number
}
export default class AnalyticsModel {
  topStats: topStats[] = []

  constructor (analytics: AnalyticsModel) {
    this.topStats = analytics.topStats
  }
}
