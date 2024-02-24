//公共状态管理
export enum Theme {
  Dark = 'dark',
  Light = ' '
}

export const useCommonStore = defineStore('common', () => {
  const theme = ref<Theme>(localStorage.theme ?? Theme.Light)

  return { theme }
})
