<template>
  <div class="container-fluid recipes">
    <!-- Nav Bar -->
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand recipes_title" href="#">Recipes</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <button class="nav-item nav-link btn btn-sm create-recipe-bg mb-5 mt-5" @click="addRecipe()">Add
            Recipe</button>
          <form class="nav-item form-inline my-2 my-lg-0">
            <!-- <auto-complete @result="setSearchedRecipe" :items="recipes" @input="setSearchRecipeName"
              id="autocomplete" /> -->
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn my-2 my-sm-0 create-recipe-bg m-1" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>

    <!-- Recipe List -->
    <div class="row" id="recipe-by-station">
      <div class="col-10">
        <ul class="nav nav-tabs" id="stationTab" role="tablist">
          <li class="nav-item stations">
            <a class="nav-link active" @click="getRecipes('Breakfast Bar')" id="breakfast-bar-tab" data-toggle="tab"
              href="#breakfast-bar" role="tab" aria-controls="breakfast-bar" aria-selected="true">Breakfast Bar</a>
          </li>

          <li class="nav-item stations">
            <a class="nav-link" @click="getRecipes('Deli')" id="deli-tab" data-toggle="tab" href="#deli" role="tab"
              aria-controls="deli" aria-selected="false">Deli</a>
          </li>
          <li class="nav-item stations">
            <a class="nav-link" @click="getRecipes('General')" id="general-tab" data-toggle="tab" href="#general"
              role="tab" aria-controls="general" aria-selected="false">General</a>
          </li>
          <li class="nav-item stations">
            <a class="nav-link" @click="getRecipes('Global')" id="global-tab" data-toggle="tab" href="#global"
              role="tab" aria-controls="global" aria-selected="false">Global</a>
          </li>
          <li class="nav-item stations">
            <a class="nav-link" @click="getRecipes('Grill')" id="grill-tab" data-toggle="tab" href="#grill" role="tab"
              aria-controls="grill" aria-selected="false">Grill</a>
          </li>
          <li class="nav-item stations">
            <a class="nav-link" @click="getRecipes('Hot Entree')" id="hot-entree-tab" data-toggle="tab"
              href="#hot-entree" role="tab" aria-controls="hot-entree" aria-selected="false">Hot Entree</a>
          </li>
          <li class="nav-item stations">
            <a class="nav-link" @click="getRecipes('Pizza')" id="pizza-tab" data-toggle="tab" href="#pizza" role="tab"
              aria-controls="pizza" aria-selected="false">Pizza</a>
          </li>
          <li class="nav-item stations">
            <a class="nav-link" @click="getRecipes('Salad Bar')" id="salad-bar-tab" data-toggle="tab" href="#salad-bar"
              role="tab" aria-controls="salad-bar" aria-selected="false">Salad Bar</a>
          </li>
          <li class="nav-item stations">
            <a class="nav-link" @click="getRecipes('Soup')" id="soup-tab" data-toggle="tab" href="#soup" role="tab"
              aria-controls="soup" aria-selected="false">Soup</a>
          </li>
          <li class="nav-item stations">
            <a class="nav-link" @click="getRecipes('Southwest')" id="southwest-tab" data-toggle="tab" href="#southwest"
              role="tab" aria-controls="southwest" aria-selected="false">Southwest</a>
          </li>
          <li class="nav-item stations">
            <a class="nav-link " @click="getRecipes('Sushi')" id="sushi-tab" data-toggle="tab" href="#sushi" role="tab"
              aria-controls="sushi" aria-selected="false">Sushi</a>
          </li>
          <li class="nav-item stations">
            <a class="nav-link disabled" @click="getRecipes('Chefs Choice')" id="chefs-choice-tab" data-toggle="tab"
              href="#chefs-choice" role="tab" aria-controls="chefs-choice" aria-selected="false">Chef's Choice</a>
          </li>
        </ul>
      </div>

      <div class="row">

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="breakfast-bar" role="tabpanel" aria-labelledby="breakfast-bar-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" id="deli" role="tabpanel" aria-labelledby="deli-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" id="general" role="tabpanel" aria-labelledby="general-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" disabled id="chefs-choice" role="tabpanel" aria-labelledby="chefs-choice-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" id="global" role="tabpanel" aria-labelledby="global-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" id="grill" role="tabpanel" aria-labelledby="grill-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" id="hot-entree" role="tabpanel" aria-labelledby="hot-entree-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" id="pizza" role="tabpanel" aria-labelledby="pizza-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" id="salad-bar" role="tabpanel" aria-labelledby="salad-bar-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" id="soup" role="tabpanel" aria-labelledby="soup-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" id="southwest" role="tabpanel" aria-labelledby="southwest-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
          <div class="tab-pane fade" id="sushi" role="tabpanel" aria-labelledby="sushi-tab">
            <ul v-for="recipe in visibleRecipes" :key="recipe._id" :visibleRecipes="visibleRecipes"
              :currentPage="currentPage" :recipe="recipe">
              <li class="recipe_list">{{recipe.name}} - {{recipe.calories}} Cal - $
                <!-- {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}} -->
                {{(recipe.costPerRecipe).toFixed(2)}}
                <span><img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                    @click="itemClicked(recipe)" class="mb-1 ml-1 details-img"></span>
              </li>
            </ul>
            <pagination :recipes="recipes" :currentPage="currentPage" :pageSize="pageSize"
              v-on:page:update="updatePage" />
          </div>
        </div>
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
              <!-- <img src="../assets/Trash-Can-Red-40.png" alt="Delete Recipe" title="Delete Recipe" -->
              <!-- @click="deleteRecipe()" class="delete-recipe"> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- TODO Pagination for when have a lot of recipes in here -->
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination.vue'
  import AutoComplete from '@/components/AutoComplete.vue'
  export default {
    name: "Recipes",
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
        station: '',
        visibleRecipes: [],
        pageSize: 400,
        currentPage: 0
      };
    },
    components: {
      Pagination,
      AutoComplete
    },
    computed: {

      recipes() {
        return this.$store.state.recipes
      }
    },
    methods: {
      updatePage(pageNumber) {
        this.currentPage = pageNumber
        this.updateVisibleRecipes()
      },
      updateVisibleRecipes() {
        this.visibleRecipes = this.recipes.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
        if (this.visibleRecipes.length == 0 && this.currentPage > 0) {
          this.updatePage(this.currentPage - 1)
        }
      },
      setSearchRecipeName(payload) {
        let rec = this.subRecipes.find(r => r.name == payload)
        if (!rec) {
          rec = this.subRecipes[this.subRecipes.length - 1]
        }
        this.recipeIndex = this.subRecipes.indexOf(rec)
        // rec.itemName = rec.name
        rec.name = payload
      },
      setSearchedRecipe(autocomplete) {
        let sr = this.subRecipes[this.recipeIndex]
        sr = autocomplete.result
        let r = this.recipeIndex
        this.recipe = sr
        let payload = {
          sr,
          r
        }
        this.recipes.push(sr)
        this.$store.dispatch('editSubRecipe', payload)
      },
      async getRecipes(station) {
        try {
          await this.$store.dispatch('getRecipesByStation', station)
          this.updateVisibleRecipes()
        } catch (error) { console.error(error) }
      },
      addRecipe() {
        this.$store.dispatch('createActiveRecipe')
        this.updateVisibleRecipes()
      },
      deleteRecipe() {
        let ActiveRecipe = this.$data
        this.$store.dispatch("deleteRecipe", ActiveRecipe.id);
        $("#my-modal").modal("hide");
        $(".modal-backdrop").remove();
        this.updateVisibleRecipes()
      },
      sendRecipeToCosting() {
        let ActiveRecipe = this.$data
        this.$store.dispatch("ActiveRecipe", ActiveRecipe)
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
    }
  };
</script>

<style>
  .recipe_list {
    display: flex;
    align-content: flex-end;
    column-count: 1;
    color: white;
    padding: 2px;
    width: 100%;
    font-size: 15px;
    font-family: 'Aleo', serif;
    font-size: 18px;

  }

  .tab-pane {
    padding: 40px;
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
    font-size: 40px;
  }

  .navbar.navbar-expand-lg {
    margin-top: -60px;
  }

  .create-recipe-bg {
    background-color: white;
    font-weight: 600;
    color: rgb(5, 38, 45);
    margin: 50px;
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

  .stations {
    /* border: .5px solid black; */
    margin-top: 2px;
    margin-right: 1px;
  }
</style>