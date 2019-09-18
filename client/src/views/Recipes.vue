<template>
  <div class="container-fluid recipes">

    <div class="row recipes">
      <div class="col-12 text-center">
        <h1 class="recipes_title">Recipes</h1>
        <button class="btn btn-sm create-recipe-bg mb-5 mt-4" @click="addRecipe()">Add Recipe</button>
      </div>
    </div>

    <!-- Recipe List -->
    <div class="row" id="recipe-by-station">
      <div class="col-10">
        <ul class="nav nav-tabs" id="stationTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" @click="getRecipes('Breakfast Bar')" id="breakfast-bar-tab" data-toggle="tab"
              href="#breakfast-bar" role="tab" aria-controls="breakfast-bar" aria-selected="true">Breakfast Bar</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="getRecipes('Chefs Choice')" id="chefs-choice-tab" data-toggle="tab"
              href="#chefs-choice" role="tab" aria-controls="chefs-choice" aria-selected="false">Chef's Choice</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="getRecipes('Deli')" id="deli-tab" data-toggle="tab" href="#deli" role="tab"
              aria-controls="deli" aria-selected="false">Deli</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="getRecipes('Global')" id="global-tab" data-toggle="tab" href="#global"
              role="tab" aria-controls="global" aria-selected="false">Global</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="getRecipes('Grill')" id="grill-tab" data-toggle="tab" href="#grill" role="tab"
              aria-controls="grill" aria-selected="false">Grill</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="getRecipes('Hot Entree')" id="hot-entree-tab" data-toggle="tab"
              href="#hot-entree" role="tab" aria-controls="hot-entree" aria-selected="false">Hot Entree</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="getRecipes('Pizza')" id="pizza-tab" data-toggle="tab" href="#pizza" role="tab"
              aria-controls="pizza" aria-selected="false">Pizza</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="getRecipes('Salad Bar')" id="salad-bar-tab" data-toggle="tab" href="#salad-bar"
              role="tab" aria-controls="salad-bar" aria-selected="false">Salad Bar</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="getRecipes('Soup')" id="soup-tab" data-toggle="tab" href="#soup" role="tab"
              aria-controls="soup" aria-selected="false">Soup</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="getRecipes('Southwest')" id="southwest-tab" data-toggle="tab" href="#southwest"
              role="tab" aria-controls="southwest" aria-selected="false">Southwest</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " @click="getRecipes('Sushi')" id="sushi-tab" data-toggle="tab" href="#sushi" role="tab"
              aria-controls="sushi" aria-selected="false">Sushi</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="breakfast-bar" role="tabpanel" aria-labelledby="breakfast-bar-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
          <div class="tab-pane fade" id="deli" role="tabpanel" aria-labelledby="deli-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
          <div class="tab-pane fade" id="chefs-choice" role="tabpanel" aria-labelledby="chefs-choice-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
          <div class="tab-pane fade" id="global" role="tabpanel" aria-labelledby="global-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
          <div class="tab-pane fade" id="grill" role="tabpanel" aria-labelledby="grill-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
          <div class="tab-pane fade" id="hot-entree" role="tabpanel" aria-labelledby="hot-entree-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
          <div class="tab-pane fade" id="pizza" role="tabpanel" aria-labelledby="pizza-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
          <div class="tab-pane fade" id="salad-bar" role="tabpanel" aria-labelledby="salad-bar-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
          <div class="tab-pane fade" id="soup" role="tabpanel" aria-labelledby="soup-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
          <div class="tab-pane fade" id="southwest" role="tabpanel" aria-labelledby="southwest-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
          <div class="tab-pane fade" id="sushi" role="tabpanel" aria-labelledby="sushi-tab">
            <ul v-for="recipe in recipes" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </div>
        </div>





        <!-- <ul class="nav nav-tabs" v-for="menu in menus">
          <li class="nav-item" v-for="(recipes, station) in menu" :key="station"> -->
        <!-- <li class="nav-item" v-for="(recipes, station) in menu" :key="station"> -->
        <!-- <a class="nav-link active" @click="clickToggle(value)" id="station-tab" data-toggle="tab" href="#station"
              value='{station}'>{{station}}</a>
            <recipes-rendered v-show="station == recipe.station" class="tab-content" id="stationNames"
              v-for="recipe in recipes" :key="recipe._id" :recipe="recipe" />
          </li>
        </ul> -->
        <!-- <h3 class="text-light station_name mt-4">{{station}}</h3> -->
      </div>
    </div>

    <!-- Recipe Details Modal -->
    <div id="recipe modal">
      <div id="my-modal" class="modal fade">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" style="color: black;">Recipe Details</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="color: black;">
              <p>Name: {{ name }}</p>
              <p>Station: {{ station }}</p>
              <p>Side: {{ side }}</p>
              <p>Cost per Recipe: {{ costPerRecipe }}</p>
              <p>Portions: {{ portions }}</p>
              <p>Portions Size: {{ portionSize }}</p>
              <p>Portions Unit: {{ portionUnit }}</p>
              <p>Portions Calories: {{ calories }}</p>
            </div>
            <div class="modal-footer justify-content-center">
              <img src="../assets/Edit-Icon-40.png" alt="Edit Recipe" title="Edit Recipe" @click="sendRecipeToCosting()"
                class="edit-recipe">
              <img src="../assets/Trash-Can-Red-40.png" alt="Delete Recipe" title="Delete Recipe"
                @click="deleteRecipe()" class="delete-recipe">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- TODO Pagination for when have a lot of recipes in here -->
  </div>
