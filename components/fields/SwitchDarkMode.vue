<template>
  <Switch v-if="themeLoaded" :value="isDark" @update:value="onThemeChange"/>
</template>

<script lang="ts" setup>
import Switch from '~/components/fields/Switch.vue'

const colorMode = useColorMode()
/* REFS */
const isDark = ref(colorMode.value === 'dark')
const themeLoaded = ref(colorMode.value !== 'system')

/* METHODS */
const onThemeChange = (value: boolean) => {
  isDark.value = value
  colorMode.preference = value ? 'dark' : 'light'
}
</script>
