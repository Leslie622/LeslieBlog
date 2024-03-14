import type { Directive } from 'vue'

/**
 * 监听元素是否在可视范围内
 */
export const visible: Directive = {
  mounted(el, binding) {
    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        //元素在可视范围内，执行操作
        if (entry.isIntersecting) {
          if (binding.value >= 5) {
            blogItemFadeIn(el)
          }
          self.unobserve(entry.target) //解除监听
        }
      })
    })
    observer.observe(el)
  }
}

/**
 * 博客项渐入动画
 */
function blogItemFadeIn(el: HTMLDivElement) {
  el.animate(
    [
      { opacity: 0.3, transform: 'translateX(4rem)' },
      { opacity: 1, transform: 'translateX(0px)' }
    ],
    { duration: 500 }
  )
}
