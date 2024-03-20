import { defineStore } from 'pinia'
import { useAppStore } from '#stores/app.store'
import AnalyticsModel from '#models/AnalyticsModel'
import type { TopStats } from '#models/AnalyticsModel'
import AnalyticsService from '#services/AnalyticsService'
import { useAnalyticsRouterStore } from '#stores/analytics.router.store'

export const useAnalyticsStore = defineStore('analyticsStore', {
  state: () => ({
    _analytics: {} as AnalyticsModel
  }),
  actions: {
    setAnalytics (analytics: AnalyticsModel): void {
      this._analytics = analytics
    },
    async fetchAnalytics (domain: string | null): Promise<AnalyticsModel> {
      if (!domain) { return {} as AnalyticsModel }
      useAppStore().setPending(true)
      const period = useAnalyticsRouterStore().activePeriodFilter.value
      const res = await AnalyticsService.getAll(domain, period)
      this.setAnalytics(res)
      useAppStore().setPending(false)
      return res
    }
  },
  getters: {
    analytics: (state): AnalyticsModel => state._analytics,
    topStats: (state): TopStats[] => state._analytics.topStats
  }
})
