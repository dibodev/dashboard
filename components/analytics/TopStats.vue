<template>
  <div class="fade-enter-active">
    <div id="top-stats-container" class="flex flex-wrap">
        <template v-for="topStats in analyticsStore.topStats">
            <TopStatsElement
                v-if="topStats"
                :key="topStats.name"
                :top-stats="topStats"
            />
        </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TopStatsElement from '#components/analytics/TopStatsElement.vue'
import { useAnalyticsStore } from '#stores/analytics.store'

const route = useRoute()
const domain = computed(() => route.params.domain)

const analyticsStore = useAnalyticsStore()
await analyticsStore.fetchAnalytics(domain.value.toString())
</script>
