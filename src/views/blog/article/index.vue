<template>
  <div>
    <div class="content"></div>
  </div>
</template>

<script setup lang="ts">
import apiBlog from '@/api/modules/blog'
import { useBlogStore } from '@/stores/modules/blog'

const blogStore = useBlogStore()
const blogListConfig = reactive<Blog.listReqData>({
  pageNum: 1,
  pageSize: 10,
  category: '',
  searchKeyword: 'string',
  //排序数组
  sortArr: []
})

/* 监听博客分类id变化 */
watch(
  () => blogStore.categoryId,
  () => {
    blogListConfig.category = blogStore.categoryId
  },
  {
    immediate: true
  }
)

async function getBlogList() {
  const res = await apiBlog.getBlogList(blogListConfig)
  console.log(res)
}
</script>

<style lang="scss" scoped>
.content {
  height: 400px;
  background-color: #008c8c;
}
</style>
