<template>
  <div class="recipes-rendered">
    <ul>
      <!-- class="tab-content" id="stationNames" v-for="recipe in recipes" :key="recipe._id" -->
      <li class="recipe_list tab-pane" role="tabpanel">{{recipe.name}}: $
        {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
        <img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details" @click="itemClicked(recipe)"
          class="mb-1 ml-1 details-img">
      </li>
    </ul>
    <!-- TODO Pagination for when have a lot of recipes in here -->
  </div>
</template>

<script>
  export default {
    name: "RecipesRendered",
    props: ['recipe'],
    // mounted() {
    //   this.$store.dispatch('getRecipes')
    // },
    // data() {
    //   return {
    //     id: '',
    //     siteId: "",
    //     name: "",
    //     station: "",
    //     side: "",
    //     costPerRecipe: "",
    //     portions: "",
    //     portionSize: "",
    //     portionUnit: "",
    //     calories: "",
    //   };
    // },
    computed: {
      recipes() {
        let rec = this.$store.state.recipes.sort(function (a, b) {
          return (a.station).localeCompare(b.station);
        });
        return rec
      },
      //   menus() {
      //     //Putting Recipes into columns & stations
      //     let colMenus = []
      //     let menu = {}
      //     let count = 0
      //     this.recipes.forEach(r => {
      //       menu[r.station] = menu[r.station] || []
      //       menu[r.station].push(r)
      //       count++
      //       // if (count == 15) {
      //       //   colMenus.push(JSON.parse(JSON.stringify(menu)))
      //       //   menu = {}
      //       // }
      //     });
      //     colMenus.push(menu)
      //     return colMenus
      //   },
    },
    methods: {
      //   addRecipe() {
      //     this.$store.dispatch('createActiveRecipe')
      //   },
      //   deleteRecipe() {
      //     let ActiveRecipe = this.$data
      //     this.$store.dispatch("deleteRecipe", ActiveRecipe.id);
      //     $("#my-modal").modal("hide");
      //     $(".modal-backdrop").remove();
      //   },
      //   sendRecipeToCosting() {
      //     let ActiveRecipe = this.$data
      //     this.$store.dispatch("setActiveRecipe", ActiveRecipe)
      //     $("#my-modal").modal("hide");
      //     $(".modal-backdrop").remove();
      //   },
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
    }
  }
</script>

<style>
  .recipe_list {
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
</style>