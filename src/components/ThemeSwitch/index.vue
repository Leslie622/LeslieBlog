<template>
  <div class="switch-btn" @click="switchTheme">
    <Icon width="1.6rem" :icon="themeIcons[commonStore.theme]" />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/modules/common'
import { Theme } from '@/stores/modules/common'
const commonStore = useCommonStore()

// 主题与图标的映射表
const themeIcons = {
  [Theme.Light]: 'material-symbols-light:lightbulb-outline-rounded',
  [Theme.Dark]: 'material-symbols-light:light-off-outline-rounded'
}

/**
 * 切换主题
 */
function switchTheme() {
  const currentTheme = commonStore.theme
  const newTheme = currentTheme === Theme.Light ? Theme.Dark : Theme.Light
  commonStore.theme = newTheme
  localStorage.setItem('theme', newTheme)
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
