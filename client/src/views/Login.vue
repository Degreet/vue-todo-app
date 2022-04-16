<template>
  <div class="login">
    <h1>Log in</h1>
    <form @submit.prevent="regHandler">
      <div class="row">
        <div class="input-field col s12">
          <input v-model="email" placeholder="example@gmail.com" id="email" type="text" class="validate">
          <label for="email">Enter your email</label>
        </div>
        <div class="input-field col s12">
          <input v-model="password" placeholder="Password" id="password" type="password" class="validate">
          <label for="password">Enter your password</label>
        </div>
      </div>
      <button :disabled="disabled" class="waves-effect waves-light btn">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    disabled: false,
  }),
  methods: {
    ...mapActions(['login']),
    async regHandler() {
      this.disabled = true

      try {
        const { data } = await axios.post('/auth/login', {
          email: this.email,
          password: this.password,
        })

        if (!data.success) return
        this.login(data.token)
        this.$router.push('/')
      } catch (e) {
        console.error(e.response.data.error)
        window.M.toast({ html: e.response.data.error })
        this.disabled = false
      }
    },
  },
  mounted() {
    if (this.$store.state.isAuth) this.$router.push('/')
  }
}
</script>

<style scoped>

</style>
