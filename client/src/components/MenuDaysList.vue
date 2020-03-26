<template>
  <div class="menu-days-list col-4 d-flex justify-content-center">

    <div class="card mt-2 mr-1 dayCards" v-for="day in days" :key="day._id" :dayData="day">
      <div class="card-header">
        <!-- <div class="dropdown dropleft float-right">
          NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'"
          <button class="btn d-down p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false" @click="setActiveDay(day)">
            <img src="../assets/menu-vertical-25.png" alt="" srcset="">
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            TODO Add that an admin can also delete categories; how to get user role?
            <a v-if="user._id == activeMenu.authorId" @click="deleteDay(day._id)" class="dropdown-item" href="#">Delete
              Day</a>
          </div>
        </div> -->
        <h5 class="card-title mb-1 dayTitle">{{day.name}}</h5>
        <!-- <h6 class="card-text" v-if="day.title === Monday">{{activeMenu.date}}</h6> -->
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
            <h6 class="mb-1 mt-1 ml-3 dayTime" data-toggle="collapse" data-target="#collapseBreakfast">Breakfast:</h6>
            <div class="collapse" id="collapseBreakfast">
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
                  <h5 class="card-title mb-0 ml-3 categoryTitle" data-toggle="collapse"
                    data-target="#collapseBreakfastRecipes">{{category.title}}</h5>
                </div>
                <div class="card-body addRecipeBody collapse" id="collapseBreakfastRecipes">
                  <h6 class="ml-4">Add Recipe<button class="btn shadow-none" type="button" data-target="#addRecipeModal"
                      data-toggle="modal"><img src="../assets/plus-w&b-20.png" title="Add Recipe" class="mb-1"
                        @click="setActiveCategory(category)"></button></h6>
                  <div class="card recipeCard" v-for="mRecipe in category.menuRecipes" :key="mRecipe._id">
                    <div class="card-header p-1" style="height: fit-content;">
                      <div class="card-title p-1 m-0">
                        <h6 class="recipeCardTitle">{{mRecipe.name}}</h6>
                      </div>
                    </div>
                    <div class="card-body m-0 recipeBody">
                      <div class="row">
                        <div class="col-12">
                          <small v-for="allergen in mRecipe.allergens">Contains: {{allergen}}</small>
                        </div>
                        <div class="col-12">
                          <small>Description: {{mRecipe.menuDescription}}</small>
                        </div>
                        <div class="col-12">
                          <small>Calories: {{mRecipe.calories}}</small>
                        </div>
                        <div class="col-12" v-if="mRecipe.station == 'Hot Entree' || mRecipe.station == 'Grill'">
                          <small>Salesprice: ${{mRecipe.salesPrice}}</small>
                        </div>
                        <div class="col-12">
                          <small>Cost: ${{mRecipe.costPerRecipe}}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
            <h6 class="mb-1 mt-1 ml-3 dayTime" data-toggle="collapse" data-target="#collapseLunch">Lunch:
            </h6>
            <div class="collapse in" id="collapseLunch">
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
                      <a @click="deleteCategoryLunch(category._id, day)" class="dropdown-item" href="#">Delete
                        Category</a>
                    </div>
                  </div>
                  <h5 class="card-title m-1 ml-3 categoryTitle" data-toggle="collapse" data-target="#collapseRecipes"
                    @click="setActiveCategory(category)">
                    {{category.title}}</h5>
                </div>
                <div class="card-body addRecipeBody collapse" id="collapseRecipes">
                  <h6 class="ml-4">Add Recipe<button class="btn shadow-none" type="button" data-target="#addRecipeModal"
                      data-toggle="modal"><img src="../assets/plus-w&b-20.png" title="Add Recipe" class="mb-1"
                        @click="setActiveCategory(category)"></button></h6>
                  <div class="card recipeCard" v-for="mRecipe in category.menuRecipes" :key="mRecipe._id">
                    <div class="card-header p-1" style="height: fit-content;">
                      <div class="card-title p-1 m-0">
                        <h6 class="recipeCardTitle">{{mRecipe.name}}</h6>
                      </div>
                    </div>
                    <div class="card-body m-0 recipeBody">
                      <div class="row">
                        <div class="col-12">
                          <small v-for="allergen in mRecipe.allergens">Contains: {{allergen}}</small>
                        </div>
                        <div class="col-12">
                          <small>Description: {{mRecipe.menuDescription}}</small>
                        </div>
                        <div class="col-12">
                          <small>Calories: {{mRecipe.calories}}</small>
                        </div>
                        <div class="col-12" v-if="mRecipe.station == 'Hot Entree' || mRecipe.station == 'Grill'">
                          <small>Salesprice: ${{mRecipe.salesPrice}}</small>
                        </div>
                        <div class="col-12">
                          <small>Cost: ${{mRecipe.costPerRecipe}}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
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

    <!-- ADD Recipe/AutoComplete Modal -->
    <div class="modal fade" id="addRecipeModal" tabindex="-1" role="dialog" aria-labelledby="recipeModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRecipeModalLabel">Add Recipe</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <auto-complete @result="setRecipe" :selected="recipe" :items="recipes" @input="setRecipeName"
              id="autoComplete" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // import MenuCategoryList from '@/components/MenuCategoryList.vue'
  import AutoComplete from '@/components/AutoComplete'

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
        // categoryCheck: false,
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
        ],
        recipeIndex: 0,
        recipe: {},
        aCategory: {},
        // recipes: [],
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
      recipes() {
        return this.$store.state.recipes
      },
      activeCategory() {
        return this.$store.state.activeCategory
      },
      menuRecipes() {
        return this.$store.state.activeCategory.menuRecipes
      },
    },
    methods: {
      deleteDay(dayId) {
        if (dayId) {
          this.activeMenu.days = this.activeMenu.days.filter(day => day._id !== dayId)
          this.$store.dispatch('editMenu', this.activeMenu)
        }
      },
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
        let newCategories = this.lCategories.map(v => ({ ...v, dayId: this.currentDayId }))
        let day = this.activeDay
        let daysArr = this.activeMenu.days
        let indexOfDay = daysArr.findIndex((e) => e._id === day._id)
        // TODO Make a check so you can't add two of the same categories
        // function sameTitleCheck(newCategories, day) {
        //   for(i = 0; i < newCategories.length; i++){

        //   }
        // }
        if (daysArr[indexOfDay] && this.currentTimeOfDay === "breakfast") {
          day.breakfast = day.breakfast.concat(newCategories)
        } else if (daysArr[indexOfDay] && this.currentTimeOfDay === "lunch") {
          day.lunch = day.lunch.concat(newCategories)
        }
        // else {
        //   day.dinner = day.dinner.concat(newCategories)
        // }
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
      collapseCategory() {
        // TODO Need to finish this so it will collapse the specific element and not all lunch/breakfast for every day & the categories as well
        $('.collapse').on('show.bs.collapse', function (e) {
          clicked = $(document).find("[href='#" + $(e.target).attr('id') + "']")
        });
      },
      setRecipeName(payload) {
        let rec = this.recipes.find(r => r.name == payload)
        if (!rec) {
          rec = this.recipes[this.recipes.length - 1]
        }
        this.recipeIndex = this.recipes.indexOf(rec)
        // rec.itemName = rec.name
        rec.name = payload
      },
      setRecipe(autocomplete) {
        let r = this.recipes[this.recipeIndex]
        r = autocomplete.result
        let i = this.recipeIndex
        this.recipe = r
        let payload = {
          r,
          i
        }
        this.aCategory = this.activeCategory
        if (this.activeCategory === this.aCategory) {
          this.activeCategory.menuRecipes.push(r)
          this.$store.dispatch('editMenu', this.activeMenu)
        }
        $("#addRecipeModal").modal("hide");
        $(".modal-backdrop").remove();
      },
      setActiveCategory(category) {
        this.$store.dispatch('setActiveCategory', category)
        this.aCategory = category
      },
    },
    components: {
      // MenuCategoryList,
      AutoComplete,
    }
  }
</script>

<style scoped>
  .dayCards {
    color: black;
    /* min-height: 68vh; */
    max-height: fit-content;
    min-width: 19vw;
    background-color: rgb(226, 226, 226);
  }

  .dayTitle {
    font-weight: 600;
    margin-bottom: px;
  }

  .categoryCard {
    min-width: 10px;
    /* border: solid 2px black; */
    border: none;
    background-color: #fff;
    /* margin-left: 5px; */
  }

  .categoryTitle {
    cursor: pointer;
  }

  .card-header,
  .card-body {
    padding: 5px 2px;
  }

  .card-header {
    border: none;
    border-radius: 5px;
    /* margin: 1.5px; */
    background-color: #fff;
  }

  .card-body {
    margin-left: 3px;
  }

  .dayTime {
    font-weight: 600;
    cursor: pointer;
  }

  .addRecipeBody {
    /* background-color: #fff; */
    margin-left: 8px;
    border-radius: 5px;
  }

  .recipeCard {
    width: 11rem;
    background-color: #fff;
    margin-top: 5px;
  }

  .recipeCardTitle {
    margin: 0 0;
  }

  .recipeBody {
    background-color: rgb(170, 170, 170);
  }

  #addCategoryModal,
  #addRecipeModal {
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