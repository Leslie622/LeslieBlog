<template>
  <div class="app" :class="theme">
    <theme-switch></theme-switch>
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/modules/common'
const commonStore = useCommonStore()
const route = useRoute()

const isTransition = ref<boolean>(false) //初始不开启动画
const transitionName = ref<string>() //过渡动画名
const lastPath = ref<string>()
//主题
const theme = computed(() => {
  return commonStore.theme
})

/**
 * 根据路由变化应用过渡动画
 */
watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log('1')

    //处理边界情况（因为重定向路由为 "/"）
    if (oldPath === '/') {
      oldPath = '/home'
    }
    //初始不启用动画
    if (isTransition.value) {
      //如果要进入的页面是上个页面，则应用回退动画
      if (newPath === lastPath.value) {
        console.log('回退')

        transitionName.value = 'slide-left'
      } else {
        console.log('前进')
        transitionName.value = 'slide-right'
      }
    }
    //记录上个页面
    lastPath.value = oldPath
    //开启动画
    isTransition.value = true
  }
)
</script>

<style>
body {
  /* 避免动画过程中出现水平方向的滚动条 */
  overflow: hidden;
  user-select: none;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: absolute;
  transition: transform 0.5s;
}

.slide-right-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}

.slide-right-leave-to,
.slide-left-enter-from {
  transform: translateX(-100%);
}
</style>
