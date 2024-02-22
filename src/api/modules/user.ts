import ApiService from '../index'

export default {
  // 获取用户信息
  getUserInfo: (data: User.userInfoReqData) => ApiService.post<User.userInfoResData>('users/getUserInfoById', data)
}
