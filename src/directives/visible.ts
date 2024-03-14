import type { Directive } from 'vue'

/**
 * 监听元素是否在可视范围内
 */
export const visible: Directive = {
  mounted(el) {
    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        //元素在可视范围内，执行操作
        if (entry.isIntersecting) {
          //这里可加入相应逻辑判断
          blogItemFadeIn(el)
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
      { opacity: 0, transform: 'translateY(-20px)' },
      { opacity: 1, transform: 'translateY(0px)' }
    ],
    { duration: 600 }
  )
}
