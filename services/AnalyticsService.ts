import BaseApiService from '~/services/BaseApiService'
import AnalyticsModel from '~/models/AnalyticsModel'

export default class AnalyticsService extends BaseApiService {
  static async getAll (domain: string): Promise<AnalyticsModel> {
    try {
      return await this.get(`/stats/${domain}`)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return { topStats: [] }
    }
  }
}
