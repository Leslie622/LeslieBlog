<template>
  <div class="wrapper" v-infinite-scroll="load" :infinite-scroll-distance="200" :infinite-scroll-disabled="blogList.length >= total" @scroll="scrollHandler">
    <div class="article">
      <el-empty description="暂无内容" v-if="blogList.length == 0 && loading != true" class="empty" />
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="article">
            <div class="article__item" v-for="i in 5" :key="i">
              <div class="title">
                <el-skeleton-item variant="h1" />
              </div>
              <div class="content">
                <div class="info">
                  <div class="details">
                    <el-skeleton-item variant="text" style="width: 3rem; border: none" />
                    <el-skeleton-item variant="text" style="width: 3rem; border: none" />
                  </div>
                  <div class="abs" style="flex-wrap: wrap">
                    <el-skeleton-item variant="text" />
                    <el-skeleton-item variant="text" />
                    <el-skeleton-item variant="text" />
                  </div>
                  <div class="data">
                    <el-skeleton-item variant="text" style="width: 3rem" />
                  </div>
                </div>
                <div class="cover">
                  <el-skeleton-item variant="image" class="el-image" style="height: 100%; display: flex" />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #default>
          <div class="article__item" v-for="item in blogList" :key="item.id" @click="viewDetailHandler(item.id)">
            <div class="title">
              <span>
                {{ item.title }}
              </span>
            </div>
            <div class="content">
              <div class="info">
                <div class="details">
                  <div class="time">
                    <Icon icon="material-symbols-light:date-range-outline-rounded" class="icon"></Icon>
                    <span>{{ item.updatedAt.slice(0, 10) }}</span>
                  </div>
                  <div class="sticky" v-if="item.isSticky">
                    <Icon icon="material-symbols-light:vertical-align-top" class="icon"></Icon>
                    <span> 置顶 </span>
                  </div>
                  <div class="notOriginal" v-if="!item.isOriginal">非原创</div>
                </div>
                <div class="abs">
                  <span>
                    {{ item.abstract }}
                  </span>
                </div>
                <div class="data">
                  <div>
                    <Icon icon="lets-icons:view-light" class="icon"></Icon>
                    {{ item.views }}
                  </div>
                </div>
              </div>
              <div class="cover" v-if="item.cover">
                <el-image :src="$ImgPrefix + item.cover" :lazy="true">
                  <template #placeholder>
                    <el-skeleton-item variant="image" class="el-image" style="height: 100%; display: flex" />
                  </template>
                </el-image>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
    <back-top target=".wrapper"> </back-top>
  </div>
</template>

<script setup lang="ts">
import apiBlog from '@/api/modules/blog'
import { useBlogStore } from '@/stores/modules/blog'
import emitter from '@/utils/mitt'
import { throttle } from '@/utils/common'

const router = useRouter()
const loading = ref<boolean>(true)
const blogList = ref<Blog.blogInfo[]>([])
const total = ref<number>(0)
const blogStore = useBlogStore()

onMounted(() => {
  getBlogList()
})

/**
 * 监听滚动：关闭header和config
 */
const scrollHandler = throttle(function () {
  emitter.emit('pullupBlogConfig')
  emitter.emit('pullupHeader')
}, 3000)

/**
 * 初始化博客列表
 */
async function getBlogList() {
  const res = await apiBlog.getBlogList(blogStore.blogQueryConfig)
  blogList.value = res.data.blogList
  total.value = res.data.total
  loading.value = false
}

/**
 * 分页监听
 */
function load() {
  blogStore.blogQueryConfig.pageNum += 1
  getMoreBlog()
}

/**
 * 分页加载
 */
async function getMoreBlog() {
  const res = await apiBlog.getBlogList(blogStore.blogQueryConfig)
  blogList.value.push(...res.data.blogList)
}

/**
 * 监听BlogConfig组件的博客信息已配置事件
 */
emitter.on('blogConfigChanged', () => {
  //重置页数
  blogStore.blogQueryConfig.pageNum = 1
  //获取新数据
  getBlogList()
})

/**
 * 查看详情处理函数
 */
function viewDetailHandler(blogId: string) {
  router.push({ path: '/detail', query: { blogId } })
}
</script>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  margin: 0 0.625rem 0.625rem;
  max-height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.article {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-bottom: 0.8rem;
}

.article__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  height: 250px;
  box-sizing: border-box;
  background-color: var(--blog-article-item-bg);
  box-shadow: var(--boxShadow);
  cursor: pointer;

  &:nth-child(even) {
    .content {
      flex-direction: row-reverse;
    }
    .info {
      padding-right: 0;
      padding-left: 15px;
    }
  }
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4rem;
  height: 20%;
  color: var(--blog-article-item-title-color);

  span {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    font-size: 18px;
    font-weight: bold;
  }
}

