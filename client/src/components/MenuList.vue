<template>
  <div class="menu-list">

    <!-- Menu List -->
    <!-- TODO Need to put in here a v-if so only the kitchens that a user has access to can see only those menus -->
    <div class="card-deck d-flex justify-content-center">
      <div class="card m-1" v-for="menu in menus" :key="menu._id" :menuData="menu">
        <div class="card-body">
          <div class="row menuRow">
            <div class="col-md-10 mb-0 p-0">
              <h5 class="card-title mb-0">{{menu.week}}</h5>
            </div>
            <div class="col-md-2 mb-2 p-0">
              <div class="dropdown dropleft d-flex justify-content-end align-self-right">
                <button class="btn d-down menuBtn p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  <img src="../assets/menu-vertical-25.png" alt="" srcset="">
                  <!-- NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'"-->
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a data-toggle="modal" :data-target="'#editMenuModal'+menu._id" class="dropdown-item" href="#">Edit
                    Menu</a>
                  <a @click='deleteMenu' class="dropdown-item" href="#">Delete Menu</a>
                </div>
              </div>
            </div>
          </div>

          <p class="card-text"> {{menu.title}} </p>
          <p class="card-text"> {{menu.date}} </p>
          <p class="card-text"> {{menu.kitchenId}} </p>
          <p class="card-text"> Created By: {{menu.authorId}} </p>
        </div>
      </div>
    </div>

    <edit-menu-modal />

  </div>
</template>

<script>
  import EditMenuModal from '@/components/EditMenuModal.vue'

  export default {
    name: "MenuList",
    // mounted() {
    //   this.$store.dispatch('getMenus');
    // },
    props: [],
    data() {
      return {
        menu: {
          week: '',
          title: '',
          date: '',
          days: [],
          kitchenId: '',
        },
        options: [
          { name: 'Monday', value: 'Monday' },
          { name: 'Tuesday', value: 'Tuesday' },
          { name: 'Wednesday', value: 'Wednesday' },
          { name: 'Thursday', value: 'Thursday' },
          { name: 'Friday', value: 'Friday' },
          { name: 'Saturday', value: 'Saturday' },
          { name: 'Sunday', value: 'Sunday' },
        ]
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      kitchens() {
        return this.$store.state.site.kitchens
      },
      menus() {
        return this.$store.state.menus
      },
    },
    methods: {
      deleteMenu() {

      }
    },
    components: {
      EditMenuModal
    }
  }
</script>

<style scoped>
  .card {
    color: black;
    min-width: fit-content;
    max-width: fit-content;
  }

  .card-title {
    margin-left: 55px;
  }

  .col-md-10 {
    height: 24px;
  }

  .menuRow {
    height: 24px;
    margin-bottom: 16px;
  }

  /* .menuBtn {
    margin-left: 35px;
  } */
</style>