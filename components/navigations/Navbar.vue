<template>
    <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center py-4">
            <!-- Navigation Toggle -->
            <button
                    type="button"
                    class="text-gray-600 hover:text-gray-900">
                <span class="sr-only">Toggle Navigation</span>
                <nuxt-icon name="menu" filled class="menu-icon" size="32px" />
            </button>
        </div>
    </div>
</template>

<style>
.menu-icon svg {
    width: 20px;
    height: 20px;
}
</style>
