/* 后端返回的基本数据结构 */
type Result<T> = {
  status: number
  message: string
  data: T
}
