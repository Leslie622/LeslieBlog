import ApiService from '../index'

export default {
  // 获取博客分类
  getCategoryList: (data: BlogCategory.listReqData) => ApiService.post<BlogCategory.listResData>('blogCategory/getListByUserId', data),
  // 获取博客列表
  getBlogList: (data: Blog.listReqData) => ApiService.post<Blog.listResData>('blog/getListByUserId', data),
  // 获取博客列表
  getSingleBlog: (data: Blog.singleInfoReqData) => ApiService.post<Blog.singleInfoResData>('blog/singleBlog', data)
}
