<template>
  <div class="relative p-4 rounded shadow-xl stats-item flex flex-col mt-6 w-full bg-gray-700">
    <div class="flex flex-col flex-grow">
      <div class="flex justify-between w-full">
        <h3 class="font-bold dark:text-gray-100">
Top Pages
</h3>
        <div class="flex font-medium text-xs text-gray-500 dark:text-gray-400 space-x-2">
          <button
            v-for="step in steps"
            :key="step.name"
            :class="step.name === activeStep?.name ? 'inline-block h-5 text-indigo-700 dark:text-indigo-500 font-bold' : 'hover:text-indigo-600 cursor-pointer'"
            @click="activeStep = step">
            {{ step.name }}
          </button>
        </div>
      </div>
      <div class="flex flex-col flex-grow fade-enter-active">
        <slot v-if="activeStep" :name="activeStep.slotName"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, Ref } from 'vue'

type Step = {
  name: string
  slotName: string
}

const props = defineProps({
  steps: {
    type: Array as PropType<Step[]>,
    required: true
  }
})

const activeStep: Ref<Step | null> = ref(props.steps ? props.steps[0] : null)
</script>
