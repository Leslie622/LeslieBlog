import ApiService from '../index'

export default {
  // 上传用户设备信息
  postUserAgent: (data: Visitor.info) => ApiService.post<any>('visitor/setInfo', data)
}
