<template>
  <div class="menus-list">

    <!-- Menu List -->
    <!-- TODO Need to put in here a v-if so only the kitchens that a user has access to can see only those menus -->
    <div class="card-deck d-flex justify-content-center">
      <div class="card m-1" v-for="menu in menus" :key="menu._id">
        <div class="card-body">
          <div class="dropdown dropleft float-right">
            <!-- NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'" -->
            <button class="btn d-down p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <img src="../assets/menu-vertical-25.png" alt="" srcset="">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <!-- TODO data-target not working with passing the menu._id to the editMenuModal -->
              <a data-toggle="modal" data-target="#editMenuModal" class="dropdown-item"
                @click="setActiveMenu(menu)">Edit
                Menu</a>
              <!-- TODO Add that an admin can also delete menus; how to get user role? -->
              <a v-if="user._id == menu.authorId" @click='deleteMenu(menu._id)' class="dropdown-item" href="#">Delete
                Menu</a>
              <!-- TODO Need to add that an admin user can lock a menu -->
              <!-- <a @click='lockMenu(menuId)' class="dropdown-item" href="#">Lock
                Menu</a> -->
            </div>
          </div>
          <h5 class="card-title ml-4 open-menu" @click="openMenu(menu, menu._id)">{{menu.week}}</h5>
          <p class="card-text">{{menu.title}}</p>
          <p class="card-text">{{menu.kitchenId | findKitchenName(kitchens)}}</p>
          <!-- <p class="card-text">{{menu.date | formatDate }}</p> -->
        </div>
      </div>
    </div>

    <menu-edit-modal />

  </div>
</template>

<script>
  import MenuEditModal from '@/components/MenuEditModal.vue'
  // import moment from 'moment'

  export default {
    name: "MenusList",
    mounted() {
      //   this.$store.dispatch('getMenus');
    },
    data() {
      return {}
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      menus() {
        return this.$store.state.menus
      },
      site() {
        return this.$store.state.site
      },
      kitchens() {
        return this.$store.state.site.kitchens
      },
    },
    methods: {
      setActiveMenu(menu) {
        this.$store.dispatch('setActiveMenu', menu)
      },
      deleteMenu(menuId) {
        this.$store.dispatch('deleteMenu', menuId)
      },
      openMenu(menu, menuId) {
        this.$store.dispatch('setActiveMenu', menu)
        this.$router.push({ name: 'Menu', params: { menuId } })
      },
    },
    filters: {
      // formatDate(date) {
      //   if (date) {
      //     return moment(date).add(1, 'd').format('MMM Do, YYYY')
      //   }
      // },
      findKitchenName(id, kitchens) {
        if (id && kitchens) {
          let ks = kitchens
          return ks.find(x => x._id === id).name
        }
      }
    },
    components: {
      MenuEditModal
    }
  }
</script>

<style scoped>
  .card {
    color: black;
    min-width: 10rem;
    min-height: 7rem;
    max-width: fit-content;
  }

  .card-title {
    margin-top: 3px;
    /* margin-bottom: 16px; */
    /* margin-right: 25px; */
  }

  .card-body {
    padding: 2px;
  }

  .open-menu {
    cursor: pointer;
  }

  .open-menu:hover {
    color: rgb(109, 197, 154);
  }

  .dropdown-item {
    cursor: pointer;
  }
</style>