import browserTool from 'browser-tool'
import apiTrack from '@/api/modules/track'

/**
 * 获取访问者设备信息
 */
export async function getUserAgent() {
  const userAgentInfo = await browserTool.getInfo()
  //获取用户的操作系统、浏览器
  const { system, browser } = userAgentInfo
  await apiTrack.postUserAgent({ system, browser })
}
