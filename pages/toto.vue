<template>
  <div>
      currentDomain: {{ currentDomain }}
      <header class="flex flex-wrap items-center gap-6">
          <AnalyticsProjectsDropDown
                  :projects="projects"
                  @click="onClickProject"
          />
          <div class="flex items-center gap-2">
              <PulsatingCircle/>
              <span class="flex items-center gap-1 text-sm">
                  {{ currentVisitors }}
                  <span class="inline-block">
                      visiteurs en temps réel
                  </span>
              </span>
          </div>
      </header>
  </div>
</template>
<script lang="ts" setup>
import type { Ref } from 'vue'
import { useAnalyticsProjectStore } from '~/stores/analytics.project.store'
import AnalyticsProjectsDropDown from '~/components/analytics/fields/AnalyticsProjectsDropDown.vue'
import PulsatingCircle from '~/components/ui/PulsatingCircle.vue'
import AnalyticsSocketService from '~/services/AnalyticsSocketService'
import { useAnalyticsRouterStore } from '~/stores/analytics.router.store'

/* META */
useHead({
  title: 'Toto'
})

/* REFS */
const currentVisitors = ref(0)
const currentDomain: Ref<string | undefined> = ref(useAnalyticsRouterStore().domain)

if (typeof currentDomain.value === 'string') {
    AnalyticsSocketService.join(currentDomain.value)
}

AnalyticsSocketService.socket.on('visitorCount', (count: number) => {
    currentVisitors.value = count
})
/* METHODS */
const onClickProject = async (domain: string | null) => {
    await useAnalyticsRouterStore().setDomain(domain)
}

/* STORE */
useAnalyticsProjectStore().fetchProjects()

/* COMPUTED */
const projects = computed(() => useAnalyticsProjectStore().projects)
</script>
