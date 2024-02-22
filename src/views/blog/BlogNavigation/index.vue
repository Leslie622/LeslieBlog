<template>
  <div class="navigation">
    <div v-for="(item, index) in navItems" :key="index" :class="{ 'is-active': navigationActive === index }" @click="handleClick(index)">
      <router-link :to="item.path" class="navigation__item">
        <Icon :icon="item.icon" width="1.2rem" class="icon"></Icon>
        <Icon icon="system-uicons:check" width="1.5rem" class="active-icon"></Icon>
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  color: black;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    background-color: #f5f5f5;
  }

  &.router-link-active {
    .active-icon {
      display: block;
    }
  }

  .icon {
    padding: 0 1rem;
    position: relative;
    top: -1px;
  }

  .active-icon {
    display: none;
    position: absolute;
    right: 12%;
    animation: scale 0.3s forwards;
  }

  @keyframes scale {
    40% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
}

//窗口宽度小于1024px
@media screen and (max-width: 1024px) {
  .navigation {
    padding: 0 2rem;
  }
}
</style>
