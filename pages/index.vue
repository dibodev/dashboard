<template>
    <div>
        <div class="flex items-center justify-end">
            <div class="flex flex-col gap-3">
                <DButton to="/analytics/new">
                    Ajouter un domaine
                </DButton>
            </div>
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
import DomainCard from '~/components/cards/DomainCard.vue'
import { useAnalyticsProjectStore } from '~/stores/analytics-project.store'
import DButton from '~/components/ui/DButton.vue'

useHead({
    title: 'Analytics'
})

useAnalyticsProjectStore().fetchProjects()
const projectsWithVisitorCount = computed(() => useAnalyticsProjectStore().projectsWithVisitorCount)
</script>
