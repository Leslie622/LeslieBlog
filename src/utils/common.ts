function throttle(fn: Function, wait: number) {
  let flag = true
  let timer = null
  return function (...args: any) {
    if (flag) {
      // @ts-ignore
      fn.apply(this, args)
      flag = false
      timer = setTimeout(() => {
        flag = true
      }, wait)
    }
  }
}

export { throttle }
