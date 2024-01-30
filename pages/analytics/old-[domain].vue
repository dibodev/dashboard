<template>
    <div class="container">
        <h1>{{ domain }}</h1>
        <SelectPeriod/>
        <div class="block ml-1 md:ml-2 mr-auto text-xs md:text-sm font-bold text-gray-500 dark:text-gray-300">
            <PulsatingCircle/>
            {{ currentVisitors }} <span class="inline-block">current visitors</span>
            <div class="relative w-full mt-2 rounded shadow-xl bg-white dark:bg-gray-700">
                <TopStats/>
                <VisitorsLineChart/>
            </div>
            <div class="grid lg:grid-cols-2 gap-3">
                <LocationsCard/>
                <DevicesCard/>
            </div>
            <div class="grid lg:grid-cols-2 gap-3">
                <PagesCard/>
                <SourcesCard/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { io } from 'socket.io-client'
import PulsatingCircle from '~/components/ui/PulsatingCircle.vue'
import TopStats from '~/components/analytics/TopStats.vue'
import SelectPeriod from '~/components/fields/SelectPeriod.vue'
import DevicesCard from '~/components/analytics/cards/DevicesCard.vue'
import VisitorsLineChart from '~/components/charts/VisitorsLineChart/VisitorsLineChart.vue'
import SourcesCard from '~/components/analytics/cards/SourcesCard.vue'
import PagesCard from '~/components/analytics/cards/PagesCard.vue'
import LocationsCard from '~/components/analytics/cards/LocationsCard.vue'

const route = useRoute()
const domain = computed(() => route.params.domain)
const currentVisitors = ref(0)
const socket = io(apiUrl)

socket.on('connect', () => {
    socket.emit('join', domain.value)
    socket.on('visitorCount', (count: number) => {
        currentVisitors.value = count
    })
})

useHead({
    title: 'Analytics ' + domain.value
})

</script>
