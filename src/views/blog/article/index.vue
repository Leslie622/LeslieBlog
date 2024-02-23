<template>
  <div class="wrapper" v-infinite-scroll="load" :infinite-scroll-distance="200" :infinite-scroll-disabled="blogList.length >= total">
    <div class="article">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="article__item">
            <div class="blog-info"></div>
            <div class="cover">
              <el-skeleton-item variant="image" style="width: 240px; height: 100%" />
            </div>
          </div>
        </template>
        <template #default>
          <div class="article__item" v-for="item in blogList" :key="item.id">
            <div class="blog-info">
              <div class="title">
                <el-tooltip effect="light" :content="item.title" placement="top-start">
                  <span>
                    {{ item.title }}
                  </span>
                </el-tooltip>
              </div>
              <div class="details">
                <div class="time">
                  <Icon icon="material-symbols-light:date-range-outline-rounded" width="1rem"></Icon>
                  <span>{{ item.updatedAt.slice(0, 10) }}</span>
                </div>
                <div class="views">
                  <Icon icon="lets-icons:view-light" width="1rem"></Icon>
                  {{ item.views }}
                </div>
                <div class="sticky" v-if="item.isSticky">
                  <Icon icon="material-symbols-light:vertical-align-top" width="1rem"></Icon>
                  置顶
                </div>
                <div class="notOriginal" v-if="!item.isOriginal">
                  <!-- <Icon icon="material-symbols-light:vertical-align-top" width="1rem"></Icon> -->
                  非原创
                </div>
              </div>
              <div class="abs">
                <span>
                  {{ item.abstract }}
                </span>
              </div>
              <div class="action">
                <a href="#"> 去看看 </a>
              </div>
            </div>
            <div class="cover" v-if="item.cover">
              <el-image :src="$ImgPrefix + item.cover" :lazy="true">
                <template #placeholder>
                  <!-- <div class="placeholder">等待图片加载，请稍后</div> -->
                </template>
              </el-image>
              <!-- <img :src="$ImgPrefix + item.cover" alt="" /> -->
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiBlog from '@/api/modules/blog'
import { useBlogStore } from '@/stores/modules/blog'
import emitter from '@/utils/mitt'

const loading = ref<boolean>(true)
const blogList = ref<Blog.blogInfo[]>([])
const total = ref<number>(0)
const blogStore = useBlogStore()

onMounted(() => {
  getBlogList()
})

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
</script>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  margin: 0 10px 10px;
  max-height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.article {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article__item {
  display: flex;
  height: 240px;
  background-color: white;
  box-shadow: var(--boxShadow);

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  .blog-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.7rem;
    gap: 0.7rem;

    .title {
      padding: 0 3rem;
      span {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        font-weight: bold;
        font-size: 1.1rem;
      }
    }

    .details {
      display: flex;
      gap: 1rem;
      color: #a1a1a1;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3rem;
        padding: 0.2rem 0 1px;
        font-size: 0.9rem;
        border-bottom: 1px dashed #a1a1a1;

        svg {
          position: relative;
          top: -1px;
        }
      }

      .sticky {
        color: #c51e3a;
        border-color: #c51e3a;
        font-weight: bold;
      }

      .notOriginal {
        color: #ed9121;
        border-color: #ed9121;
        font-weight: bold;
      }
    }

    .abs {
      align-self: flex-start;
      background-color: #f9f9f9a9;
      padding: 0.7rem 1rem;
      border-left: 3px solid #cecece;
      span {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        font-size: 0.9rem;
        color: #a1a1a1;
      }
    }

    .action {
      text-align: center;
      a {
        text-decoration: none;
        color: #000;
        margin: auto;
        width: 6rem;
        display: inline-block;
        line-height: 1.5rem;
        font-size: 0.75rem;
        background-color: #fff;
        border: 2px solid #000;
        box-shadow: 1px 1px 0;
        position: relative;

        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          z-index: -1;
          background-color: #fff;
          transition: all 0.5s;
        }

        &:hover {
          background-color: transparent;
        }
        &:hover:after {
          background-color: #f6d51e;
        }

        &:active {
          top: 2px;
          left: 2px;
          box-shadow: 0 0 0 0;
        }
      }
    }
  }

  .cover {
    height: 100%;
    box-sizing: border-box;
    padding: 10px;

    :deep(.el-image) {
      width: 330px;
      height: 100%;
      border-radius: 3px;

      .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        font-size: 1rem;
        color: #cdd0d6;
      }
    }
  }
}

.el-skeleton {
  // --el-skeleton-color: red;
  // --el-skeleton-to-color: yellow;
}

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
    height: 180px;

    .blog-info {
      gap: 0.4rem;

      .title {
        padding: 0 3rem;
      }

      .action {
        a {
          width: 5.5rem;
          line-height: 1.4rem;
          font-size: 0.75rem;
        }
      }
    }

    .cover {
      :deep(.el-image) {
        width: 266px;
      }
    }
  }
}

//窗口宽度小于500px
@media screen and (max-width: 500px) {
  .article__item {
    height: 130px;

    .blog-info {
      gap: 0.3rem;
      .title {
        padding: 0 2rem;
        span {
          font-size: 1rem;
        }
      }

      .abs {
        span {
          -webkit-line-clamp: 2;
        }
      }

      .action {
        a {
          width: 4.5rem;
          line-height: 1.3rem;
          font-size: 0.75rem;
        }
      }
    }

    .cover {
      padding: 0.5rem;
      box-sizing: border-box;

      :deep(.el-image) {
        width: 176px;
      }
    }
  }
}

//窗口宽度小于400px
@media screen and (max-width: 400px) {
  .article__item {
    height: 100px;

    .blog-info {
      gap: 0.2rem;

      .title {
        padding: 0 2rem;
        span {
          font-size: 0.9rem;
        }
      }

      .abs {
        span {
          -webkit-line-clamp: 1;
        }
      }

      .action {
        a {
          width: 4rem;
          line-height: 1.2rem;
          font-size: 0.9rem;
          border-width: 1px;
        }
      }
    }

    .cover {
      :deep(.el-image) {
        width: 133px;
      }
    }
  }
}
</style>
