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
      this.$store.dispatch("getAllSigns");
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
    background-color: var(--micron-bgc-color);
    /* max-width: 100vw;
    max-height: 100vh; */
  }

  :root {
    --cafe-36-yellow: rgb(246, 192, 14);
    --cafe-17c-teal: rgb(109, 197, 154);
    --micron-bgc-color: rgb(5, 38, 45);
  }
</style>