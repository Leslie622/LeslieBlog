<template>
  <div class="blog">
    <div class="content">
      <header class="header" :class="{ 'header--active': headerActive }">
        <div class="header__inner">
          <div class="inner__block">
            <div class="reactive-header">
              <div class="switch" @click="headerActive = !headerActive">
                <div>
                  <span class="switch__icon"></span>
                  <span class="switch__icon"></span>
                  <span class="switch__icon"></span>
                </div>
              </div>
              <div class="logo">
                <p>LESLIE BLOG</p>
              </div>
            </div>
            <blog-config></blog-config>
            <blog-navigation></blog-navigation>
          </div>
          <div class="inner__block">
            <user-info></user-info>
          </div>
        </div>
      </header>
      <div class="router-view">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlogConfig from './BlogConfig/index.vue'
import BlogNavigation from './BlogNavigation/index.vue'
import UserInfo from './UserInfo/index.vue'
import emitter from '@/utils/mitt'

const headerActive = ref<boolean>(false)

/**
 * 监听：关闭header
 */
emitter.on('pullupHeader', () => {
  headerActive.value = false
})
</script>

<style lang="scss" scoped>
.blog {
  min-height: 100vh;
  background-color: var(--blog-backgorund);
  overflow: hidden;
}

.content {
  margin: 0 auto;
  //版心
  width: 1100px;
}

.header {
  position: sticky;
  top: 0;
  height: 0;

  /**
   * switch的动画：
   * 位移直接过渡，过渡时间为0.2s。
   * 旋转等待位移过渡完成，等待时间为0.2s 过渡时间为0.1s
   */
  &.header--active {
    // 这里的高度需要大于头部内容总高度，从而通过max-height实现不定高过渡动画
    max-height: 720px;

    .switch__icon:nth-child(1) {
      transform: translateY(8px);
      transition: transform 0.2s ease !important;
    }
    .switch__icon:nth-child(1)::before {
      transform: rotate(45deg);
      transition: transform 0.1s ease 0.2s !important;
    }
    .switch__icon:nth-child(2) {
      opacity: 0 !important;
    }
    .switch__icon:nth-child(3) {
      transform: translateY(-8px);
      transition: transform 0.2s ease !important;
    }
    .switch__icon:nth-child(3)::before {
      transform: rotate(-45deg);
      transition: transform 0.1s ease 0.2s !important;
    }
  }
}

.header__inner {
  width: 240px;
}

.inner__block {
  margin-bottom: 10px;
  padding-bottom: 5px;
  background-color: var(--blog-block-color);
  box-shadow: var(--boxShadow);
  transition:
    background-color 0.5s,
    box-shadow 0.5s;
}

.reactive-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  color: #fff;
  background-color: var(--logo-backgorund);
  transition: background-color 0.5s;

  .switch {
    position: absolute;
    display: none;

    left: 20px;
    width: 40px;
    height: 40px;
    cursor: pointer;

    .switch__icon {
      display: block;
      padding: 3px 0;
      transition: transform 0.2s ease 0.1s;
    }

    .switch__icon:nth-child(2) {
      opacity: 1;
      transition: opacity 0.2s ease 0.1s;
    }

    .switch__icon::before {
      content: '';
      display: block;
      width: 28px;
      height: 2px;
      border-radius: 2px;
      background-color: #fff;
      transition: transform 0.1s ease;
    }
  }
}

.logo {
  font-family: Arial;
  font-size: 1.3rem;
}

.router-view {
  margin-left: 240px;
}

/**
 * —————————————— 响应式 ——————————————
 */

//窗口宽度小于1100px
@media screen and (max-width: 1100px) {
  //版心缩小到1024px
  .content {
    width: 1024px;
  }
}

//窗口宽度小于1024px
@media screen and (max-width: 1024px) {
  //版心100%
  .content {
    width: 100%;
  }

  //header高度调整
  .header {
    height: auto;
    max-height: 80px;
    overflow: hidden;
    transition: max-height 0.5s;
  }

  .header__inner {
    width: 100%;
  }

  .inner__block {
    margin-bottom: 0;
    box-shadow: none;
  }

  .reactive-header {
    height: 80px;
    .switch {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .router-view {
    margin-left: 0;
  }
}
</style>
