<template>
  <div>
    <el-form
      label-position="left"
      label-width="80px"
      class="mt2"
      :model="signupForm"
      :rules="rules"
      ref="signupForm"
      status-icon
    >
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="signupForm.email"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="signupForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPsw">
        <el-input
          type="password"
          v-model="signupForm.checkPsw"
        ></el-input>
      </el-form-item>
    </el-form>
    <ph-checkbox
      class="mb2 check"
      label="阅读并确认协议"
      :labelStyle="labelStyle"
      v-model="protocolChecked"
    ></ph-checkbox>
    <el-button
      class="w-100 f3 btn-depth br1 login-btn"
      @click="onSubmit"
    >提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'SignupForm',

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

    const checkPswValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.signupForm.password) {
        callback(new Error('两次输入密码不同！'))
      } else {
        callback()
      }
    }

    return {
      signupForm: {
        email: '',
        password: '',
        checkPsw: '',
      },
      rules: {
        email: [
          { validator: emailValidator, trigger: 'blur' },
        ],
        password: [
          { validator: pswValidator, trigger: 'blur' },
        ],
        checkPsw: [
          { validator: checkPswValidator, trigger: 'blur' },
        ],
      },
      protocolChecked: false,
      labelStyle: {
        fontSize: '.8rem',
        color: 'gray',
      },
    }
  },

  methods: {
    onSubmit() {
      console.log(this.signupForm)
    }
  },
}
</script>

<style lang="scss" scoped>
.check {
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
