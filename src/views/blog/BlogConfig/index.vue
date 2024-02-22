<template>
  <div class="config" :class="{ 'config--active': configActive }">
    <div class="config__header" @click="configActive = !configActive">
      <span>点击配置博客信息</span>
    </div>
    <div class="config__content">
      <el-divider content-position="left">标题模糊查询</el-divider>
      <div class="search-input">
        <el-input>
          <template v-slot:suffix>
            <div class="search-input__suffix">
              <Icon icon="tabler:search" width="12px"></Icon>
            </div>
          </template>
        </el-input>
      </div>
      <el-divider content-position="left">分类选择</el-divider>
      <div>
        <el-select v-model="blogStore.categoryId" @change="changeCategory" placeholder="选择博客分类">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <el-divider content-position="left">排序</el-divider>
      <div class="content__sort">
        <sort-button field="updatedAt" text="更新时间"></sort-button>
        <sort-button field="views" text="浏览量"></sort-button>
      </div>
      <div class="submit" @click="configActive = !configActive">
        <span>确定</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiBlog from '@/api/modules/blog'
import { useBlogStore } from '@/stores/modules/blog'
import { userInfo } from '@/config/user'
const blogStore = useBlogStore()
const configActive = ref<boolean>(false)
const categoryList = ref<BlogCategory.listResData>()

onMounted(() => {
  getBlogCategory()
})

/* 获取博客分类列表 */
async function getBlogCategory() {
  const res = await apiBlog.getCategoryList({ userId: userInfo.userId })
  categoryList.value = res.data
}

/* 切换博客分类 */
function changeCategory(categoryId: string) {
  blogStore.categoryId = categoryId
  //记录博客分类到本地
  localStorage.setItem('categoryId', categoryId)
}
</script>

<style lang="scss" scoped>
.config {
  height: auto;
  max-height: 40px;
  margin: 5px;
  box-sizing: border-box;
  overflow: hidden;
  transition: max-height 0.5s;
  user-select: none;

  &.config--active {
    //必须保证该max-height比总高度大
    max-height: 400px;
  }

  .config__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    height: 40px;
    background-color: yellow;
    box-sizing: border-box;
    cursor: pointer;
  }

  .config__content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;

    .content__sort {
      display: flex;
      // justify-content: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .submit {
      margin: 0.6rem 0;
      padding: 10px 0;
      display: grid;
      place-items: center;
      color: white;
      background-color: #222222;
      cursor: pointer;
    }
  }
}

.el-divider--horizontal {
  margin: 12px 0;
  :deep(.el-divider__text) {
    padding: 0 0.8rem;
    color: #bababa;
  }
}

.search-input__suffix {
  display: flex;
  justify-content: center;
  align-items: center;
}

//窗口宽度小于1000px时：版心100%
@media screen and (max-width: 1024px) {
  .config {
    .config__content {
      padding: 0 2rem;
    }
  }
}
</style>
