<template>
  <h1>{{ domain }}</h1>
  <div class="block ml-1 md:ml-2 mr-auto text-xs md:text-sm font-bold text-gray-500 dark:text-gray-300">
    <PulsatingCircle/>
    47 <span class="hidden sm:inline-block">current visitors</span>
</div>
</template>

<script lang="ts" setup>
import PulsatingCircle from '~/components/ui/PulsatingCircle.vue'

const route = useRoute()
const domain = computed(() => route.params.domain)
</script>