.content {
  display: flex;
  height: 80%;

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 15px;

    .icon {
      font-size: 20px;
    }

    .details {
      height: 28%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      color: #a8a8a8;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3rem;
        height: 1.5rem;
        font-size: 16px;
        border-bottom: 1px dashed #a8a8a8;
        font-weight: bold;
      }

      .sticky {
        color: #c51e3a;
        border-color: #c51e3a;
      }

      .notOriginal {
        color: #ed9121;
        border-color: #ed9121;
      }
    }

    .abs {
      align-self: flex-start;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      height: 44%;
      width: 100%;
      box-sizing: border-box;
      background-color: var(--blog-article-item-abs-bg);
      span {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        text-overflow: ellipsis;
        font-size: 16px;
        color: #a1a1a1;
      }
    }

    .data {
      align-self: flex-end;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-right: 15px;
      height: 28%;
      color: #a1a1a1;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3rem;
        font-size: 16px;
      }
    }
  }

  .cover {
    box-sizing: border-box;

    :deep(.el-image) {
      width: 264px;
      border-radius: 5px;
    }
  }
}

.empty {
  background-color: var(--blog-article-item-bg);
}

/**
 * ————————————————————响应式——————————————————————
 */

//窗口宽度小于1024px
@media screen and (max-width: 1024px) {
  .wrapper {
    margin: 0.5rem;
    max-height: calc(100vh - 80px);
  }
}

//窗口宽度小于770px
@media screen and (max-width: 770px) {
  .article__item {
    height: 230px;
    padding: 10px;
    box-shadow: none;

    &:nth-child(even) {
      .info {
        padding-right: 0;
        padding-left: 15px;
      }
    }
  }

  .article {
    gap: 0.625rem;
    padding-bottom: 1rem;
  }

  .title {
    padding: 0 4rem;
  }

  .content {
    .info {
      padding-right: 10px;

      .icon {
        font-size: 16px;
      }

      .details {
        div {
          height: 1.6rem;
          font-size: 15px;
        }
      }
      .abs {
        padding: 0 0.8rem;
        span {
          -webkit-line-clamp: 4;
          font-size: 15px;
        }
      }
      .data {
        padding-right: 15px;
        div {
          font-size: 15px;
        }
      }
    }
    .cover {
      :deep(.el-image) {
        width: 240px;
      }
    }
  }
}

//窗口宽度小于650px
@media screen and (max-width: 650px) {
  .article__item {
    height: 210px;
    padding: 10px;

    &:nth-child(even) {
      .info {
        padding-right: 0;
        padding-left: 10px;
      }
    }
  }

  .title {
    padding: 0 4rem;
    span {
      font-size: 17px;
    }
  }

  .content {
    .info {
      padding-right: 10px;
      .details {
        div {
          font-size: 15px;
        }
      }
      .abs {
        padding: 0 0.6rem;
        span {
          -webkit-line-clamp: 4;
          font-size: 15px;
        }
      }
      .data {
        padding-right: 15px;
        div {
          font-size: 15px;
        }
      }
    }
    .cover {
      padding: 10px 0;
      :deep(.el-image) {
        width: 198px;
      }
    }
  }
}

//窗口宽度小于550px
@media screen and (max-width: 550px) {
  .article__item {
    height: 190px;
    padding: 10px;

    &:nth-child(even) {
      .info {
        padding-right: 0;
        padding-left: 5px;
      }
    }
  }

  .title {
    padding: 0 3rem;
    span {
      font-size: 16px;
    }
  }

  .content {
    .info {
      padding-right: 5px;

      .icon {
        font-size: 16px;
      }
      .details {
        div {
          font-size: 15px;
        }
      }
      .abs {
        padding: 0 0.5rem;
        span {
          -webkit-line-clamp: 3;
          font-size: 15px;
        }
      }
      .data {
        padding-right: 15px;
        div {
          font-size: 15px;
        }
      }
    }
    .cover {
      padding: 10px 0;
      :deep(.el-image) {
        width: 174px;
      }
    }
  }
}

//窗口宽度小于450px
@media screen and (max-width: 450px) {
  .article__item {
    height: 150px;
    padding: 5px;

    &:nth-child(even) {
      .info {
        padding-right: 0;
        padding-left: 5px;
      }
    }
  }

  .title {
    padding: 0 2.5rem;
    span {
      font-size: 15px;
    }
  }

  .content {
    .info {
      padding-right: 5px;
      .details {
        div {
          font-size: 11px;
        }
      }
      .abs {
        span {
          -webkit-line-clamp: 3;
          font-size: 13px;
        }
      }
      .data {
        padding-right: 15px;
        div {
          font-size: 13px;
        }
      }
    }
    .cover {
      padding: 10px 0;
      :deep(.el-image) {
        width: 141px;
      }
    }
  }
}
</style>
