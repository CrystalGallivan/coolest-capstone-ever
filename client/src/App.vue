<template>
  <div id="app">
    <!-- Site Selector Modal -->
    <!-- <login /> -->
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="btn active" id="toggle-btn">
        <input type="radio" name="options" id="option1" checked>
        <router-link to='/login'><a href="#" id="app-toggle-selection">Login</a></router-link>
      </label>
      <label class="btn" id="toggle-btn">
        <input type="radio" name="options" id="option2">
        <router-link to='/screen-selection'><a href="#" id="app-toggle-selection">Select Digital Menu</a></router-link>
      </label>
    </div>
    <site-selector />
    <router-view />
  </div>
</template>

<script>
  import Login from '@/views/Login.vue'
  import SiteSelector from "@/components/SiteSelector.vue"

  export default {
    name: "APP",
    computed: {
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
      SiteSelector,
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