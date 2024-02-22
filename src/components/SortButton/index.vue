<template>
  <div class="sort" @click="sortHandler">
    <div class="sort__content">
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
  //添加排序对象
  const hasprop = blogStore.sortMap.has(props.field)
  if (hasprop == true && currentOrder.value == 0) {
    blogStore.sortMap.delete(props.field)
  } else {
    blogStore.sortMap.set(props.field, currentOrder.value)
  }
  updateOrderBy()
}

/**
 * 更新排序数组
 */
function updateOrderBy() {
  let sortArr = []
  for (const [key, value] of blogStore.sortMap) {
    sortArr.push({ field: key, order: value })
  }
  blogStore.blogQueryConfig.sortArr = sortArr
}
</script>

<style lang="scss" scoped>
.sort {
  display: inline-block;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 0 1px #dcdfe6 inset;

  .sort__content {
    height: 30px;
    display: flex;
  }

  .text,
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    font-size: 12px;
    padding: 0.5rem;
  }

  .icon {
    padding-right: 0.5rem;
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
        border-bottom-color: #dcdfe6;
        &.active {
          border-bottom-color: #222222;
        }
      }

      .deascending {
        bottom: -4px;
        border-top-color: #dcdfe6;
        &.active {
          border-top-color: #222222;
        }
      }
    }
  }
}
</style>
