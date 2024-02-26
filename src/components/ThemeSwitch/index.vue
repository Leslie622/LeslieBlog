<template>
  <div class="switch-btn" @click="switchTheme">
    <Icon icon="line-md:lightbulb" v-if="commonStore.theme == Theme.Light" v-bind="$attrs"></Icon>
    <Icon icon="line-md:lightbulb-off" v-if="commonStore.theme == Theme.Dark" v-bind="$attrs"></Icon>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/modules/common'
import { Theme } from '@/stores/modules/common'
const commonStore = useCommonStore()

const html = ref<HTMLHtmlElement>()

onMounted(() => {
  html.value = document.querySelector('html')!
  changeHtmlThemeClass()
})

/**
 * 切换主题
 */
function switchTheme() {
  const currentTheme = commonStore.theme
  const newTheme = currentTheme === Theme.Light ? Theme.Dark : Theme.Light
  commonStore.theme = newTheme
  changeHtmlThemeClass()
  localStorage.setItem('theme', newTheme)
}

/**
 * switch html theme-calss
 */
function changeHtmlThemeClass() {
  if (commonStore.theme == Theme.Dark) {
    html.value!.className = 'dark'
  } else {
    html.value!.className = ''
  }
}
</script>

<style lang="scss" scoped>
.switch-btn {
  color: var(--theme-switch-color);
  transition: all 0.5s;
  cursor: pointer;
}
</style>
