<template>
    <StatsCard
            :active-step-name="activeStep"
            :steps="steps"
            @change-step="activeStep = $event">
        <template #top-pages>
            <template v-for="topPage in devices[0].data">
                <StatsListElement
                   v-if="topPage.visitors"
                    :key="topPage.name"
                    :title="topPage.name"
                    :value="topPage.visitors"
                    :greatest-nb-of-visitors="topPagesGreatestNbOfVisitors"
                />
            </template>
        </template>
        <template #entry-pages>
            <template v-for="entryPage in devices[1].data">
                <StatsListElement
                    v-if="entryPage.unique_entrances"
                    :key="entryPage.name"
                    :title="entryPage.name"
                    :value="entryPage.unique_entrances"
                    :greatest-nb-of-visitors="entryPagesGreatestNbOfVisitors"
                />
            </template>
        </template>
        <template #exit-pages>
            <template v-for="exitPage in devices[2].data">
                <StatsListElement
                    v-if="exitPage.unique_exits"
                    :key="exitPage.name"
                    :title="exitPage.name"
                    :value="exitPage.unique_exits"
                    :greatest-nb-of-visitors="exitPagesGreatestNbOfVisitors"
                />
            </template>
        </template>
    </StatsCard>
</template>
<script lang="ts" setup>
import topPagesJson from '../datas/top-pages.json'
import entryPagesJson from '../datas/entry-pages.json'
import exitPagesJson from '../datas/exit-pages.json'
import StatsCard from '~/components/analytics/StatsCard.vue'
import StatsListElement from '~/components/analytics/ui/StatsListElement.vue'

interface JSONData {
    name: string
    visitors?: number
    percentage?: number
    unique_entrances?: number
    unique_exits?: number
}

const devices: { data: JSONData[] }[] = [
    {
        data: topPagesJson
    },
    {
        data: entryPagesJson
    },
    {
        data: exitPagesJson
    }
]

const steps = [
    {
        title: 'Top Pages',
        tabName: 'Top Pages',
        labelItems: 'Page',
        labelValues: 'Visitors',
        slotName: 'top-pages'
    },
    {
        title: 'Entry Pages',
        tabName: 'Entry Pages',
        labelItems: 'Entry page',
        labelValues: 'Unique Entrances',
        slotName: 'entry-pages'
    },
    {
        title: 'Exit Pages',
        tabName: 'Exit Pages',
        labelItems: 'Exit Page',
        labelValues: 'Unique Exits',
        slotName: 'exit-pages'
    }
]
/* REFS */
const activeStep = ref(steps[0].tabName)

/* COMPUTED */
// TODO: mettre greatestNbOfVisitors dans le json
const topPagesGreatestNbOfVisitors = computed(() => {
    return Math.max(...devices[0].data.map(browser => browser.visitors ?? 0))
})

const entryPagesGreatestNbOfVisitors = computed(() => {
    return Math.max(...devices[1].data.map(os => os.unique_entrances ?? 0))
})

const exitPagesGreatestNbOfVisitors = computed(() => {
    return Math.max(...devices[2].data.map(screenSize => screenSize.unique_exits ?? 0))
})
</script>
