<template>
    <StatsCard
            :active-step-name="activeStep"
            :steps="steps"
            @change-step="activeStep = $event">
        <template #map>
            <DataMap :countries="locationJson"/>
        </template>
        <template #countries>
            <StatsListElement
                    v-for="country in locations[0].data"
                    :key="country.name"
                    :value="country.visitors"
                    :greatest-nb-of-visitors="countryGreatestNbOfVisitors">
                <template #title>
                    <span v-if="country.flag" class="mr-2">{{ country.flag }}</span>
                    <span>{{ country.name }}</span>
                </template>
            </StatsListElement>
        </template>
        <template #regions>
            <StatsListElement
                    v-for="region in locations[1].data"
                    :key="region.name"
                    :value="region.visitors"
                    :greatest-nb-of-visitors="regionGreatestNbOfVisitors">
                <template #title>
                    <span v-if="region.flag" class="mr-2">{{ region.flag }}</span>
                    <span>{{ region.name }}</span>
                </template>
            </StatsListElement>
        </template>
        <template #cities>
            <StatsListElement
                    v-for="city in locations[2].data"
                    :key="city.name"
                    :value="city.visitors"
                    :greatest-nb-of-visitors="citySizeGreatestNbOfVisitors">
                <template #title>
                    <span v-if="city.flag" class="mr-2">{{ city.flag }}</span>
                    <span>{{ city.name }}</span>
                </template>
            </StatsListElement>
        </template>
    </StatsCard>
</template>
<script lang="ts" setup>
import countriesJson from '../datas/countries.json'
import regionsJson from '../datas/regions.json'
import citiesJson from '../datas/cities.json'
import locationJson from '~/components/analytics/datas/locations.json'
import StatsCard from '~/components/analytics/StatsCard.vue'
import StatsListElement from '~/components/analytics/ui/StatsListElement.vue'
import DataMap from '~/components/maps/DataMap.vue'
interface JSONData {
    name: string
    visitors: number
    flag?: string
    code?: string | number
    percentage?: number
    alpha_3?: string
}

const locations: { data: JSONData[] }[] = [
    {
        data: countriesJson
    },
    {
        data: regionsJson
    },
    {
        data: citiesJson
    }
]

const steps = [
    {
        title: 'Locations',
        tabName: 'Map',
        slotName: 'map'
    },
    {
        title: 'Countries',
        tabName: 'Countries',
        labelItems: 'Country',
        labelValues: 'Visitors',
        slotName: 'countries'
    },
    {
        title: 'Regions',
        tabName: 'Regions',
        labelItems: 'Region',
        labelValues: 'Visitors',
        slotName: 'regions'
    },
    {
        title: 'Cities',
        tabName: 'Cities',
        labelItems: 'City',
        labelValues: 'Visitors',
        slotName: 'cities'
    }
]
/* REFS */
const activeStep = ref(steps[0].tabName)

/* COMPUTED */
// TODO: mettre greatestNbOfVisitors dans le json
const countryGreatestNbOfVisitors = computed(() => {
    return Math.max(...locations[0].data.map(country => country.visitors))
})

const regionGreatestNbOfVisitors = computed(() => {
    return Math.max(...locations[1].data.map(region => region.visitors))
})

const citySizeGreatestNbOfVisitors = computed(() => {
    return Math.max(...locations[2].data.map(city => city.visitors))
})
</script>
