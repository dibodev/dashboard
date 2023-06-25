<template>
    <div id="application-sidebar" class="-translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">
        <div class="px-6">
            <NuxtLink class="flex-none text-xl font-semibold dark:text-white" to="/">
                Brand
            </NuxtLink>
        </div>

        <nav class="p-6 w-full flex flex-col flex-wrap">
            <ul class="space-y-1.5">
                <li v-for="link in links" :key="link.name">
                    <NuxtLink
                        :to="link.to"
                        active-class="bg-gray-100 dark:bg-gray-900"
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm
                    text-slate-700 rounded-md hover:bg-gray-100 dark:text-white">
                        <nuxt-icon :name="link.icon" class="sidebar-icon" filled />
                        {{ link.name }}
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script lang="ts" setup>
/* DATA */
const links = [
    {
        name: 'Analytics',
        icon: 'pie-chart',
        to: '/'
    },
    {
        name: 'Toto',
        icon: 'settings',
        to: '/toto'
    },
    {
        name: 'Paramètres',
        icon: 'settings',
        to: '/settings'
    }
]

/* REFS */
// const open = ref(false)
</script>

<style>
.sidebar-icon svg {
    width: 16px;
    height: 16px;
}
</style>
