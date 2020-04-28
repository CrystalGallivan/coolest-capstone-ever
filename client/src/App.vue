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
    computed: {
      menu() {
        if (this.$store.router.currentRoute.path == "/menu") {
          return false;
        } else {
          return true;
        }

      },
      owned() {
        //FIXME Will need to be changed for new admins that have no sites yet
        return this.$store.state.userSites.mySites ? this.$store.state.userSites.mySites.length > 0 : false
      },
      user() {
        return this.$store.state.user
      },
      site() {
        return this.$store.state.site
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout', this.creds)

      },
      openSiteSelect() {
        this.$store.dispatch('changeSite')
      },
      // clearRecipe() {
      //   this.$store.dispatch('clearRecipe')
      // }
      createActiveRecipe() {
        this.$store.dispatch('createActiveRecipe')
      }
    },
    mounted() {
      $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $("#page-content-wrapper").toggleClass("toggled")
      });
      this.$store.dispatch("authenticate")
    },
    components: {
      Login
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: whitesmoke;
    user-select: none;
    margin-top: 5%;
  }

  #toggle-btn {
    background-color: white;
  }

  #app-toggle-selection {
    color: rgb(5, 38, 45);
    font-weight: bold;
  }

  .btn-group-toggle {
    margin: 1%;
  }
</style>