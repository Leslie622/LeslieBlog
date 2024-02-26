<template>
  <div class="navigation">
    <div v-for="(item, index) in navItems" :key="index" :class="{ 'is-active': navigationActive === index }" @click="handleClick(index)">
      <router-link :to="item.path" class="navigation__item">
        <Icon :icon="item.icon" class="icon"></Icon>
        <Icon icon="system-uicons:check" class="active-icon" color="#C51E3A"></Icon>
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import emitter from '@/utils/mitt'

const navigationActive = ref()
const navItems = [
  { name: '主页', path: '/home', icon: 'system-uicons:home-alt' },
  { name: '博客', path: '/blog/article', icon: 'system-uicons:document-stack' },
  { name: '归档', path: '/blog/archive', icon: 'system-uicons:flip-view' }
]

/**
 * 导航点击处理函数
 */
function handleClick(index: number) {
  navigationActive.value = index
  //触发：关闭header
  emitter.emit('pullupHeader')
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: column;
}

.navigation__item {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 0.5rem;
  color: var(--blog-nav-color);
  font-size: 13px;
  text-decoration: none;
  &:hover {
    background-color: var(--blog-nav-hover-bg);
  }

  &.router-link-active {
    .active-icon {
      display: block;
    }
  }

  .icon {
    position: relative;
    top: -1px;
    padding: 0 0.8rem;
    font-size: 1.1rem;
  }

  .active-icon {
    display: none;
    position: absolute;
    right: 12%;
    font-size: 1.5rem;
    animation: scale 0.4s forwards;
  }

  @keyframes scale {
    40% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
}

/**
 * ——————————————————响应式——————————————————
 */

//窗口宽度小于1024px
@media screen and (max-width: 1024px) {
  .navigation {
    padding: 0 1rem;
    gap: 5px;

    .is-active {
      transition: border-width 0.2s ease-out;
      border-right: 6px solid #c51e3a;
      .navigation__item {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    }

    .navigation__item {
      border: 1px solid #e0e0e0;
      border-radius: 5px;

      .icon {
        font-size: 1.5rem;
      }

      .active-icon {
        font-size: 2.5rem;
      }
    }
  }
}
</style>
