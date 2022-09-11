<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登录 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="uesrinfo.photo"
              />
              <span class="mobile">12345678910</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button class="edit-btn" size="mini" round
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false">
            <van-grid-item text="头条">
              <template #icon>{{uesrinfo.art_count}}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{uesrinfo.fans_count}}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{uesrinfo.follow_count}}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{uesrinfo.like_count}}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image width="1.76rem" height="1.76rem" :src="mobileSRC" />
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <!-- 主题 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小张同学" is-link />
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <van-button block style="color: red" v-if="isLogin" @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSRC from '@/assets/images/mobile.png'
import { getUserInfoAPI } from '@/Api'
export default {
  name: 'MY',
  data() {
    return {
      mobileSRC,
      uesrinfo: []
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    // $store.commit('SET_TOKEN', {})
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        this.uesrinfo = data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  height: 100vh;
  background-color: #f5f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
    .toutiao-shoucang {
      color: red;
    }
    .toutiao-lishi {
      color: orange;
    }
  }
}
.banner {
  // size想和background合并写法必要有background-position
  widows: 100%;
  height: 5.33333rem;
  background: url('@/assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  // 修改主轴方向为列
  flex-direction: column;
  justify-content: center;
  // 列轴居中
  align-items: center;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.43rem;
    color: #666;
  }
  :deep(.van-grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: transparent;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
