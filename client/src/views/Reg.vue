<template>
  <div class="reg">
    <h1>Sign up</h1>
    <form @submit.prevent="regHandler">
      <div class="row">
        <div class="input-field col s12">
          <input v-model="email" placeholder="example@gmail.com" id="email" type="text" class="validate">
          <label for="email">Enter your email</label>
        </div>
        <div class="input-field col s12">
          <input v-model="password" placeholder="Min. 8 characters" id="password" type="password" class="validate">
          <label for="password">Enter your password</label>
        </div>
        <div class="input-field col s12">
          <input v-model="confirmPassword" placeholder="Repeat your password" id="confirmPassword" type="password" class="validate">
          <label for="confirmPassword">Confirm your password</label>
        </div>
      </div>
      <button :disabled="disabled" class="waves-effect waves-light btn">Sign up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'Reg',
  data: () => ({
    email: '',
    password: '',
    confirmPassword: '',
    disabled: false,
  }),
  methods: {
    ...mapActions(['login']),
    async regHandler() {
      const emailValidationRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

      if (!this.email.match(emailValidationRegExp)) {
        return window.M.toast({ html: 'Wrong email format' })
      } else if (this.password.length < 8) {
        return window.M.toast({ html: 'Password must contains 8 chars' })
      } else if (this.password !== this.confirmPassword) {
        return window.M.toast({ html: 'Passwords don\'t match' })
      }

      this.disabled = true

      try {
        const { data } = await axios.post('/auth/reg', {
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
