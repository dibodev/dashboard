<template>
    <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden
    dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center py-4">
            <!-- Navigation Toggle -->
            <button
                    type="button"
                    class="text-slate-800 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-100"
                    @click="emit('update:open')">
                <span class="sr-only">Toggle Navigation</span>
                <nuxt-icon name="menu" filled class="menu-icon" size="32px" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:open'])
</script>

<style>
.menu-icon svg {
    width: 20px;
    height: 20px;
}
</style>
