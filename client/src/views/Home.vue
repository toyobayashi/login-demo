<template>
  <div class="home">
    <h2>注册测试</h2>
    <div class="login">
      <div>
        <span>用户名</span>
        <input type="text" v-model="form.code" />
      </div>
      <div>
        <span>密码</span>
        <input type="text" v-model="form.pass" />
      </div>
    </div>
    <div>
      <button @click="_register">注册</button>
    </div>

    <h2>登陆测试</h2>
    <div class="login">
      <div>
        <span>用户名</span>
        <input type="text" v-model="login.code" />
      </div>
      <div>
        <span>密码</span>
        <input type="text" v-model="login.pass" />
      </div>
    </div>
    <div>
      <button @click="_login">登录</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { register, login } from '@/api/index'

@Component
export default class Home extends Vue {
  public form: any = {
    code: '',
    pass: ''
  }

  public login: any = {
    code: '',
    pass: ''
  }

  public _register () {
    register(this.form.code, this.form.pass)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  public _login () {
    login(this.login.code, this.login.pass)
      .then(res => {
        console.log(res)
        if (res.data) {
          this.$store.commit('SET_TOKEN', {
            token: res.data.token
          })
          this.$router.push({ name: 'about' })
        }
      })
      .catch(err => console.log(err))
  }
}
</script>

<style lang="stylus" scoped>
.home
  .login
    div
      width 250px
      margin 0 auto
      display flex
      justify-content space-between
</style>

