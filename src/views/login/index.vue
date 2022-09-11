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
        :rules="mobileRules"
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
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 发送验证码 -->
        <!-- @finish 结束时触发 -->
        <template #button>
          <van-button
            v-if="isShowCodeBtn"
            @click="sendCode"
            class="btn"
            round
            size="small"
            type="default"
            native-type="button"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            format="ss秒"
            :time="60 * 1000"
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
// 引入验证规则
import { mobileRules, codeRules } from './nule'
import { login, sendCodeApi } from '@/Api'
// token 身份证 标识用户
// 用处： 标识用户是否登陆了
// token 存放在vux里面
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      // 注册
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        // 将token放在vuex
        this.SET_TOKEN(data.data)
        // 跳转我的路由
        this.$router.push('/profile')
        // 成功提示
        this.$toast.success('登陆成功')
      } catch (error) {
        // 细分一下失败
        // 若果是手机号或者验证码错了，用户能知道
        // error: 1.js抛出的错误 2.axios封装的error对象

        // axios封装的error对象
        // - error.response.data  后端返回的数据
        // - error.response.status  后端返回的状态码
        // 如果是axios封装的error对象 并且状态码为400
        if (error.response && error.response.status === 400) {
          // 就把后端返回的错误提示信息提示给用户
          this.$toast.fail(error.response.data.message)
        } else {
          // js导致错误，507
          // console.dir(error)
          this.$toast.clear()
          // 错误上抛给error
          throw error
        }
      }
    },
    // loading
    // message : 提示文案
    // forbidClick : 禁止点击
    // duration : 展示时长 0的话一直展示
    loading() {
      this.$toast.loading({
        message: '刷新重试...',
        forbidClick: true,
        duration: 0
      })
    },
    // 获取短信
    async sendCode() {
      // 验证用户是否输入了有效的手机号码
      // - form 绑定ref
      // - $refs.from.validate(name)
      await this.$refs.form.validate('mobile')
      this.loading()
      // 发送请求
      try {
        await sendCodeApi(this.mobile)
        // 倒计数结束显示按钮
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          (error.response && error.response.status === 429) ||
          error.response.status === 404
        ) {
          // axios错误
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
featuer/profile
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
}
.btn {
  height: 0.64rem;
  color: #a58594;
  background-color: #eee;
}
</style>
