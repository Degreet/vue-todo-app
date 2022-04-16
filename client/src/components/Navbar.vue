<template>
  <nav>
    <div class="container">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo">Todo App</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/reg">Sign up</router-link></li>
          <li><router-link to="/login">Log in</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
}
</script>

<style scoped>

</style>