<template>
  <nav>
    <div class="container">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo">Todo App</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/">Home</router-link></li>
          <li v-if="!isAuth"><router-link to="/reg">Sign up</router-link></li>
          <li v-if="!isAuth"><router-link to="/login">Log in</router-link></li>
          <li v-if="isAuth"><router-link to="/todos">Todos</router-link></li>
          <li v-if="isAuth"><a href="#" @click="logOut">Log out</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "Navbar",
  computed: {
    ...mapState(['isAuth']),
  },
  methods: {
    ...mapActions(['logOut']),
  },
}
</script>

<style scoped>

</style>