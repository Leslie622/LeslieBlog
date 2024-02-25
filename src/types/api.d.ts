/* 后端返回的基本数据结构 */
type Result<T> = {
  status: number
  message: string
  data: T
}

namespace BlogCategory {
  type listReqData = {
    userId: string
  }

  type listResData = {
    id: string
    name: string
    introduce: string
    count: number
  }[]
}

namespace Blog {
  type blogInfo = {
    id: string
    title: string
    abstract: string
    cover: string
    content: string
    draft: string
    category: string
    author: string
    views: number
    isOriginal: boolean
    isSticky: boolean
    createdAt: string
    updatedAt: string
  }

  type sortData = {
    field: string //排序字段
    order: number //排序方式
  }

  type listReqData = {
    userId: string //用户id
    pageNum: number //页码
    pageSize: number //每页个数
    category: string //分类id，默认空为所有
    searchKeyword: string //搜索关键字
    //排序数组
    sortArr: Array<sortData>
  }

  type listResData = {
    total: number
    blogList: blogInfo[]
  }

  type singleInfoReqData = {
    blogId: string
  }

  type singleInfoResData = blogInfo
}

namespace User {
  type userInfoReqData = {
    userId: string
  }

  type userInfoResData = {
    avatar: string
    introduce: string
  }
}
