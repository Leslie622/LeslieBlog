<template>
  <div>详情{{ articleId }}</div>
</template>

<script setup lang="ts">
const route = useRoute()
const articleId = ref()


/* 监听路由query变化:如果携带blogId，则请求博客数据 */
watch(
  () => route.query.articleId,
  async () => {
    articleId.value = route.query.articleId
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped></style>
