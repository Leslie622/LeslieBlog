import { userInfo } from '@/config/user'

export const useBlogStore = defineStore('blog', () => {
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
      },
      {
        field: 'updatedAt',
        order: -1
      }
    ]
  })
  //排序字段存储:使用Map结构规定排序顺序
  const sortMap = ref<Map<string, any>>(new Map())
  //设置默认排序规则：分为硬性和软性，硬性排序规则始终存在，软性排序规则在有新排序规则后被删除
  sortMap.value.set('isSticky', -1)
  sortMap.value.set('updatedAt', -1)
  //定义软性排序规则数组
  const softSortRules: Blog.sortData[] = [
    {
      field: 'updatedAt',
      order: -1
    }
  ]

  /**
   * 排序处理函数
   */
  function sortHandler(filed: string, order: number) {
    //先删除软性排序规则
    softSortRules.forEach((sortItem) => {
      if (sortMap.value.has(sortItem.field)) {
        sortMap.value.delete(sortItem.field)
      }
    })
    //设置新的规则：order为0则删除该规则
    const hasprop = sortMap.value.has(filed)
    if (hasprop == true && order == 0) {
      sortMap.value.delete(filed)
    } else {
      sortMap.value.set(filed, order)
    }
    //更新排序数组
    updateSortArr()
  }

  /**
   * 更新排序数组
   */
  function updateSortArr() {
    const sortArr = []
    for (const [key, value] of sortMap.value) {
      sortArr.push({ field: key, order: value })
    }
    blogQueryConfig.sortArr = sortArr
  }

  return { blogQueryConfig, sortMap, sortHandler }
})
