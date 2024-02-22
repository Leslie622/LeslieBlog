export const useBlogStore = defineStore('blog', () => {
  /* state */

  // 博客查询参数
  const blogQueryConfig = reactive<Blog.listReqData>({
    pageNum: 1,
    pageSize: 10,
    category: localStorage.categoryId ?? '',
    searchKeyword: '',
    sortArr: []
  })
  //排序字段存储
  const sortMap = ref<Map<string, any>>(new Map())

  return { blogQueryConfig, sortMap }
})
