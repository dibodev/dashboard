<template>
  <div>
    <div class="flex items-center justify-end">
      <NuxtLink role="button"
to="/analytics/new"
                class="inline-flex items-center justify-center px-5 py-3
        font-medium text-white bg-indigo-600 border border-transparent leading-6
        rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline
        transition duration-150 ease-in-out">
        Ajouter un domaine
      </NuxtLink>
    </div>

    <div v-if="projectsWithVisitorCount.length" class="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DomainCard
        v-for="project in projectsWithVisitorCount"
        :key="project.project.id"
        :domain="project.project.domain"
        :favicon="project.project.favicon"
        :active="project.project.active"
        :visitor-last24-hours="project.visitorLast24Hours"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { io } from 'socket.io-client'
import DomainCard from '~/components/cards/DomainCard.vue'
import { useAnalyticsProjectStore } from '~/stores/analytics-project.store'

// definePageMeta({
//   nuxtI18n: {
//     en: true,
//     fr: true
//   }
// })

useAnalyticsProjectStore().fetchProjects()
const projectsWithVisitorCount = computed(() => useAnalyticsProjectStore().projectsWithVisitorCount)

if (apiUrl) {
  const socket = io(apiUrl)

  socket.on('news', (news: { hello: string }) => {
    console.log(news)
  })
  socket.on('current-visitors', (visitors: number) => {
    console.log(visitors)
  })
}
</script>
