<template>
    <MetaBaseLayout>
        <!-- Sidebar Toggle -->
        <Navbar @update:open="openSidebar = !openSidebar"/>
        <SideBar
            v-model:open="openSidebar"
            @update:open="openSidebar = $event"
        />
        <!-- Content -->
        <main class="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">
            <slot />
        </main>
    </MetaBaseLayout>
</template>
<script setup lang="ts">
import Navbar from '~/components/navigations/Navbar.vue'
import SideBar from '~/components/navigations/SideBar.vue'
import MetaBaseLayout from '~/layouts/MetaBaseLayout.vue'

/* REFS */
const openSidebar = ref(false)
</script>
