<template>
  <div>
    <el-form
      label-position="left"
      label-width="40px"
      class="mt2"
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      status-icon
    >
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="loginForm.email"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="mv3 flex items-center">
      <ph-checkbox
        class="ma0 mr-auto remember"
        label="记住我"
        :labelStyle="labelStyle"
        v-model="remember"
      ></ph-checkbox>
      <a class="f2" href="#">忘记密码?</a>
    </div>
    <el-button
      class="w-100 f3 btn-depth br1 login-btn"
      @click="onSubmit"
    >
      <span class="mr2">登陆</span>
      <i class="fas fa-arrow-right"></i>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'LoginBox',

  data() {
    const emailValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱地址'))
      } else {
        callback()
      }
    }

    const pswValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        email: '',
        password: '',
      },
      remember: false,
      labelStyle: {
        fontSize: '.8rem',
        color: 'gray',
      },
      rules: {
        email: [
          { validator: emailValidator, trigger: 'blur' },
        ],
        password: [
          { validator: pswValidator, trigger: 'blur' },
        ],
      },
    }
  },

  methods: {
    onSubmit() {
      console.log(this.loginForm)
    }
  },
}
</script>

<style lang="scss" scoped>
.remember {
  color: $color-first;
}

$basic-bg-color: #1c7cd6;

.login-btn {
  color: #fff;
  background-color: rgba($basic-bg-color, 0.9);
  border-color: #1663ab;

  &:hover {
    background-color: $basic-bg-color;
  }
}
</style>
