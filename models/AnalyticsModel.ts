export type TopStats = {
  name: string
  value: number
  comparison_value?: number
  change?: number
}
export default class AnalyticsModel {
  topStats: TopStats[] = []

  constructor (analytics: AnalyticsModel) {
    this.topStats = analytics.topStats
  }
}
