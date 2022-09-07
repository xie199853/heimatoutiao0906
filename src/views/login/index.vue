<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mbileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            size="small"
            type="default"
            class="btn"
            v-if="isShowCodeBtn"
            @click="sendCode"
            native-type="button"
            >获取验证码</van-button
          >
          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mbileRules, codeRules } from '@/views/login/rule'
import { login, sendCodeApi } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mbileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    // loading
    // message : 提示文案
    // forbidClick : 禁止点击
    // duration : 展示时长 0的话一直展示
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        this.SET_TOKEN(data.data)
        this.$router.push('/peofile')
        this.$toast.success('登陆成功')
      } catch (err) {
        // 细分一下失败
        // 若果是手机号或者验证码错了，用户能知道
        // error: 1.js抛出的错误 2.axios封装的error对象

        // axios封装的error对象
        // - error.response.data 后端返回的数据
        // - error.response.status 后端返回的状态码
        // 如果是axios封装的error对象 并且状态码为400
        if (err.response && err.response.status === 400) {
          this.$toast.fail(err.response.data.message)
        } else {
          this.$toast.clear()
          console.dir(err)
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      // 0.验证用户是否输入了有效的手机号
      // 1. from绑定ref
      // -$refs.form.validate()
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCodeApi(this.mobile)
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3396fc;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
  .btn {
    height: 0.64rem;
    background-color: #eee;
    color: #a58594;
  }
}
</style>
