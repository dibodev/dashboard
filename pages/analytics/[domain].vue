<template>
  <div class="container">
    <h1>{{ domain }}</h1>
    <SelectPeriod/>
    <span class="inline-block">current visitors: {{ currentVisitors }}</span>
  </div>
</template>

<script lang="ts" setup>
import { io } from 'socket.io-client'
import SelectPeriod from '#components/fields/SelectPeriod.vue'

const route = useRoute()
const domain = computed(() => route.params.domain)
const currentVisitors = ref(0)
const socket = io(apiUrl)

socket.on('connect', () => {
  socket.emit('join', domain.value)
  socket.on('visitorCount', (count: number) => {
    currentVisitors.value = count
  })
})

useHead({
  title: 'Analytics ' + domain.value
})

</script>
