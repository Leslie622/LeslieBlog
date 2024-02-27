<template>
  <div class="detail">
    <div class="header">
      <div class="header__inner">
        <div class="nav">
          <router-link v-for="item in linkList" :key="item.path" :to="item.path" class="nav__item">
            {{ item.name }}
          </router-link>
        </div>
        <theme-switch class="theme-switch" width="1.7rem"></theme-switch>
      </div>
    </div>
    <div class="content clearfix">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="title">
            <el-skeleton-item variant="h1" />
          </div>
          <div class="article" style="padding: 2rem">
            <el-skeleton :rows="10"></el-skeleton>
          </div>
        </template>
        <template #default>
          <div class="title">
            {{ blogInfo.title }}
          </div>
          <div class="article">
            <v-md-preview :text="blogInfo.content"></v-md-preview>
          </div>
        </template>
      </el-skeleton>
    </div>
    <back-top target=".detail"> </back-top>
  </div>
</template>

<script lang="ts">
export default {
  name: 'detail'
}
</script>
<script setup lang="ts">
import apiBlog from '@/api/modules/blog'

const loading = ref(true)
const route = useRoute()
const blogId = ref()
const blogInfo = ref<Blog.blogInfo>({
  id: '',
  title: '',
  abstract: '',
  cover: '',
  content: '',
  draft: '',
  category: '',
  author: '',
  views: 0,
  isSticky: false,
  isOriginal: false,
  createdAt: '',
  updatedAt: ''
})
const linkList = [
  { path: '/blog', name: 'BLOG' },
  { path: '/diary', name: 'DIARY' },
  { path: '/home', name: 'HOME' }
]

onMounted(() => {
  getSingleBlog()
})

/* 监听路由query变化,获取blogId */
watch(
  () => route.query.blogId,
  () => {
    blogId.value = route.query.blogId
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 获取博客数据
 */
async function getSingleBlog() {
  const res = await apiBlog.getSingleBlog({ blogId: blogId.value })
  blogInfo.value = res.data
  loading.value = false
}
</script>

<style lang="scss" scoped>
.detail {
  background-color: var(--detail-bg);
  position: relative;
  height: 100vh;
  overflow-y: auto;
}

.header {
  position: sticky;
  z-index: 999;
  top: 0;
  height: 60px;
  border-bottom: 1px solid var(--detail-header-border);
  background-image: var(--detail-header-bg-img);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
}

.header__inner {
  position: relative;
  display: flex;
  margin: auto;
  align-items: center;
  width: 850px;
  height: 100%;
}

.nav {
  display: flex;

  .nav__item {
    padding: 0.7rem;
    color: #249ffd;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    transition: opacity 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
}

.content {
  width: 820px;
  margin: 2rem auto 0;
  background-color: var(--detail-content-bg);
  color: var(--detail-content-color);
  user-select: text;
}

.clearfix:before,
.clearfix:after {
  content: '';
  display: table;
  clear: both;
}

.title {
  margin: 1rem;
  font-size: 1.6rem;
  font-weight: bold;
  padding: 1rem 1.5rem;
  border-left: 4px solid #c51e3a;
}

.theme-switch {
  position: absolute;
  padding: 0.8rem;
  transform: translateY(0.25rem);
  right: 0.4rem;
}

/**
 * ————————————————————响应式——————————————————————
 */

//窗口宽度小于1024px
@media screen and (max-width: 1024px) {
  .header__inner {
    width: 100%;
  }

  .content {
    width: 100%;
  }

  .nav {
    padding-left: 1rem;
    .nav__item {
      font-size: 14px;
    }
  }

  .title {
    font-size: 1.8rem;
  }
}
</style>
<style lang="scss">
/**
 * ————————————————————github markdown 主题覆盖——————————————————————
 */
.v-md-editor-preview {
  .github-markdown-body {
    padding: 1rem;
    font-family: 'JetBrainsMono-Regular';
  }

  .github-markdown-body div[class*='v-md-pre-wrapper-'] .highlight-lines {
    line-height: 1.45;
  }

  .github-markdown-body div[class*='v-md-pre-wrapper-'] {
    border-radius: 5px;
    background-color: var(--detail-md-github-code-bg);
  }

  //h1 h2 不显示底部border
  .github-markdown-body h1,
  .github-markdown-body h2 {
    border: none;
  }

  .github-markdown-body h1 {
    color: rgb(192, 72, 81);
  }

  //h3 - h6 标题color改变
  .github-markdown-body h2,
  .github-markdown-body h3,
  .github-markdown-body h4,
  .github-markdown-body h5,
  .github-markdown-body h6 {
    color: rgb(19, 92, 224);
  }
}

/**
 * ————————————————————响应式：markdown github 主题覆盖——————————————————————
 */

//窗口宽度小于1024px
@media screen and (max-width: 1024px) {
  .v-md-editor-preview {
    .github-markdown-body {
      font-size: 15px;
    }
  }
}
</style>
