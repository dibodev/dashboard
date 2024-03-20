import BaseApiService from '#services/BaseApiService'
import AnalyticsModel from '#models/AnalyticsModel'

export default class AnalyticsService extends BaseApiService {
  static async getAll (domain: string, period?: string): Promise<AnalyticsModel> {
    try {
      const url = period ? `/stats/${domain}?period=${period}` : `/stats/${domain}`
      return await this.get(url)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return { topStats: [] }
    }
  }
}