</template>

<script>
  // import RecipesRendered from '@/components/RecipeRender.vue'
  export default {
    name: "Recipes",
    // mounted() {
    //   this.$store.dispatch('getRecipes')
    // },
    data() {
      return {
        id: '',
        siteId: "",
        name: "",
        station: "",
        side: "",
        costPerRecipe: "",
        portions: "",
        portionSize: "",
        portionUnit: "",
        calories: "",
        currentTab: false,
        station: ''
      };
    },
    components: {
      // RecipesRendered
      // SubMenu
    },
    computed: {
      recipes() {
        // let rec = this.$store.state.recipes.sort(function (a, b) {
        //   return (a.station).localeCompare(b.station);
        // });
        // return rec
        return this.$store.state.recipes
      },
      menus() {
        //Putting Recipes into columns & stations
        let colMenus = []
        let menu = {}
        let count = 0
        this.recipes.forEach(r => {
          menu[r.station] = menu[r.station] || []
          menu[r.station].push(r)
          count++
          // if (count == 15) {
          //   colMenus.push(JSON.parse(JSON.stringify(menu)))
          //   menu = {}
          // }
        });
        colMenus.push(menu)
        return colMenus
      },
    },
    methods: {
      getRecipes(station) {
        this.$store.dispatch('getRecipesByStation', station)
      },
      addRecipe() {
        this.$store.dispatch('createActiveRecipe')
      },
      deleteRecipe() {
        let ActiveRecipe = this.$data
        this.$store.dispatch("deleteRecipe", ActiveRecipe.id);
        $("#my-modal").modal("hide");
        $(".modal-backdrop").remove();
      },
      sendRecipeToCosting() {
        let ActiveRecipe = this.$data
        this.$store.dispatch("setActiveRecipe", ActiveRecipe)
        $("#my-modal").modal("hide");
        $(".modal-backdrop").remove();
      },
      itemClicked: function (item) {
        this.siteId = item.siteId;
        this.id = item._id;
        this.name = item.name;
        this.station = item.station;
        this.side = item.side;
        this.costPerRecipe = item.costPerRecipe.toFixed(2);
        this.portions = item.portions;
        this.portionSize = item.portionSize;
        this.portionUnit = item.portionUnit;
        this.calories = item.calories;
        $("#my-modal").modal('show');
      },
      clickToggle(value) {
        if (value == this.recipe.station) {

        }
        // this.station = this.recipe.station
      }
    }
  };
</script>

<style>
  .recipe_list {
    display: inline-block;
    column-count: 2;
    color: white;
    padding: 2px;
    font-size: 15px;
    font-family: 'Aleo', serif;
    font-size: 18px;
  }

  .details-img {
    cursor: pointer;
  }

  .edit-recipe {
    cursor: pointer;
  }

  .delete-recipe {
    cursor: pointer;
  }

  .edit_recipe {
    background-color: rgb(109, 197, 154);
    margin-left: 15px;
  }

  .recipes_title {
    font-family: 'Pacifico', cursive;
    color: rgb(109, 197, 154);
    font-size: 70px;
  }

  .create-recipe-bg {
    background-color: white;
    font-weight: 600;
    color: rgb(5, 38, 45);
  }

  .station_name {
    font-family: 'Bree Serif', serif;
    font-size: 2em;
  }

  #recipe-by-station {
    display: flex;
    justify-content: center;
  }

  .nav-link:hover {
    opacity: .5;
  }

  .nav-link {
    background-color: whitesmoke;
    color: rgb(5, 38, 45);
    outline-color: rgb(109, 197, 154);
    outline-width: 1rem;
  }
</style>