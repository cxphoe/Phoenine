<template>
  <div class="form-box">
    <el-tabs class="login-box" type="border-card">
      <el-tab-pane label="登陆">
        <LoginBox></LoginBox>
      </el-tab-pane>
      <el-tab-pane label="注册">
        <SignupBox></SignupBox>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LoginBox from './login'
import SignupBox from './signup'

export default {
  name: 'LoginPage',

  components: {
    LoginBox,
    SignupBox,
  },
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
}

.form-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 2rem 1rem;
}

@media screen and (min-width: 400px) {
  .form-box {
    width: 400px;
  }
}

@media screen and (max-width: 400px) {
  .form-box {
    width: 100%;
  }
}
</style>
