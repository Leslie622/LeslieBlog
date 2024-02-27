<template>
  <div class="home">
    <div class="home__content">
      <div class="content__logo">
        <div class="logo-light" v-if="commonStore.theme === Theme.Dark">Leslie</div>
        <div class="logo-dark" v-else>Leslie</div>
      </div>
      <div class="content__nav">
        <router-link v-for="item in linkList" :key="item.path" :to="item.path" class="item">
          {{ item.name }}
        </router-link>
      </div>
    </div>
    <theme-switch class="theme-switch" width="1.8rem"></theme-switch>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/modules/common'
import { Theme } from '@/stores/modules/common'
const commonStore = useCommonStore()
const linkList = [
  { path: '/blog', name: 'BLOG' },
  { path: '/diary', name: 'DIARY' }
]
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-image: var(--home-backgorund);
  user-select: none;
}

.content__logo {
  position: relative;
  display: inline-block;
  font-family: Monoton-Regular;
  font-size: 7rem;

  .logo-light {
    color: #fff;
  }

  .logo-dark {
    color: black;
  }

  .logo-light,
  .logo-dark {
    overflow: hidden;
    animation: logoAnimate 0.5s forwards;
  }

  @keyframes logoAnimate {
    0% {
      z-index: 1;
      width: 0;
    }
    100% {
      z-index: 1;
      width: 100%;
    }
  }
}

.content__nav {
  margin: 0.5rem 0rem;

  .item {
    padding: 1rem;
    font-size: 1.3rem;
    color: #249ffd;
    transition: opacity 0.3s;
    text-decoration: none;

    &:hover {
      opacity: 0.5;
    }
  }
}

.theme-switch {
  padding: 1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

/**
 * ————————————————————响应式——————————————————————
 */

//窗口宽度小于1024px
@media screen and (max-width: 1024px) {
  .content__nav {
    .item {
      font-size: 1.55rem;
    }
  }
}
</style>
