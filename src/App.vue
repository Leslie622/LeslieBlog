<template>
  <div class="app" :class="theme">
    <theme-switch></theme-switch>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/modules/common'

const commonStore = useCommonStore()
const theme = computed(() => {
  return commonStore.theme
})
</script>

<style scoped></style>
