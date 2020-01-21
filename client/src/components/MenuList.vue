<template>
  <div class="menu-list">

    <!-- Menu List -->
    <!-- TODO Need to put in here a v-if so only the kitchens that a user has access to can see only those menus -->
    <div class="card-deck d-flex justify-content-center">
      <div class="card m-1" v-for="menu in menus" :key="menu._id">
        <div class="card-body">
          <div class="dropdown dropleft float-right">
            <!-- NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'" -->
            <button class="btn d-down menuBtn p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <img src="../assets/menu-vertical-25.png" alt="" srcset="">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a data-toggle="modal" data-target="'#editMenuModal'+menu._id" class="dropdown-item">Edit
                Menu</a>
              <!-- TODO Add that an admin can also delete menus; how to get user role? -->
              <a v-if="user._id == menu.authorId" @click='deleteMenu(menu._id)' class="dropdown-item" href="#">Delete
                Menu</a>
              <!-- TODO Need to add that an admin user can lock a menu -->
              <!-- <a @click='lockMenu(menuId)' class="dropdown-item" href="#">Lock
                Menu</a> -->
            </div>
          </div>
          <h5 class="card-title ml-4" @click="openMenu(menu._id)">{{menu.week}}</h5>
          <p class="card-text"> {{menu.title}} </p>
          <!-- TODO Get the date to show up mm/dd/yyyy -->
          <p class="card-text"> {{menu.date}} </p>
          <p class="card-text"> {{menu.kitchenId}} </p>
          <p class="card-text"> Created By: {{menu.authorId}} </p>
        </div>
      </div>
    </div>

    <!-- Edit Menu Modal -->
    <div class="modal fade" id="'editMenuModal'+menu._id" tabindex="-1" role="dialog" aria-labelledby="menuModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="menuModalLabel">Menu Creator</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editMenu">
              <div class="form-group">
                <label for="menuInputWeek" class="mt-2 mb-0">Week</label>
                <input v-model="menu.week" type="text" class="form-control" id="menuInputWeek"
                  aria-describedby="menuWeekHelp" placeholder="Enter Menu's Week" required>
                <small id="menuWeekHelp" class="form-text text-muted">Enter the menu's week i.e. Week 1</small>
              </div>
              <div class="form-group">
                <label for="menuInputTitle" class="mt-2 mb-0">Title</label>
                <input v-model="menu.title" type="text" class="form-control" id="menuInputTitle"
                  aria-describedby="menuTitleHelp" placeholder="Enter Menu's Title" required>
                <small id="menuTitleHelp" class="form-text text-muted">Enter the menu's title i.e. Southwest</small>
              </div>
              <div class="form-group">
                <label for="menuInputDate" class="mt-2 mb-0">Date</label>
                <input v-model="menu.date" type="date" class="form-control" id="menuInputDate"
                  aria-describedby="menuDateHelp" placeholder="Enter Menu's Date" required>
                <small id="menuDateHelp" class="form-text text-muted">Enter the start date</small>
              </div>
              <div class="form-group mb-4">
                <label for="inputMenuKitchen" class="mt-2 mb-0">Kitchen</label>
                <select v-model="menu.kitchenId" class="form-control kitchenSelect" id="inputMenuKitchen"
                  aria-describedby="menuKitchenHelp" placeholder="Select Kitchen" required>
                  <option disabled value="">Select Kitchen</option>
                  <!-- TODO Need to figure out to restrict this to only the kitchens that the user belongs/has access to: v-if="user.mySites.kitchens._id == kitchen._id || user.memberSites.kitchens._id == kitchen._id" -->
                  <option v-for="kitchen in kitchens" :key="kitchen._id" v-bind:value="kitchen._id"> {{kitchen.name}}
                  </option>
                </select>
                <small id="menuKitchenHelp" class="form-text text-muted">Enter kitchen here i.e. 17C</small>
              </div>
              <div class="form-group">
                <!-- <h6>Days of the Week:</h6> -->
                <div class="form-check form-check-inline" v-for="day of options" :key="day.value">
                  <input class="form-check-input" type="checkbox" name="dayCheck" id="dayCheck" v-model="menu.days"
                    v-bind:value="day.value">
                  <label class="form-check-label" for="dayCheck1" checked>{{ day.name }}</label>
                </div>
              </div>
              <!-- NOTE Do we any restrictions to the save button? -->
              <button type="submit" class="btn btn-success mb-3 mt-3">Save Menu</button>
              <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: "MenuList",
    // mounted() {
    //   this.$store.dispatch('getMenus');
    // },
    props: ['menuData'],
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
      activeMenu() {
        return this.$store.state.activeMenu
      }
    },
    methods: {
      // setActiveMenu(menu) {
      //   this.$store.dispatch('setActiveMenu', menu)
      // },
      deleteMenu(menuId) {
        this.$store.dispatch('deleteMenu', menuId)
      },
      openMenu(menuId) {
        this.$router.push({ name: 'Menu', params: { menuId } })
      }

    },
    components: {}
  }
</script>

<style scoped>
  .card {
    color: black;
    min-width: fit-content;
    max-width: fit-content;
  }

  .card-title {
    margin-bottom: 16px;
  }

  #editMenuModal {
    margin-top: 10%;
  }

  .form-check-inline {
    justify-content: center;
    margin-right: 5px;
    margin-left: 0;
  }

  .form-check-input {
    margin-right: 0;
    width: 25px;
    height: 15px;
    /* min-width: .8rem; */
  }

  .form-check-label {
    font-size: 15px;
    /* margin-left: .5rem; */
  }
</style>