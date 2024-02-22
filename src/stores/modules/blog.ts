export const useBlogStore = defineStore('blog', () => {
  /* state */

  //分类id
  const categoryId = ref<string>(localStorage.categoryId ?? '')
  //排序数组
  const sortArr = ref<Blog.sortData[]>([])
  //排序字段存储
  const sortMap = ref<Map<string, any>>(new Map())

  return { categoryId, sortArr, sortMap }
})
