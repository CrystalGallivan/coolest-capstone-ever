<template>
  <div id="app">
    <!-- Router View -->
    <router-view />
  </div>
</template>

<script>
  import Login from "@/views/Login.vue";
  import { mapGetters } from "vuex";
  import { mapState } from "vuex";

  export default {
    name: "APP",
    components: {
      Login,
    },
    created() {
      this.$store.dispatch("loadLastKitchen");
      this.$store.dispatch("loadLastSite");
      // this.$store.dispatch("getAllSigns");
      // this.$store.dispatch("setDay")
    },
    computed: {
      ...mapGetters(["setDay"]),
    },
  };
</script>

<style scoped>

  #app {
    font-family: "Open Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: whitesmoke;
    user-select: none;
    min-height: 100vh;
    background-color: rgb(5, 38, 45);
    /* max-width: 100vw;
    max-height: 100vh; */
  }
</style>

