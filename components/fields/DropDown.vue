<template>
    <div ref="dropdown" class="relative inline-flex">
        <button
                type="button"
                class="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 font-medium
            bg-light-gray-500 shadow-sm align-middle border-transparent
            transition-all text-sm dark:bg-gray-600 dark:hover:border-gray-300 dark:active:border-gray-300"
                @click="isOpen = !isOpen">
            <img
                    v-if="activeItem?.image"
                    class="w-4 h-4"
                    :src="activeItem.image"
                    :alt="activeItem.text">
            {{ activeItem?.text }}
            <nuxt-icon
                    name="chevron-down"
                    :class="{'rotate-180': isOpen}"
                    class="chevron-down-icon transform transition-transform"
                    filled/>
        </button>

        <transition name="slide-fade">
            <div
                    v-show="isOpen"
                    class="translate-y-12 mt-1 transition-all duration-[200ms] ease-in-out min-w-[15rem] bg-white shadow-md
                rounded-md p-2 divide-y divide-gray-200 dark:bg-gray-700 dark:border dark:border-gray-700
                dark:divide-gray-700 fixed">
                <div class="py-2 first:pt-0 last:pb-0 space-y-1">
                    <component
                            :is="itemsTag"
                            v-for="item in items"
                            :key="item.text"
                            :to="item.to"
                            :class="(activeItem ? activeItem.text === item.text : false)
                        ? 'bg-violet-500 hover:bg-violet-800 dark:bg-violet-400 hover:dark:bg-violet-600'
                        : 'hover:bg-gray-100 hover:dark:bg-gray-600 active:text-slate-700 active:dark:text-gray-200'"
                            class="flex items-center gap-x-2 py-2 px-3 rounded-md text-sm
                    transition-none cursor-pointer"
                            @click="onClickItem(item)">
                        <img
                                v-if="item.image"
                                class="w-4 h-4"
                                :src="item.image"
                                :alt="item.text">
                        {{ item.text }}
                    </component>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType, Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export type DropDownItem = {
    text: string;
    image?: string | null;
    to?: string | null;
}
/* PROPS */
const props = defineProps({
    items: {
        type: Array as PropType<DropDownItem[]>,
        required: true
    }
})
/* REFS */
const dropdown = ref(null)
const isOpen = ref(false)
const activeItem: Ref<DropDownItem | null> = ref(props.items ? props.items[0] : null)

/* COMPUTED */
const itemsTag = computed(() => {
    if (props.items) {
        return props.items[0].to ? 'RouterLink' : 'div'
    }
    return 'div'
})

/* HOOKS */
onClickOutside(dropdown, () => {
    isOpen.value = false
})

/* EMITS */
const emit = defineEmits<{
    (e: 'click', item: DropDownItem): void
}>()

/* METHODS */
const onClickItem = (item: DropDownItem) => {
    activeItem.value = item
    isOpen.value = false
    emit('click', item)
}
</script>

<style lang="scss">
.chevron-down-icon svg {
  width: 16px;
  height: 16px;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(60px);
}

.slide-fade-enter-to, .slide-fade-leave-from {
  opacity: 1;
}
</style>
