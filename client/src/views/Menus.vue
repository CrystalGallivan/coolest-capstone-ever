<template>
  <div class="row menus">
    <div class="col-12 text-center mt-3">
      <h1 class="menu-page-title">Menus</h1>
    </div>

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
              <div class="form-group">
                <label for="menuInputWeek" class="mt-2 mb-0">Week</label>
                <input v-model="newMenu.week" type="text" class="form-control" id="menuInputWeek"
                  aria-describedby="menuWeekHelp" placeholder="Enter Menu's Week" required>
                <small id="menuWeekHelp" class="form-text text-muted">Enter the menu's week i.e. Week 1</small>
              </div>
              <div class="form-group">
                <label for="menuInputTitle" class="mt-2 mb-0">Title</label>
                <input v-model="newMenu.title" type="text" class="form-control" id="menuInputTitle"
                  aria-describedby="menuTitleHelp" placeholder="Enter Menu's Title" required>
                <small id="menuTitleHelp" class="form-text text-muted">Enter the menu's title i.e. Southwest</small>
              </div>
              <div class="form-group">
                <label for="menuInputDate" class="mt-2 mb-0">Date</label>
                <input v-model="newMenu.date" value="" type="date" class="form-control" id="menuInputDate"
                  aria-describedby="menuDateHelp" placeholder="Enter Menu's Date" required>
                <small id="menuDateHelp" class="form-text text-muted">Enter the start date</small>
              </div>
              <div class="form-group mb-4">
                <label for="inputMenuKitchen" class="mt-2 mb-0">Kitchen</label>
                <select v-model="newMenu.kitchenId" class="form-control kitchenSelect" id="inputMenuKitchen"
                  aria-describedby="menuKitchenHelp" placeholder="Select Kitchen" required>
                  <option disabled value="">Select Kitchen</option>
                  <!-- TODO Need to figure out to restrict this to only the kitchens that the user belongs/has access to: v-if="user.mySites.kitchens._id == kitchen._id || user.memberSites.kitchens._id == kitchen._id"-->
                  <option v-for="kitchen in kitchens" :key="kitchen._id" v-bind:value="kitchen._id"> {{kitchen.name}}
                  </option>
                </select>
                <small id="menuKitchenHelp" class="form-text text-muted">Enter kitchen here i.e. 17C</small>
              </div>
              <div class="form-group">
                <!-- <h6>Days of the Week:</h6> -->
                <div class="form-check form-check-inline" v-for="day of options">
                  <input class="form-check-input" type="checkbox" name="dayCheck" id="dayCheck" v-model="selected"
                    v-bind:key="day.value" :value="day.value">
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


    <!-- Menu List -->
    <div class="col-12 d-flex justify-content-center mt-1">
      <div class="card m-2" style="width: 18rem;" v-for="menu in menus" :key="menu._id">
        <div class="card-body">
          <h5 class="card-title">{{menu.week}}</h5>
          <p class="card-text"> {{menu.title}} </p>
          <p class="card-text"> {{menu.date}} </p>
          <p class="card-text"> {{menu.kitchenId}} </p>
          <p class="card-text"> Created By: {{menu.authorId}} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Menus",
    mounted() {
      this.$store.dispatch('getMenus');
    },
    props: [],
    data() {
      return {
        newMenu: {
          week: '',
          title: '',
          date: '',
          days: this.selected,
          kitchenId: '',
        },
        selected: [], // Must be an array reference!
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
      menus() {
        return this.$store.state.menus
      },
      user() {
        return this.$store.state.user
      },
      site() {
        return this.$store.state.site
      },
      kitchens() {
        return this.$store.state.site.kitchens
      },
    },
    methods: {
      createMenu() {
        debugger
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
      }
    },
    components: {}
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

  #menuModal {
    margin-top: 10%;
  }

  /* input,
  select {
    text-align: center;
  } */

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

  .card {
    color: black;
  }
</style>