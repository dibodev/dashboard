<template>
  <div class="relative">
    <NuxtLink :to="`/stats/${props.domain}`">
      <div class="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 group-hover:shadow-lg cursor-pointer">
        <div class="w-full flex items-center justify-between space-x-4">
          <img :src="favicon"
               :alt="`${props.domain} favicon`"
               class="w-4 h-4 flex-shrink-0 mt-px"
          >
          <div class="flex-1 -mt-px w-full">
            <h3 class="text-gray-900 text-lg truncate dark:text-gray-100">
{{ props.domain }}
</h3>
          </div>
        </div>
        <div class="pl-8 mt-2 flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm truncate">
                <span class="text-gray-800 dark:text-gray-200">
                  <span class="text-medium">1</span> visitor in last 24h
                </span>
              </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
/* PROPS */
const props = defineProps({
  domain: {
    type: String,
    required: true
  },
  favicon: {
    type: String as () => string | null,
    default: '/images/placeholder_favicon.ico',
    required: false
  }
})

/* COMPUTED */
const favicon = computed(() => {
  return props.favicon || '/images/placeholder_favicon.ico'
})
</script>
