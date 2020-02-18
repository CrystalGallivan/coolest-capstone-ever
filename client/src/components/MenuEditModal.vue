<template>
  <div class="menu-edit-modal container">

    <!-- Edit Menu Modal -->
    <div class="modal fade" id="editMenuModal" tabindex="-1" role="dialog" aria-labelledby="menuModalLabel"
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
                <input v-model="activeMenu.week" type="text" class="form-control" id="menuInputWeek"
                  aria-describedby="menuWeekHelp" placeholder="Enter Menu's Week" required>
                <small id="menuWeekHelp" class="form-text text-muted">Enter the menu's week i.e. Week 1</small>
              </div>
              <div class="form-group">
                <label for="menuInputTitle" class="mt-2 mb-0">Title</label>
                <input v-model="activeMenu.title" type="text" class="form-control" id="menuInputTitle"
                  aria-describedby="menuTitleHelp" placeholder="Enter Menu's Title" required>
                <small id="menuTitleHelp" class="form-text text-muted">Enter the menu's title i.e. Southwest</small>
              </div>
              <div class="form-group">
                <label for="menuInputDate" class="mt-2 mb-0">Date</label>
                <input v-model="activeMenu.date" type="date" class="form-control" id="menuInputDate"
                  aria-describedby="menuDateHelp" placeholder="Enter Menu's Date" required>
                <small id="menuDateHelp" class="form-text text-muted">Enter the start date</small>
              </div>
              <div class="form-group mb-4">
                <label for="inputMenuKitchen" class="mt-2 mb-0">Kitchen</label>
                <select v-model="activeMenu.kitchenId" class="form-control kitchenSelect" id="inputMenuKitchen"
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
                <div class="form-check form-check-inline" v-for="day in activeDays" :key="day.name">
                  <input class="form-check-input" type="checkbox" name="dayCheck" id="dayCheck1"
                    v-model="activeMenu.days" v-bind:value="day">
                  <label class="form-check-label" for="dayCheck" checked>{{ day.name }}</label>
                </div>
                <!-- TODO Get this working so it shows the days that aren't in activeMenu days -->
                <!-- <div class="form-check form-check-inline" v-for="day in days" :key="day.name">
                        <input class="form-check-input" type="checkbox" name="dayCheck2" id="dayCheck2"
                          v-model="activeMenu.days" v-bind:value="day">
                        <label class="form-check-label" for="dayCheck2" checked>{{ day.name }}</label>
                      </div> -->
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
    name: "MenuEditModal",
    data() {
      return {
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
      },
      activeDays() {
        return this.$store.state.activeMenu.days
      },
      nonActiveDays() {
        debugger
        // TODO Get this working
        let d = this.days
        let aD = this.activeMenu.days
        // return missing = d.filter((i => a => a !== aD[i] || !++i)(0))
        let missing = aD.filter(e => !d.includes(e))
        this.missingDays = missing
        console.log(missing)
      },
    },
    methods: {
      editMenu() {
        // debugger
        this.$store.dispatch('editMenu', this.activeMenu)
        $("#editMenuModal").modal("hide");
        $(".modal-backdrop").remove();
      },

    },
    components: {}
  }
</script>

<style scoped>
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