<template>
    <div>
        <Html lang="fr" dir="ltr">
        <Head>
            <Title>{{ title }} | {{ app.name }}</Title>
        </Head>
        <Body class="bg-gray-50 dark:bg-slate-900">
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
        <!--        <main class="sm:ml-64 p-5">-->
        <!--          <slot />-->
        <!--        </main>-->
        </Body>
        </Html>
    </div>
</template>
<script setup lang="ts">
import Navbar from '~/components/navigations/Navbar.vue'
import SideBar from '~/components/navigations/SideBar.vue'

/* HOOKS */
const app = useAppConfig()

/* COMPUTED */
const title = computed(() => 'Accueil')

/* REFS */
const openSidebar = ref(false)
</script>
