<template>
  <div class="user-info">
    <div class="avatar">
      <el-image v-if="user.avatar" :src="$ImgPrefix + user.avatar" class="el-image" />
    </div>
    <div class="introduce">
      <span>{{ user.introduce }}</span>
    </div>
    <div class="link">
      <div v-for="item in linkIcons" :key="item.text">
        <el-popover placement="top" trigger="click" width="200px" popper-class="link-popover" :hide-after="0">
          <template #reference>
            <div class="link__item">
              <Icon :icon="item.icon" width="20px"></Icon>
            </div>
          </template>
          <div class="hint">
            <div v-if="item.href" class="href">
              <span v-if="item.href">{{ item.text }}</span>
              <el-button type="primary" size="small" @click="linkClickHandler(item)">去看看</el-button>
            </div>
            <div v-if="item.img" class="img">
              <img :src="item.img" alt="" />
            </div>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiUser from '@/api/modules/user'
import { userInfo } from '@/config/user'
import weChat from '@/assets/image/weChatQR.png'

const user = ref({
  avatar: '',
  introduce: ''
})

const linkIcons = [
  { text: '我的Gitee主页', icon: 'simple-icons:gitee', href: 'https://gitee.com/Lyf-622' },
  { text: '我的GitHub主页', icon: 'simple-icons:github', href: 'https://github.com/Leslie622' },
  { text: 'wechat', icon: 'simple-icons:wechat', img: weChat }
]

onMounted(() => {
  getUserInfo()
})

async function getUserInfo() {
  const res = await apiUser.getUserInfo({ userId: userInfo.userId })
  user.value = res.data
}

function linkClickHandler(item: any) {
  window.open(item.href)
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 0.7rem;
}

.avatar {
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  overflow: hidden;
  .el-image{
    border-radius: 50%;
  }
}

.introduce {
  display: flex;
  align-items: center;
  height: 1.2rem;
  min-height: 1.2rem;
  font-size: 13px;
  padding: 0 12px;
  color: gray;
}

.link {
  display: flex;
  justify-content: center;
  gap: 12px;
  color: gray;
}

.link__item {
  display: grid;
  place-items: center;
  padding: 4px 6px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #eee;
  }

  svg {
    outline: none !important;
  }
}

/**
 * ——————————————————响应式——————————————————
 */

//窗口宽度小于1024px
@media screen and (max-width: 1024px) {
  .avatar,
  .introduce {
    display: none;
  }
}
</style>
<style lang="scss">
/**
 * ——————————————————element样式覆盖——————————————————
 */
.link-popover {
  .hint {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .href {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 14px;
  }
  .img {
    text-align: center;
    img {
      width: 90%;
    }
  }
}

.el-popover.el-popper {
  padding: 5px;
}
</style>
