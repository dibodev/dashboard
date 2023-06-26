<template>
  <label
    class="relative h-8 w-14 cursor-pointer block"
    for="AcceptConditions"
  >
    <input
      id="AcceptConditions"
      :value="props.value"
      type="checkbox"
      class="peer sr-only"
      @change="emit('update:value', !props.value)"
    >

    <span
      :class="{'bg-gray-300': !props.value, 'bg-green-500': props.value}"
      class="absolute inset-0 rounded-full transition"
    />

    <span
      :class="{'start-0': !props.value, 'start-6': props.value}"
      class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all"
    />
  </label>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: Boolean,
    required: true
  }
})

/* EMIT */
const emit = defineEmits(['update:value'])
</script>
