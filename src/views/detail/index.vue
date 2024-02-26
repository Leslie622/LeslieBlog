<template>
  <div class="detail">
    <div class="header">
      <div class="header__inner">
        <div class="nav">
          <router-link v-for="item in linkList" :key="item.path" :to="item.path" class="nav__item">
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="content">
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
  { path: '/diary', name: 'DIARY' }
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
  position: relative;
  height: 100vh;
  overflow-y: scroll;
}

.header {
  position: sticky;
  z-index: 999;
  top: 0;
  height: 60px;
  border-bottom: 1px solid #dcdfe6;
  background-image: radial-gradient(transparent 1px, #ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
}

.header__inner {
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
    transition: opacity 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
}

.content {
  width: 820px;
  margin: 0 auto;
  background-color: white;
}

.title {
  margin: 3rem 0;
  font-size: 20px;
  font-weight: bold;
  padding: 1rem 2rem;
  border-left: 4px solid #c51e3a;
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
  }

  .title {
    margin: 3rem 1rem;
    font-size: 16px;
  }
}
</style>
