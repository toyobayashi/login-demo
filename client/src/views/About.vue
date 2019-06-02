<template>
  <div class="about">
    <h1>{{user.code}}</h1>
    <h1>{{user.name}}</h1>
    <button @click="_logout">退出</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getUserInfo } from '@/api/index'

@Component
export default class About extends Vue {
  public user: any = {
    code: '',
    name: ''
  }

  public _logout () {
    this.$store.commit('SET_TOKEN', { token: '' })
    this.$router.replace({ name: 'home' })
  }

  public mounted () {
    this.$nextTick(() => {
      getUserInfo()
        .then(res => {
          console.log(res)
          if (res.data) {
            this.user.code = res.data.code
            this.user.name = res.data.name
          }/*  else {
            this.$router.replace({ name: 'home' })
          } */
        })
        .catch(err => console.log(err))
    })
  }
}
</script>

