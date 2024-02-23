<template>
  <div class="config" :class="{ 'config--active': configActive }">
    <div class="config__header" @click="configActive = !configActive">
      <span>选择博客内容</span>
      <Icon icon="mynaui:click" width="18px"></Icon>
    </div>
    <div class="config__content">
      <el-divider content-position="left">标题模糊查询</el-divider>
      <div class="search-input">
        <el-input v-model="searchKeyword" @change="setKeyword">
          <template v-slot:suffix>
            <div class="search-input__suffix">
              <Icon icon="tabler:search" width="12px"></Icon>
            </div>
          </template>
        </el-input>
      </div>
      <el-divider content-position="left">分类选择</el-divider>
      <div>
        <el-select v-model="blogStore.blogQueryConfig.category" @change="changeCategory" placeholder="所有" :fit-input-width="true">
          <el-option label="所有" value=""></el-option>
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <el-divider content-position="left">排序</el-divider>
      <div class="content__sort">
        <sort-button field="views" text="浏览量"></sort-button>
      </div>
      <div class="submit" @click="submitHandler">
        <span>确定</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiBlog from '@/api/modules/blog'
import { useBlogStore } from '@/stores/modules/blog'
import { userInfo } from '@/config/user'
import emitter from '@/utils/mitt';
const blogStore = useBlogStore()
const configActive = ref<boolean>(false)
const categoryList = ref<BlogCategory.listResData>()
const searchKeyword = ref()

onMounted(() => {
  getBlogCategory()
})

/**
 * 获取博客分类列表
 */
async function getBlogCategory() {
  const res = await apiBlog.getCategoryList({ userId: userInfo.userId })
  categoryList.value = res.data
}

/**
 * 切换博客分类
 */
function changeCategory(categoryId: string) {
  blogStore.blogQueryConfig.category = categoryId
  //记录博客分类到本地
  localStorage.setItem('categoryId', categoryId)
}

/**
 * 记录模糊查询关键字
 */
function setKeyword() {
  blogStore.blogQueryConfig.searchKeyword = searchKeyword.value
}

/**
 * 博客信息配置后的处理函数
 */
function submitHandler(){
  //关闭配置栏
  configActive.value = !configActive.value
  //通知article组件更新数据
  emitter.emit("blogConfigChanged")
}
</script>

<style lang="scss" scoped>
.config {
  height: auto;
  max-height: 45px;
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
    margin: 5px;
    height: 35px;
    gap: 0.5rem;
    font-size: 13px;
    color: #a8a8a8;
    border-radius: 5px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
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
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .submit {
      display: grid;
      place-items: center;
      margin: 0.6rem 0;
      padding: 10px 0;
      color: white;
      border-radius: 5px;
      background-color: #222222;
      cursor: pointer;
    }
  }
}

.el-divider--horizontal {
  margin: 12px 0;
  :deep(.el-divider__text) {
    font-size: 13px;
    padding: 0 0.8rem;
    color: #a8a8a8;
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
    .config__header {
      border: none;
      box-shadow:
        rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
        rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    }

    .config__content {
      padding: 1rem 2rem 0 2rem;
    }
  }
}
</style>
