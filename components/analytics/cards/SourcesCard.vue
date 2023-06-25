<template>
  <StatsCard
    :steps="steps">
    <template #sources>
      <StatsListElement
        v-for="source in sources[0].data"
        :key="source.name"
        :title="source.name"
        :value="source.visitors"
        :icon="`https://plausible.io/favicon/sources/${source.name}`"
        :percentage="source.percentage"
        :greatest-nb-of-visitors="sourcesGreatestNbOfVisitors"
      />
    </template>
  </StatsCard>
</template>
<script lang="ts" setup>
import sourcesJson from '../datas/sources.json'
import StatsCard from '~/components/analytics/StatsCard.vue'
import StatsListElement from '~/components/analytics/ui/StatsListElement.vue'

interface JSONData {
  name: string
  visitors: number
  percentage?: number
}

const sources: {data: JSONData[]}[] = [
  {
    data: sourcesJson
  }
]

const steps = [
  {
    title: 'Top Sources',
    labelItems: 'Source',
    labelValues: 'Visitors',
    slotName: 'sources'
  }
]

/* COMPUTED */
// TODO: mettre greatestNbOfVisitors dans le json
const sourcesGreatestNbOfVisitors = computed(() => {
  return Math.max(...sources[0].data.map(browser => browser.visitors))
})
</script>
