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
  box-shadow: 0 0 0 1px #dcdfe6 inset;
  cursor: pointer;
}

.content {
  height: 1.9rem;
  display: flex;
}

.text,
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 0.75rem;
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

/**
 * ——————————————————响应式——————————————————
 */

//窗口宽度小于770px
@media screen and (max-width: 770px) {
  .icon {
    transform: scale(0.9);
  }
}

//窗口宽度小于500px
@media screen and (max-width: 500px) {
  .icon {
    transform: scale(0.7);
  }
}

//窗口宽度小于400px
@media screen and (max-width: 400px) {
  .icon {
    transform: scale(0.65);
  }
}
</style>
