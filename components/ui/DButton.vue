<template>
  <component :is="isLink ? 'RouterLink' : 'button'"
role="button"
             :to="isLink ? props.to : undefined"
             :disabled="props.disabled"
             :class="computedClass"
  >
    <span class="flex items-center">
      <span v-if="props.icon && props.iconPosition === 'left'" class="mr-2">
      <nuxt-icon :name="props.icon" filled />
    </span>
    <slot />
    <span v-if="props.icon && props.iconPosition === 'right'" class="ml-2">
      <nuxt-icon :name="props.icon" filled />
    </span>
    </span>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: null
  },
  iconPosition: {
    type: String,
    default: 'left'
  },
  size: {
    type: String,
    default: 'md'
  }
})

const isLink = computed(() => props.to !== null)

const buttonVariants = {
  primary: 'bg-indigo-600 hover:bg-indigo-500',
  red: 'bg-red-600 hover:bg-red-500',
  yellow: 'bg-yellow-600 hover:bg-yellow-500',
  green: 'bg-green-600 hover:bg-green-500'
}

const buttonSizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3',
  lg: 'px-6 py-4 text-lg'
}

const computedClass = computed(() => `
  inline-flex items-center justify-center
  ${buttonSizes[props.size]}
  font-medium text-white ${buttonVariants[props.variant]}
  border border-transparent leading-6 rounded-md
  focus:outline-none focus:shadow-outline transition duration-150 ease-in-out
  ${props.disabled ? 'opacity-70 cursor-not-allowed' : ''}
`)
</script>
