<template>
    <DropDown
        v-if="items?.length"
        :items="items"
        @click="onClickItem"
    />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import AnalyticsProjectModel from '~/models/AnalyticsProjectModel'
import DropDown from '~/components/fields/DropDown.vue'
import type { DropDownItem } from '~/components/fields/DropDown.vue'

/* PROPS */
const props = defineProps({
    projects: {
        type: Array as PropType<Array<AnalyticsProjectModel>>,
        required: true
    }
})

/* DATAS */
const allProjectsItem: DropDownItem = {
    text: 'Tous les projets'
}

/* COMPUTED */
const items = computed(() => {
    if (!props.projects) {
        return null
    }
    const res: Array<DropDownItem> = [
        allProjectsItem
    ]
    props.projects.forEach((project) => {
        res.push({
            text: project.domain,
            image: project.favicon
        })
    })
    return res
})

/* EMITS */
const emit = defineEmits <{(e: 'click', domain: string | null): void }>()

/* METHODS */
const onClickItem = (item: DropDownItem) => {
    const domain = item.text === allProjectsItem.text ? null : item.text
    emit('click', domain)
}
</script>
