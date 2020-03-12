<template>
  <div class="menu-days-list col-4 d-flex justify-content-center">

    <div class="card mt-2 mr-1" v-for="day in days" :key="day._id" :dayData="day">
      <div class="card-header">
        <h5 class="card-title mb-1 mt-1 dayTitle">{{day.name}}</h5>
        <!-- <h6 class="card-text">{{activeMenu.date}}</h6> -->
      </div>
      <div class="card-body">

        <div class="row">
          <div class="col-12">
            <div class="dropdown dropleft float-right">
              <!-- NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'" -->
              <button class="btn d-down p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" @click="setActiveDay(day)">
                <img src="../assets/menu-vertical-25.png" alt="" srcset="">
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a data-toggle="modal" data-target="#addCategoryModal" class="dropdown-item"
                  @click="setTimeOfDay('breakfast')">Add
                  Categories</a>
              </div>
            </div>
            <h6 class="mb-1 mt-1 ml-3 dayTime">Breakfast:</h6>
            <div class="card mt-2 mr-1 categoryCard" v-for="category in day.breakfast" :key="category._id">
              <div class="card-header">
                <div class="dropdown dropleft float-right">
                  <!-- NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'" -->
                  <button class="btn d-down p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" @click="setActiveDay(day)">
                    <img src="../assets/menu-vertical-25.png" alt="" srcset="">
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" @click="setActiveDay(day)">
                    <!-- TODO Add that an admin can also delete categories; how to get user role? -->
                    <a v-if="user._id == activeMenu.authorId" @click="deleteCategoryBreakfast(category._id, day)"
                      class="dropdown-item" href="#">Delete Category</a>
                  </div>
                </div>
                <h5 class="card-title mb-0 ml-1">{{category.title}}</h5>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="dropdown dropleft float-right">
              <!-- NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'" -->
              <button class="btn d-down p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" @click="setActiveDay(day)">
                <img src="../assets/menu-vertical-25.png" alt="" srcset="">
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a data-toggle="modal" data-target="#addCategoryModal" class="dropdown-item"
                  @click="setTimeOfDay('lunch')">Add
                  Categories</a>
              </div>
            </div>
            <h6 class="mb-1 mt-1 ml-3 dayTime">Lunch:</h6>
            <div class="card mt-2 mr-1 categoryCard" v-for="category in day.lunch" :key="category._id">
              <div class="card-header">
                <div class="dropdown dropleft float-right">
                  <!-- NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'" -->
                  <button class="btn d-down p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" @click="setActiveDay(day)">
                    <img src="../assets/menu-vertical-25.png" alt="" srcset="">
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" @click="setActiveDay(day)">
                    <!-- TODO Add that an admin can also delete categories; how to get user role? -->
                    <a v-if="user._id == activeMenu.authorId" @click="deleteCategoryLunch(category._id, day)"
                      class="dropdown-item" href="#">Delete Category</a>
                  </div>
                </div>
                <h5 class="card-title m-1 ml-1">{{category.title}}</h5>
              </div>
            </div>
          </div>
        </div>

        <!-- NOTE This is for if I can get the other component working to render categories if I need to do that for drag and drop -->
        <!-- <menu-category-list /> -->
        <!-- v-for="category in days.categories" :key="category.title" :categoryData="category" -->
      </div>
    </div>

    <!-- Create Category Modal -->
    <div class="modal fade" id="addCategoryModal" tabindex="-1" role="dialog" aria-labelledby="categoryModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCategoryModalLabel">Station Creator</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addCategory">
              <div class="form-group">
                <div class="form-check form-check-inline" v-for="category of categories" v-bind:key="category.title">
                  <input class="form-check-input" type="checkbox" name="categoryCheck" id="categoryCheck"
                    v-model="lCategories" v-bind:value="category">
                  <label class="form-check-label" for="categoryCheck1" checked>{{ category.title }}</label>
                </div>
              </div>
              <button type="submit" class="btn btn-success">Save Category</button>
              <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // import MenuCategoryList from '@/components/MenuCategoryList.vue'

  export default {
    name: "MenuDaysList.vue",
    props: [],
    mounted() {
      this.firstSetActiveDay()
      this.$store.dispatch('getMenuById', this.activeMenu._id)
    },
    data() {
      return {
        currentTimeOfDay: "",
        lCategories: [],
        currentDayId: "",
        categories: [
          {
            title: "Breakfast Bar",
          },
          {
            title: "Chef's Choice",
          },
          {
            title: "Deli",
          },
          {
            title: "General",
          },
          {
            title: "Global",
          },
          {
            title: "Grill",
          },
          {
            title: "Hot Entree",
          },
          {
            title: "Pizza",
          },
          {
            title: "Salad Bar",
          },
          {
            title: "Soup",
          },
          {
            title: "Southwest",
          },
          {
            title: "Sushi",
          },
        ]
      }
    },
    computed: {
      days() {
        return this.$store.state.activeMenu.days
      },
      user() {
        return this.$store.state.user
      },
      activeMenu() {
        return this.$store.state.activeMenu
      },
      activeDay() {
        return this.$store.state.activeDay
      },
    },
    methods: {
      deleteDay(dayId) { },
      firstSetActiveDay() {
        let day = this.activeMenu.days[0]
        this.$store.dispatch('setActiveDay', day)
        this.currentDayId = day._id
      },
      setActiveDay(day) {
        this.$store.dispatch('setActiveDay', day)
        this.currentDayId = day._id
      },
      setTimeOfDay(value) {
        this.currentTimeOfDay = value
      },
      addCategory() {
        debugger
        let newCategories = this.lCategories.map(v => ({ ...v, dayId: this.currentDayId }))
        let day = this.activeDay
        let daysArr = this.activeMenu.days
        let indexOfDay = daysArr.findIndex((e) => e._id === day._id)
        if (daysArr[indexOfDay] && this.currentTimeOfDay === "breakfast") {
          day.breakfast = day.breakfast.concat(newCategories)
        } else if (daysArr[indexOfDay] && this.currentTimeOfDay === "lunch") {
          day.lunch = newCategories
        } else {
          day.dinner = newCategories
        }
        let menu = this.activeMenu
        this.$store.dispatch('editMenu', menu)
        $("#addCategoryModal").modal("hide");
        $(".modal-backdrop").remove();
        this.lCategories = []
        // this.$store.dispatch('getMenuById', menu._id)
      },
      deleteCategoryBreakfast(id, day) {
        day.breakfast = day.breakfast.filter(category => category._id !== id)
        this.$store.dispatch('editMenu', this.activeMenu)
      },
      deleteCategoryLunch(id, day) {
        day.lunch = day.lunch.filter(category => category._id !== id)
        this.$store.dispatch('editMenu', this.activeMenu)
      },
    },
    components: {
      // MenuCategoryList
    }
  }
</script>

<style scoped>
  .card {
    color: black;
    /* min-height: 68vh; */
    max-height: fit-content;
    min-width: 13.6vw;
    background-color: rgb(194, 194, 194);
  }

  .dayTitle {
    font-weight: 600;
  }

  .categoryCard {
    min-width: 10px;
    /* border: solid 2px black; */
    border: none;
    /* margin-left: 5px; */
  }

  .card-header,
  .card-body {
    padding: 5px 2px;
  }

  .card-header {
    /* border: none; */
    border-radius: 5px;
    margin: 1.5px;
    background-color: #fff;
  }

  .card-body {
    margin-left: 3px;
  }

  .dayTime {
    font-weight: 600;
  }

  #addCategoryModal {
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