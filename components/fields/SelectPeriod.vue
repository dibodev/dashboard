<template>
    <select
        v-model="selectedPeriodFilter"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        @change="changePeriod"
    >
        <option
            v-for="filter in periodFilters"
            :key="filter.value"
            :value="filter.value"
        >
            {{ filter.name }}
        </option>
    </select>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAnalyticsRouterStore } from '~/stores/analytics.router.store'

const router = useRouter()
const store = useAnalyticsRouterStore()

const route = useRoute()
const domain = computed(() => route.params.domain)

// state
const periodFilters = store.periodFilters
const selectedPeriodFilter = ref(store.activePeriodFilter.value)

watch(selectedPeriodFilter, (newFilterValue) => {
  const selectedFilter = periodFilters.find(filter => filter.value === newFilterValue)
  if (!selectedFilter) { return }
  store.setActivePeriodFilter(selectedFilter, domain.value.toString())
})

const changePeriod = () => {
  router.push({ query: { period: selectedPeriodFilter.value } })
}
</script>

<style scoped>
</style>
