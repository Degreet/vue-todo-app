<template>
  <Navbar/>
  <div class="container">
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
<script>
import Navbar from './components/Navbar'
import { mapMutations } from 'vuex'

export default {
  components: { Navbar },
  methods: {
    ...mapMutations(['setIsAuth', 'loadToken']),
  },
  mounted() {
    this.loadToken()
    this.setIsAuth()
  }
}
</script>