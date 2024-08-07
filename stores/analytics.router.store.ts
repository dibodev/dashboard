import { defineStore } from 'pinia'
import { useAnalyticsStore } from '#stores/analytics.store'
import { useRouterStore } from '#stores/routerStore.store'
import AnalyticsSocketService from '#services/AnalyticsSocketService'

interface PeriodFilter {
    name: string
    value: string
}

const periodFilters: PeriodFilter[] = [
    {
        name: 'Today',
        value: 'day'
    },
    {
        name: 'Last 7 days',
        value: '7d'
    },
    {
        name: 'Last 30 days',
        value: '30d'
    },
    {
        name: 'Month to date',
        value: 'month'
    },
    {
        name: 'Last month',
        value: 'month'
    },
    {
        name: 'Year to date',
        value: 'year'
    },
    {
        name: 'Last 12 months',
        value: '12mo'
    },
    {
        name: 'All time',
        value: '12mo'
    }
]

export const useAnalyticsRouterStore = defineStore('analyticsRouterStore', {
    state: () => ({
        _activePeriodFilter: periodFilters[0] as PeriodFilter
    }),
    actions: {
        async setActivePeriodFilter (filter: PeriodFilter, domain: string) {
            this._activePeriodFilter = filter
            await useAnalyticsStore().fetchAnalytics(domain)
        },
        async setDomain (domain: string | null) {
            await useRouterStore().setQuery({ domain: domain ?? undefined })
            if (domain) {
                AnalyticsSocketService.join(domain)
            }
            await useAnalyticsStore().fetchAnalytics(domain)
        }
    },
    getters: {
        periodFilters: (): PeriodFilter[] => periodFilters,
        activePeriodFilter: (state): PeriodFilter => state._activePeriodFilter,
        domain: (): string | undefined => {
            return useRouterStore().query.domain?.toString()
        }
    }
})
