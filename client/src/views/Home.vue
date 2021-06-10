<template>
  <div id="home">
    <!-- Navbar -->
    <div id="navbar">
      <div id="home-view">
        <ul class="navbar">
          <li class="d-flex justify-content:flex-start;"><a href="#sidebar-wrapper" role="button" aria-expanded="false"
              class="btn btn-outline-secondary" data-toggle="#wrapper #page-content-wrapper"
              aria-controls="wrapper page-content-wrapper" id="menu-toggle"><img src="../assets/iconFinalLeaf.png"></a>
          </li>
          <router-link to='/communication'><img src="../assets/finalLogo2.png"></router-link>
          <div v-if="user._id" class="dropdown dropleft">
            <button class="btn btn-outline-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <img src="../assets/icons8-user-menu-male-35.png" alt="" srcset="">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a @click='logout' class="dropdown-item" href="#">Logout</a>
              <a @click='openSiteSelect' class="dropdown-item" href="#">Change Site</a>
              <a @click='openKitchenSelect' class="dropdown-item" href="#">Change Kitchen</a>
              <!-- <a class="dropdown-item" href="#"> -->
              <!-- <kitchen-selector /> -->
              <!-- </a> -->
              <!-- <router-link v-if="owned" to="/admin"><a class="dropdown-item" href="#">Admin Options</a> -->
              </router-link>
            </div>
          </div>
          <div v-else class="dropdown dropleft">
            <button class="btn btn-outline-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <img src="../assets/icons8-user-menu-male-35.png" alt="" srcset="">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item">Login</a>
            </div>
          </div>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav">
            <h4><b>Directory</b></h4>
            <!-- <li>
             <router-link to='/dashboard'><a href="#">Dashboard</a></router-link>
               </li> -->
            <li>
              <router-link to='/communication'><a href="#">Communication</a></router-link>
            </li>
            <li>
              <router-link to='/menus'><a href="#">Menus</a></router-link>
            </li>
            <li>
              <router-link @click.native="createActiveRecipe" to='/costing'><a href="#">Costing</a></router-link>
            </li>
            <li>
              <router-link to='/edit-screens'><a href="">Edit Screens</a></router-link>
            </li>
            <li>
            <li>
              <router-link to='/recipes'><a href="#">Recipes</a></router-link>
            </li>
            <li>
              <router-link to='/ingredient'><a href="#">Add New Ingredient</a></router-link>
            </li>
            <li>
              <a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false"
                aria-controls="collapseOne">Calculator</a>
              <div id="collapseOne" class="collapse">
                <calculator />
              </div>
            </li>
            <li>
              <p>
                <a class="btn btn-light" id="screen-selection-btn" data-toggle="collapse" href="#collapseSelections"
                  role="button" aria-expanded="false" aria-controls="collapseExample">
                  Digital Screen Selection
                </a>
              </p>
              <screen-list-17 />
              <screen-list-36 />
            </li>
          </ul>
        </div>
        <!-- Page Content -->
        <div id="page-content-wrapper">
          <router-view />
        </div>
      </div>
      <!-- Site Selector Modal -->
      <site-selector />
      <!-- Kitchen Selector Modal -->
      <kitchen-selector />
    </div>
    <loading v-if="loading == true" />
  </div>
</template>

<script>
  import Calculator from '@/components/Calculator.vue'
  import SiteSelector from "@/components/SiteSelector.vue"
  import ScreenList17 from "@/components/17CScreenList.vue"
  import ScreenList36 from "@/components/36ScreenList.vue"
  import KitchenSelector from "@/components/KitchenSelector.vue"
  import Loading from "@/components/Loading.vue"
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";

  export default {
    name: "Home",
    props: ["siteId"],
    computed: {
      ...mapGetters([
        "kitchen"
      ]),
      ...mapState([
        "user",
        "site",
        "loading"
      ]),
      owned() {
        //FIXME Will need to be changed for new admins that have no sites yet
        return this.$store.state.userSites.mySites ? this.$store.state.userSites.mySites.length > 0 : false
      }
    },
    methods: {

      logout() {
        this.$store.dispatch('logout', this.creds)
      },
      openSiteSelect() {
        this.$store.dispatch('changeSite')
      },
      openKitchenSelect() {
        this.$store.dispatch('changeKitchen')
      },
      // clearRecipe() {
      //   this.$store.dispatch('clearRecipe')
      // }
      createActiveRecipe() {
        this.$store.dispatch('createActiveRecipe')
      }
    },
    mounted() {
      // const router = new VueRouter({});
      $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $("#page-content-wrapper").toggleClass("toggled")
      });
      this.$store.dispatch("authenticate")
      // router.beforeEach((to, from, next) => {
      //   this.loading = true;
      //   next();
      //   //TODO  Figure out how to trigger the route change to activate loading
      // }),
      // this.$route.afterEach((to, from) => {
      //   this.loading = false;
      // })

    },
    components: {
      Calculator,
      SiteSelector,
      KitchenSelector,
      ScreenList17,
      ScreenList36,
      Loading
    }
  }
</script>
<style>
  #screen-selection-btn {
    color: rgb(5, 38, 45);
    margin-top: 20px;
    margin-bottom: 5px;
  }

  #home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: whitesmoke;
    user-select: none;
  }

  #home-nav {
    background-color: rgb(109, 197, 154);
    padding: -10px;
    display: flex;
    justify-content: center;
    align-content: flex-start;
  }

  body {
    background-color: rgb(5, 38, 45);
  }

  #navbar {
    position: absolute;
    height: 80px;
    width: 100%;
    background-color: #fff;
    border: 5px #42b98385;
    color: rgb(5, 38, 45);
    top: 0;
    margin-bottom: 0px;
    /* box-shadow: 0px 3px 2px grey; */
  }

  /* wrapper */
  #sidebar-wrapper {
    position: absolute;
    width: 0px;
    min-height: 100%;
    overflow-y: hidden;
    background-color: whitesmoke;
    border: 5px #42b983;
    margin-left: -15px;
    margin-bottom: -80px;
    padding-top: 20px;
    margin-top: -3px;
  }

  /* Page */
  #page-content-wrapper {
    position: absolute;
    margin-top: -18px;
    width: 99.84%;
    border: 5px #fff;
  }

  /* Displayed */
  #wrapper.toggled #sidebar-wrapper {
    width: 250px;
    position: absolute;
  }

  #wrapper.toggled #page-content-wrapper {
    padding-left: 235px;
    position: static;
  }

  .sidebar-nav {
    padding: 0;
    list-style: none;
  }

  .sidebar-nav li {
    line-height: 35px;
  }

  .sidebar-nav li a {
    display: block;
    text-decoration: none;
    color: rgb(5, 38, 45);
  }

  .sidebar-nav li a:hover {
    background: rgb(109, 197, 154);
  }
</style>