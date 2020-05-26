<template>
  <div id="app">
    <!-- Router View -->
    <router-view />
  </div>
</template>

<script>
  import Login from '@/views/Login.vue'

  export default {
    name: "APP",
    components: {
      Login
    },
    created() {
      this.$store.dispatch("loadLastKitchen")
      this.$store.dispatch("loadLastSite")
      this.$store.dispatch("getAllSigns")
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: whitesmoke;
    user-select: none;
    margin-top: 5%;
  }
</style>