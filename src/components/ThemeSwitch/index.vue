<template>
  <div class="switch-btn" @click="switchTheme">
    <Icon icon="material-symbols-light:light-off-outline-rounded" width="1.6rem" v-if="commonStore.theme === Theme.Dark"></Icon>
    <Icon icon="material-symbols-light:lightbulb-outline-rounded" width="1.6rem" v-else></Icon>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/modules/common'
import { Theme } from '@/stores/modules/common'
const commonStore = useCommonStore()

/* 暂时只有两种主题，采用简单赋值 */
function switchTheme() {
  if (commonStore.theme === Theme.Light) {
    commonStore.theme = Theme.Dark
    localStorage.setItem('theme', Theme.Dark)
  } else {
    commonStore.theme = Theme.Light
    localStorage.setItem('theme', Theme.Light)
  }
}
</script>

<style lang="scss" scoped>
.switch-btn {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  padding: 1rem;
  color: var(--base-color);
  transition: all 0.5s;
  cursor: pointer;
}
</style>
