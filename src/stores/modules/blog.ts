import { userInfo } from '@/config/user'

export const useBlogStore = defineStore('blog', () => {
  /* state */

  // 博客查询参数
  const blogQueryConfig = reactive<Blog.listReqData>({
    userId: userInfo.userId,
    pageNum: 1,
    pageSize: 5,
    category: localStorage.categoryId ?? '',
    searchKeyword: '',
    sortArr: [
      {
        field: 'isSticky',
        order: -1
      }
    ]
  })

  //排序字段存储
  const sortMap = ref<Map<string, any>>(new Map())
  //定义默认排序规则
  sortMap.value.set('isSticky', -1)

  return { blogQueryConfig, sortMap }
})
