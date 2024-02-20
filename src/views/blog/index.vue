<template>
  <div class="wrapper">
    <div class="content">
      <header class="header" :class="{ 'header-active': headerActive }">
        <div class="header-inner">
          <div class="block">
            <div class="switch">
              <div class="switch-btn" @click="headerSwitch">
                <div>
                  <span class="Switchicon"></span>
                  <span class="Switchicon"></span>
                  <span class="Switchicon"></span>
                </div>
              </div>
              <div class="brand">
                <p>LESLIE BLOG</p>
              </div>
            </div>
          </div>
          <div class="block"></div>
        </div>
      </header>
      <div class="blog">
        <router-view class="publicWrapper" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const headerActive = ref(false)
function headerSwitch() {
  headerActive.value = !headerActive.value
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  background-color: #eee;
  overflow: hidden;
}

.content {
  margin: 0 auto;
  width: 1200px; //版心
}

.header {
  position: sticky;
  top: 0;
  z-index: 1;
  height: 0;

  .header-inner {
    width: 240px;
    font-size: 12px;

    //组块
    .block {
      height: 200px;
      margin-bottom: 10px;
      background-color: white;
    }

    .switch {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 130px;
      color: #fff;
      background-color: #222;

      .switch-btn {
        position: absolute;
        display: none;
        align-items: center;
        justify-content: center;
        left: 20px;
        width: 40px;
        height: 40px;
        cursor: pointer;

        .Switchicon {
          display: block;
          padding: 3px 0;
          transition: transform 0.2s ease;
        }

        .Switchicon::before {
          content: '';
          display: block;
          width: 28px;
          height: 2px;
          border-radius: 2px;
          background-color: #fff;
          transition:
            transform 0.2s ease 0.1s,
            background-color 0.3s ease;
        }
      }

      .brand {
        font-family: Arial;
        font-size: 1.3rem;
      }
    }
  }
}

.header.header-active {
  // 这里的高度需要大于头部内容总高度，从而通过max-height实现不定高过渡动画
  max-height: 500px;
  // switch的动画
  .Switchicon:nth-child(1) {
    transform: translateY(8px);
  }
  .Switchicon:nth-child(1)::before {
    transform: rotate(45deg);
  }
  .Switchicon:nth-child(2) {
    opacity: 0;
    transition: none;
  }
  .Switchicon:nth-child(3) {
    transform: translateY(-8px);
  }
  .Switchicon:nth-child(3)::before {
    transform: rotate(-45deg);
  }
}

.blog {
  margin-left: 240px;
}

.publicWrapper {
  box-sizing: border-box;
  padding: 0 10px 10px;
  max-height: 100vh;
  overflow: auto;
}

// ========响应式========

//窗口宽度小于1024px：版心缩小
@media screen and (max-width: 1024px) {
  .content {
    width: 1024px;
  }
}

//窗口宽度小于1000时：版心100%
@media screen and (max-width: 1000px) {
  .content {
    width: 100%;
  }

  .header {
    height: auto;
    max-height: 80px;
    overflow: hidden;
    transition: max-height 0.4s;

    .header-inner {
      width: 100%;
      border-bottom: 2px solid rgb(228, 228, 228);

      .block {
        margin-bottom: 0;
        box-shadow: none;
      }

      .switch {
        height: 80px;
        .switch-btn {
          display: flex;
        }
      }
    }
  }

  .blog {
    margin-left: 0;
  }

  .publicWrapper {
    padding: 0.5rem;
    max-height: calc(100vh - 80px);
  }
}
</style>
