<template>
    <div class="flex items-center justify-between my-1 text-sm font-normal">
        <div class="w-full relative" style="max-width: calc(100% - 6rem);">
            <div class="absolute top-0 left-0 h-full bg-blue-50 dark:bg-gray-500 dark:bg-opacity-15"
                 :style="`width: ${backgroundPercentage}%`"
            />
            <span class="flex px-2 py-1.5 dark:text-gray-300 relative z-9 break-all">
        <a class="md:truncate block hover:underline" href="/?period=30d&amp;source=Direct+%2F+None">
          <img v-if="props.icon" :src="props.icon" :alt="props.title" class="inline w-4 h-4 mr-2 -mt-px align-middle">
          <slot v-if="hasSlot('title')" name="title"/>
          <span v-else>{{ props.title }}</span>
        </a>
      </span>
        </div>
        <span class="dark:text-gray-200 w-20 text-right" data-tooltip="100467">
            {{ formatValue }} <span v-if="showPercentage">({{ percentage }}%)</span>
        </span>
    </div>
</template>

<script lang="ts" setup>
import { formatLargeNumber } from '~/tools/number-tools'

/* PROPS */
const props = defineProps({
    title: {
        type: String,
        required: false,
        default: ''
    },
    value: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
        required: false,
        default: null
    },
    percentage: {
        type: Number,
        default: undefined
    },
    greatestNbOfVisitors: {
        type: Number,
        default: 0
    }
})

/* SLOTS */
const slots = useSlots()

const hasSlot = (slotName: string) => {
    return !!slots[slotName]
}

const formatValue = formatLargeNumber(props.value ?? 0)

/* COMPUTED */
const backgroundPercentage = computed(() => {
    return (props.value / props.greatestNbOfVisitors) * 100
})

const showPercentage = computed(() => {
    return typeof props.percentage === 'number'
})
</script>
