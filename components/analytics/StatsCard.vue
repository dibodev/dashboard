<template>
    <div class="relative p-4 rounded shadow-xl stats-item flex flex-col mt-6 w-full bg-white dark:bg-gray-700">
        <div class="flex flex-col flex-grow">
            <div class="flex justify-between w-full items-center">
                <h3 v-if="activeStep" class="font-bold dark:text-gray-100 text-base">
                    {{ activeStep.title }}
                </h3>
                <div v-if="activeStepName" class="flex font-medium text-xs items-center text-gray-500 dark:text-gray-400 space-x-2">
                    <template v-for="step in props.steps">
                        <button
                            v-if="step.tabName"
                            :key="step.tabName"
                            :class="step.tabName === props.activeStepName ? 'inline-block h-5 text-indigo-700 dark:text-indigo-500 font-bold underline decoration-2' : 'hover:text-indigo-600'"
                            @click="changeStep(step.tabName)">
                            {{ step.tabName }}
                        </button>
                    </template>
                </div>
            </div>
            <div v-if="activeStep" class="flex flex-col flex-grow fade-enter-active">
                <div v-if="activeStep.labelItems && activeStep.labelValues" class="flex items-center justify-between mt-3 mb-2 text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400">
                    <span v-if="activeStep.labelItems">{{ activeStep.labelItems }}</span>
                    <span v-if="activeStep.labelValues" class="text-right">
                  <span class="inline-block w-30">{{ activeStep.labelValues }}</span>
              </span>
                </div>
                <slot :name="activeStep.slotName"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType, ComputedRef } from 'vue'

type Step = {
    title: string
    labelItems?: string
    labelValues?: string
    slotName: string
    tabName?: string
}

const props = defineProps({
  steps: {
    type: Array as PropType<Step[]>,
    required: true
  },
  activeStepName: {
    type: String,
    required: false,
    default: null
  }
})

/* COMPUTED */
const activeStep: ComputedRef<Step | undefined> = computed(() => {
  if (!props.steps) { return undefined }
  return props.steps.find(step => step.tabName === props.activeStepName) || props.steps[0]
})

/* EMITS */
const emit = defineEmits<{
  'change-step': [stepTabName: string]
}>()
/* METHODS */
const changeStep = (stepTabName: string) => {
  emit('change-step', stepTabName)
}
</script>
