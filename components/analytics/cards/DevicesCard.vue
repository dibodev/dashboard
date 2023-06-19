<template>
  <StatsCard
    :steps="steps">
    <template #browser>
      <StatsListElement
        v-for="browser in devices[0].data"
        :key="browser.name"
        :title="browser.name"
        :value="browser.visitors"
        :percentage="browser.percentage"
      />
    </template>
    <template #os>
      <StatsListElement
        v-for="os in devices[1].data"
        :key="os.name"
        :title="os.name"
        :value="os.visitors"
        :percentage="os.percentage"
      />
    </template>
    <template #size>
      <StatsListElement
        v-for="screenSize in devices[2].data"
        :key="screenSize.name"
        :title="screenSize.name"
        :value="screenSize.visitors"
        :percentage="screenSize.percentage"
      />
    </template>
  </StatsCard>
</template>
<script setup>
import browsersJson from '../datas/browsers.json'
import osJson from '../datas/operating-systems.json'
import screenSizesJson from '../datas/screen-sizes.json'
import StatsCard from '~/components/analytics/StatsCard.vue'
import StatsListElement from '~/components/analytics/ui/StatsListElement.vue'
const devices = [
  {
    name: 'Browser',
    data: browsersJson
  },
  {
    name: 'OS',
    data: osJson
  },
  {
    name: 'Size',
    data: screenSizesJson
  }
]

const steps = [
  {
    name: 'browser',
    slotName: 'browser'
  },
  {
    name: 'os',
    slotName: 'os'
  },
  {
    name: 'size',
    slotName: 'size'
  }
]

</script>
