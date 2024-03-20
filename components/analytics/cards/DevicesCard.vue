<template>
  <StatsCard
    :active-step-name="activeStep"
    :steps="steps"
    @change-step="activeStep = $event">
    <template #browser>
      <StatsListElement
        v-for="browser in devices[0].data"
        :key="browser.name"
        :title="browser.name"
        :value="browser.visitors"
        :percentage="browser.percentage"
        :greatest-nb-of-visitors="browserGreatestNbOfVisitors"
      />
    </template>
    <template #os>
      <StatsListElement
        v-for="os in devices[1].data"
        :key="os.name"
        :title="os.name"
        :value="os.visitors"
        :percentage="os.percentage"
        :greatest-nb-of-visitors="osGreatestNbOfVisitors"
      />
    </template>
    <template #size>
      <StatsListElement
        v-for="screenSize in devices[2].data"
        :key="screenSize.name"
        :title="screenSize.name"
        :value="screenSize.visitors"
        :percentage="screenSize.percentage"
        :greatest-nb-of-visitors="screenSizeGreatestNbOfVisitors"
      />
    </template>
  </StatsCard>
</template>
<script lang="ts" setup>
import browsersJson from '../datas/browsers.json'
import osJson from '../datas/operating-systems.json'
import screenSizesJson from '../datas/screen-sizes.json'
import StatsCard from '#components/analytics/StatsCard.vue'
import StatsListElement from '#components/analytics/ui/StatsListElement.vue'

interface JSONData {
  name: string
  visitors: number
  percentage: number
}

const devices: {data: JSONData[]}[] = [
  {
    data: browsersJson
  },
  {
    data: osJson
  },
  {
    data: screenSizesJson
  }
]

const steps = [
  {
    title: 'Devices',
    tabName: 'Browser',
    labelItems: 'Browser',
    labelValues: 'Visitors',
    slotName: 'browser'
  },
  {
    title: 'Devices',
    tabName: 'OS',
    labelItems: 'Operating system',
    labelValues: 'Visitors',
    slotName: 'os'
  },
  {
    title: 'Devices',
    tabName: 'Size',
    labelItems: 'Screen size',
    labelValues: 'Visitors',
    slotName: 'size'
  }
]
/* REFS */
const activeStep = ref(steps[0].tabName)

/* COMPUTED */
// TODO: mettre greatestNbOfVisitors dans le json
const browserGreatestNbOfVisitors = computed(() => {
  return Math.max(...devices[0].data.map(browser => browser.visitors))
})

const osGreatestNbOfVisitors = computed(() => {
  return Math.max(...devices[1].data.map(os => os.visitors))
})

const screenSizeGreatestNbOfVisitors = computed(() => {
  return Math.max(...devices[2].data.map(screenSize => screenSize.visitors))
})
</script>
