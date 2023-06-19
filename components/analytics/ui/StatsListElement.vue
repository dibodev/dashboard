<template>
  <div class="flex items-center justify-between my-1 text-sm">
    <div class="w-full relative" style="max-width: calc(100% - 5rem);">
      <div class="absolute top-0 left-0 h-full bg-blue-50 dark:bg-gray-600 dark:bg-opacity-15"
           :style="`width: ${props.percentage}%`"
      />
      <span class="flex px-2 py-1.5 dark:text-gray-300 relative z-9 break-all">
        <a class="md:truncate block hover:underline" href="/?period=30d&amp;source=Direct+%2F+None">
          <img v-if="props.icon" :src="props.icon" :alt="props.title" class="inline w-4 h-4 mr-2 -mt-px align-middle">
          {{ props.title }}
        </a>
      </span>
    </div>
    <span class="font-medium dark:text-gray-200 w-20 text-right" tooltip="100467">{{ formatValue }}</span>
</div>
</template>

<script lang="ts" setup>
import { formatLargeNumber } from '~/tools/number-tools'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    required: false
  },
  percentage: {
    type: Number,
    default: 0
  }
})

const formatValue = formatLargeNumber(props.value ?? 0)
</script>
