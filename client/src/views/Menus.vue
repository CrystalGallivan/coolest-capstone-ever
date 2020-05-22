<template>
  <div class="row menus">
    <div class="col-12 text-center mt-3">
      <h1 class="menu-page-title">Menus</h1>
    </div>

    <!-- <div class="col"> 
      TODO Need to connect the kitchen selector once that is working which will be after admins can add users to kitchens -->
    <!-- <kitchen-selector /> -->
    <!-- </div> -->

    <!-- Create Menu Button -->
    <div class="col-12 d-flex justify-content-center">
      <button type="button" class="btn btn-sm create-new-menu-bg mb-5 mt-4" data-toggle="modal"
        data-target="#menuModal">
        Create New Menu
      </button>
    </div>

    <!-- Create Menu Modal -->
    <div class="modal fade" id="menuModal" tabindex="-1" role="dialog" aria-labelledby="menuModalLabel"
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
            <form @submit.prevent="createMenu">
              <div class="form-group" v-if>
                <label for="menuWeek" class="mt-2 mb-0">Week</label>
                <input v-model="newMenu.week" type="text" class="form-control" id="menuWeek"
                  aria-describedby="menuWeekHelp" placeholder="Enter Menu's Week" required>
                <small id="menuWeekHelp" class="form-text text-muted">Enter the menu's week i.e. Week 1</small>
              </div>
              <div class="form-group">
                <label for="menuTitle" class="mt-2 mb-0">Title</label>
                <input v-model="newMenu.title" type="text" class="form-control" id="menuTitle"
                  aria-describedby="menuTitleHelp" placeholder="Enter Menu's Title" required>
                <small id="menuTitleHelp" class="form-text text-muted">Enter the menu's title i.e. Southwest</small>
              </div>
              <div class="form-group">
                <label for="menuDate" class="mt-2 mb-0">Date</label>
                <input v-model="newMenu.date" data-date-format="mm/dd/yyyy" type="date" class="form-control"
                  id="menuDate" aria-describedby="menuDateHelp" placeholder="Enter Menu's Date" required>
                <small id="menuDateHelp" class="form-text text-muted">Enter the start date</small>
              </div>
              <div class="form-group mb-4">
                <label for="menuKitchen" class="mt-2 mb-0">Kitchen</label>
                <select v-model="newMenu.kitchenId" class="form-control" id="menuKitchen"
                  aria-describedby="menuKitchenHelp" placeholder="Select Kitchen" required>
                  <option disabled value="">Select Kitchen</option>
                  <!-- TODO Need to figure out to restrict this to only the kitchens that the user belongs/has access to: v-if="site.mySites.kitchens._id == kitchen._id || site.memberSites.kitchens._id == kitchen._id"-->
                  <option v-for="kitchen in kitchens" :key="kitchen._id" v-bind:value="kitchen._id"> {{kitchen.name}}
                  </option>
                </select>
                <small id="menuKitchenHelp" class="form-text text-muted">Enter kitchen here i.e. 17C</small>
              </div>
              <div class="form-group">
                <div class="form-check form-check-inline" v-for="day of days" :key="day.name">
                  <input class="form-check-input" type="checkbox" name="dayCheck" id="dayCheck" v-model="newMenu.days"
                    v-bind:value="day">
                  <label class="form-check-label" for="dayCheck1" checked>{{ day.name }}</label>
                </div>
              </div>
              <!-- NOTE Do we need any restrictions to the save button? -->
              <button type="submit" class="btn btn-success mb-3 mt-3">Save Menu</button>
              <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu List -->
    <div class="col">
      <menus-list />
    </div>

  </div>
</template>

<script>
  import MenusList from '@/components/MenusList.vue'
  // import KitchenSelector from '@/components/KitchenSelector.vue'

  export default {
    name: "Menus",
    mounted() {
      // this.$store.dispatch('getMenus');
    },
    data() {
      return {
        newMenu: {
          week: '',
          title: '',
          days: [],
          date: '',
          kitchenId: '',
        },
        days: [
          {
            name: 'Monday',
          }, {
            name: 'Tuesday',
          }, {
            name: 'Wednesday',
          }, {
            name: 'Thursday',
          }, {
            name: 'Friday',
          }, {
            name: 'Saturday',
          }, {
            name: 'Sunday',
          },
        ],
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
      createMenu() {
        this.$store.dispatch('createMenu', this.newMenu)
        setTimeout(() => {
          this.newMenu.week = ''
          this.newMenu.title = ''
          this.newMenu.date = ''
          this.newMenu.days = []
          this.newMenu.kitchenId = ''
        }, 1000);
        $("#menuModal").modal("hide");
        $(".modal-backdrop").remove();
      },
    },
    components: {
      MenusList,
      // KitchenSelector
    }
  }
</script>

<style scoped>
  .menu-page-title {
    font-family: 'Pacifico', cursive;
    color: rgb(109, 197, 154);
    font-size: 70px;
  }

  .create-new-menu-bg {
    background-color: white;
    font-weight: 600;
    color: rgb(5, 38, 45);
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
  }

  .form-check-label {
    font-size: 15px;
  }

  .menuDaysLabel {
    margin-right: 32%;
    margin-left: 32%;
    font-weight: 700;
  }
</style>