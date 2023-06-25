<template>
    <div id="application-sidebar"
         :class="{'-translate-x-full': !props.open}"
         class="transition-all duration-300 transform w-full
    fixed top-0 left-0 bottom-0 z-[60] sm:w-64 bg-white border-r border-gray-200 pt-7
    pb-10 overflow-y-auto scrollbar-y block lg:translate-x-0 lg:right-auto
    lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">
        <button
            class="sm:hidden bg-gray-100 hover:bg-gray-200 dark:bg-gray-900
            dark:hover:bg-gray-700 p-2 rounded-md absolute right-6 top-4"
            @click="emit('update:open', false)">
            <nuxt-icon name="x" filled />
        </button>
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
                        <nuxt-icon :name="link.icon" class="sidebar-icon" filled/>
                        {{ link.name }}
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
    <div v-if="props.open"
         class="lg:hidden transition duration fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 hs-overlay-backdrop"
         @click="emit('update:open', false)"/>
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

/* PROPS */
const props = defineProps({
    open: {
        type: Boolean,
        required: true
    }
})

/* EMIT */
const emit = defineEmits(['update:open'])
</script>

<style>
.sidebar-icon svg {
    width: 16px;
    height: 16px;
}
</style>
