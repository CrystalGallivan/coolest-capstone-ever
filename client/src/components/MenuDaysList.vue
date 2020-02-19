<template>
  <div class="menu-days-list col-4 d-flex justify-content-center">

    <div class="card mt-2 mr-1" v-for="day in days" :key="day._id">
      <div class="card-body">
        <div class="dropdown dropleft float-right">
          <!-- NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'" -->
          <button class="btn d-down p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false" @click="setActiveDay(day)">
            <img src="../assets/menu-vertical-25.png" alt="" srcset="">
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a data-toggle="modal" data-target="#addCategoryModal" class="dropdown-item">Add
              Category</a>
            <!-- TODO Add that an admin can also delete days; how to get user role? -->
            <a v-if="user._id == activeMenu.authorId" @click="deleteDay(day._id)" class="dropdown-item" href="#">Delete
              Day</a>
          </div>
        </div>
        <h5 class="card-title">{{day.name}}</h5>
        <menu-category-list />
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
              <div class="form-group mb-4">
                <label for="inputCategoryName" class="mt-2 mb-0">Station</label>
                <select v-model="title" class="form-control" id="inputCategoryName" aria-describedby="categoryNameHelp"
                  placeholder="Select Station" required>
                  <option disabled value="">Choose Station</option>
                  <option value="Breakfast Bar">Breakfast Bar</option>
                  <option value="Chef's Choice">Chef's Choice</option>
                  <option value="Deli">Deli</option>
                  <option value="General">General</option>
                  <option value="Global">Global</option>
                  <option value="Grill">Grill</option>
                  <option value="Hot Entree">Hot Entree</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Salad Bar">Salad Bar</option>
                  <option value="Soup">Soup</option>
                  <option value="Southwest">Southwest</option>
                  <option value="Sushi">Sushi</option>
                </select>
                <small id="categoryNameHelp" class="form-text text-muted">Select station from the options above</small>
              </div>
              <button type="submit" class="btn btn-success mb-3 mt-3">Save Category</button>
              <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import MenuCategoryList from '@/components/MenuCategoryList.vue'

  export default {
    name: "MenuDaysList.vue",
    props: [],
    data() {
      return {
        title: ''
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
      addCategory() {
        debugger
        let newCategory = {
          title: this.title,
          dayId: this.activeDay._id
        }
        let updatedDay = this.activeDay
        updatedDay.categories.push(newCategory)
        // let payload = {
        // menu: this.activeMenu,
        // day: updatedDay
        // }
        // this.$store.dispatch('editDay', updatedDay)
        $("#addCategoryModal").modal("hide");
        $(".modal-backdrop").remove();
      },
      deleteDay(dayId) {

      },
      setActiveDay(day) {
        this.$store.dispatch('setActiveDay', day)
      },
    },
    components: {
      MenuCategoryList
    }
  }
</script>

<style scoped>
  .card {
    color: black;
    /* min-height: 68vh; */
    max-height: fit-content;
    min-width: 13.6vw;
  }

  .card-body {
    padding: 10px 5px;
  }
</style>