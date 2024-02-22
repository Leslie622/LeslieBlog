import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import NProgress from '@/utils/nprogress'

const env = import.meta.env //环境变量
const isUseProxy = env.VITE_OPEN_PROXY //是否开启代理
const baseURL = env.VITE_APP_API_BASEURL // BaseUrl

export class Request {
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = {
    //根据环境变量动态指定BaseUrl
    baseURL: env.DEV && isUseProxy === 'true' ? '/proxy/' : baseURL,
    timeout: 60000
  }

  constructor(config: AxiosRequestConfig) {
    /* 实例 */
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    /* 请求拦截 */
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        NProgress.start()
        return config
      },
      (err: AxiosError) => {
        return Promise.reject(err)
      }
    )
    /* 响应拦截 */
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const result: Result<any> = response.data
        const { status, message } = result
        if (status === 200) {
          //成功
        } else {
          ElMessage.error(message)
          NProgress.done()
          return Promise.reject(response.data)
        }
        NProgress.done()
        return response.data
      },
      (err: AxiosError) => {
        let message = ''
        switch (err.response?.status) {
          case 400:
            message = '请求错误(400)'
            break
          case 401:
            message = '未授权，请重新登录(401)'
            break
          case 403:
            message = '拒绝访问(403)'
            break
          case 404:
            message = '请求出错(404)'
            break
          case 408:
            message = '请求超时(408)'
            break
          case 500:
            message = '服务器错误(500)'
            break
          case 501:
            message = '服务未实现(501)'
            break
          case 502:
            message = '网络错误(502)'
            break
          case 503:
            message = '服务不可用(503)'
            break
          case 504:
            message = '网络超时(504)'
            break
          case 505:
            message = 'HTTP版本不受支持(505)'
            break
          default:
            message = `连接出错(${err.response?.status})!`
        }
        ElMessage({
          message: `${message}，请检查网络或联系管理员！`,
          type: 'error'
        })
        return Promise.reject(err.response)
      }
    )
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<Result<T>> {
    return this.instance.get(url, config)
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Result<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Result<T>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<Result<T>> {
    return this.instance.delete(url, config)
  }
}

export default new Request({})
