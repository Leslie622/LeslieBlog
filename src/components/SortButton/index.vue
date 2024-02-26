<template>
  <div class="sort" @click="sortHandler">
    <div class="content">
      <div class="text">
        <span>{{ text }}</span>
      </div>
      <div class="icon">
        <div class="icon__content">
          <div class="sort-caret ascending" :class="[{ active: currentOrder == 1 }]"></div>
          <div class="sort-caret deascending" :class="[{ active: currentOrder == -1 }]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from '@/stores/modules/blog'

/**
 *  orders
 *  1：升序
 * -1：降序
 *  0：默认
 */
const orders = [1, -1, 0]
const blogStore = useBlogStore()
const props = defineProps<{
  field: string
  text: string
}>()

let Index = 0
let currentOrder = ref<number>(0)

/**
 * 排序处理函数
 */
function sortHandler() {
  //循环取值，得到当前order字段
  Index = Index % orders.length
  currentOrder.value = orders[Index]
  Index += 1
  //到bligStore处理后续逻辑
  blogStore.sortHandler(props.field, currentOrder.value)
}
</script>

<style lang="scss" scoped>
.sort {
  display: inline-block;
  overflow: hidden;
  border-radius: 3px;
  color: var(--blog-config-sort-color);
  border: 1px solid var(--blog-config-sort-border);
  cursor: pointer;
}

.content {
  height: 30px;
  display: flex;
  // gap: 3px;
}

.text,
.icon {
  display: flex;
  align-items: center;
}

.text {
  font-size: 12px;
  padding: 0.6rem 0.2rem 0.6rem 0.6rem;
}

.icon {
  padding: 0.3rem 0.3rem 0.3rem 0;
  .icon__content {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    height: 14px;
    width: 10px;

    .sort-caret {
      width: 0;
      height: 0;
      border: solid 5px transparent;
      position: absolute;
    }

    .ascending {
      top: -4px;
      border-bottom-color: var(--blog-config-sort-border);
      &.active {
        border-bottom-color: black;
      }
    }

    .deascending {
      bottom: -4px;
      border-top-color: var(--blog-config-sort-border);
      &.active {
        border-top-color: black;
      }
    }
  }
}

/**
 * ——————————————————响应式——————————————————
 */

//窗口宽度小于400px
@media screen and (max-width: 400px) {
  .icon {
    transform: scale(0.8);
  }
}
</style>
