<template>
    <div>
        <Html lang="fr" dir="ltr">
        <Head>
            <Title>{{ title }} | {{ app.name }}</Title>
        </Head>
        <Body class="bg-gray-50 dark:bg-slate-900">
        <!-- Sidebar Toggle -->
        <Navbar />
        <SideBar />
        <!-- Content -->
        <div class="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">
            <!-- Page Heading -->
            <header>
                <p class="mb-2 text-sm font-semibold text-blue-600">
                    Starter Pages & Examples
                </p>
            </header>
        </div>
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

</script>
