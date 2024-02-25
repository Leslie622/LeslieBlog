<template>
  <div class="config" :class="{ 'config--active': configActive }">
    <div class="header" @click="configActive = !configActive">
      <span>选择博客内容</span>
      <Icon icon="mynaui:click" width="1rem"></Icon>
    </div>
    <div class="content">
      <el-divider content-position="left">标题模糊查询</el-divider>
      <div>
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
import emitter from '@/utils/mitt'
const blogStore = useBlogStore()
const configActive = ref<boolean>(false)
const categoryList = ref<BlogCategory.listResData>()
const searchKeyword = ref()

onMounted(() => {
  getBlogCategory()
})

/**
 * 监听：关闭config
 */
emitter.on('pullupBlogConfig', () => {
  configActive.value = false
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
function submitHandler() {
  //关闭配置栏
  configActive.value = !configActive.value
  //触发：博客配置参数变化
  emitter.emit('blogConfigChanged')
}
</script>

<style lang="scss" scoped>
.config {
  margin: 0.3rem;
  max-height: 45px;
  height: auto;
  overflow: hidden;
  box-sizing: border-box;
  transition: max-height 0.5s;
  user-select: none;

  &.config--active {
    //必须保证该max-height比总高度大
    max-height: 350px;
  }
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 0.3rem;
  height: 35px;
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

.content {
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
    padding: 10px;
    font-size: 13px;
    color: white;
    border-radius: 5px;
    background-color: #222222;
    cursor: pointer;
  }
}

.search-input__suffix {
  display: flex;
  justify-content: center;
  align-items: center;
}

/**
 * —————————————— element样式覆盖 ——————————————
 */

.el-divider--horizontal {
  margin: 13px 0;
  :deep(.el-divider__text) {
    font-size: 12px;
    padding: 0 0.8rem;
    color: #a8a8a8;
  }
}

/**
 * —————————————— 响应式 ——————————————
 */

//窗口宽度小于1000px时：版心100%
@media screen and (max-width: 1024px) {
  .content {
    padding: 1rem 2rem;
  }
}

//窗口宽度小于770px
@media screen and (max-width: 770px) {
  .header {
    box-shadow: none;
    background-color: #222222;
    color: white;
    border: none;
  }
}
</style>
