<template>
    <div class="relative px-4 md:px-6 w-1/2 my-4 lg:w-auto group select-none cursor-pointer border-r">
        <div>
            <div class="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-500 whitespace-nowrap flex w-content border-b group-hover:text-indigo-700 dark:group-hover:text-indigo-500 border-transparent">
                {{ props.topStats.name }}
            </div>
            <div class="my-1 space-y-2">
                <div class="flex items-center justify-between whitespace-nowrap">
                    <p id="visitors" class="font-bold text-xl dark:text-gray-100">
                        {{ props.topStats.value }}
                    </p>
                    <span class="text-xs dark:text-gray-100">
                        <span class="text-green-500 font-bold">
                            ↑
                        </span>
                        {{ props.topStats.change }}%
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { TopStats } from '~/models/AnalyticsModel'

const props = defineProps({
  topStats: {
    type: Object as PropType<TopStats>,
    required: true
  }
})
</script>
