<template>
    <MetaBaseLayout>
        <div class="min-h-screen h-screen flex flex-col">
            <!-- Sidebar Toggle -->
            <Navbar @update:open="openSidebar = !openSidebar"/>
            <SideBar
                    v-model:open="openSidebar"
                    @update:open="openSidebar = $event"
            />
            <!-- Content -->
            <main class="flex flex-1">
                <div class="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ml-64 relative">
                    <div v-if="useAppStore().pending" class="absolute top-1/2 left-1/2">
                        <Spinner/>
                    </div>

                    <div v-show="!useAppStore().pending">
                        <slot />
                    </div>
                </div>
            </main>
        </div>
    </MetaBaseLayout>
</template>
<script setup lang="ts">
import Navbar from '~/components/navigations/Navbar.vue'
import SideBar from '~/components/navigations/SideBar.vue'
import MetaBaseLayout from '~/layouts/MetaBaseLayout.vue'
import { useAppStore } from '~/stores/app.store'
import Spinner from '~/components/ui/Spinner.vue'

/* REFS */
const openSidebar = ref(false)

onMounted(() => {
    useAppStore().setPending(false)
})
</script>
