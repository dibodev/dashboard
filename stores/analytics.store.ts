import { defineStore } from 'pinia'
import { useAppStore } from '~/stores/app.store'
import AnalyticsModel from '~/models/AnalyticsModel'
import type { topStats } from '~/models/AnalyticsModel'
import AnalyticsService from '~/services/AnalyticsService'

export const useAnalyticsStore = defineStore('analyticsStore', {
  state: () => ({
    _analytics: {} as AnalyticsModel
  }),
  actions: {
    setAnalytics (analytics: AnalyticsModel): void {
      this._analytics = analytics
    },
    async fetchAnalytics (domain: string): Promise<AnalyticsModel> {
      useAppStore().setPending(true)
      const res = await AnalyticsService.getAll(domain)
      this.setAnalytics(res)
      useAppStore().setPending(false)
      return res
    }
  },
  getters: {
    analytics: (state): AnalyticsModel => state._analytics,
    topStats: (state): topStats[] => state._analytics.topStats
  }
})
