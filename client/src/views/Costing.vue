<template>
  <div class="costing col-12">

    <!-- Converter Button -->
    <!-- <div class="row">
      <div class="col-12">
        <button type="button" class="btn btn-secondary float-right my-2" @click="">Converter</button>
        TODO link this button to the sidebar calculator
      </div>
    </div> -->

    <!-- Recipe Form Templates -->
    <div class="row mt-3">
      <edit-recipe-form v-if="activeRecipe._id" />
      <new-recipe-form v-else />
    </div>
    <!-- Ingredient Table Template -->
    <div class="row" v-if="activeRecipe._id">
      <add-ingredients />
    </div>
    <div class="row" v-if="activeRecipe._id">
      <sub-recipe />
    </div>
    <div>
      <div class="row menu-description">
        <div class="col-10 offset-1">
          <label id="costingLabel">Menu Description</label>
          <textarea id="costingTextarea" class="form-control" rows="3"
            v-model="activeRecipe.menuDescription">{{this.activeRecipe.menuDescription}}</textarea>
        </div>
      </div>
      <div class="row directions">
        <div class="col-10 offset-1">
          <label id="costingLabel">Directions</label>
          <textarea id="costingTextarea" class="form-control" rows="3"
            v-model="activeRecipe.directions">{{this.activeRecipe.directions}}</textarea>
        </div>
      </div>
      <div class="row comments">
        <div class="col-10 offset-1">
          <label id="costingLabel">Comments</label>
          <textarea id="costingTextarea" class="form-control" rows="3"
            v-model="activeRecipe.comments">{{this.activeRecipe.comments}}</textarea>
        </div>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input flagCheckbox" type="checkbox" v-model="activeRecipe.flag" id="flagged"
          value="true">
        <label class="form-check-label flagRecipe" for="flagged">Flag</label>
      </div>
    </div>
    <!-- Recipe Calculations -->
    <div class="row recipeCalcs">
      <div class="col-3 text-white text-left d-flex justify-content-center">
        <ul>
          <li class="">Cost Per Category:</li>
          <li class="mt-2">Storeroom PL </li>
          <li class="mt-2">Meat PL </li>
          <li class="mt-2">Dairy PL </li>
          <li class="mt-2">Produce PL </li>
          <li class="mt-2">Bakery PL </li>
          <li class="mt-2">Frozen PL </li>
        </ul>
      </div>
      <div class="col-3 text-white text-left d-flex justify-content-center">
        <ul>
          <li class="">Price:</li>
          <li class="mt-2">${{(this.storeroom).toFixed(2)}}</li>
          <li class="mt-2">${{(this.meat).toFixed(2)}}</li>
          <li class="mt-2">${{(this.dairy).toFixed(2)}}</li>
          <li class="mt-2">${{(this.produce).toFixed(2)}}</li>
          <li class="mt-2">${{(this.bakery).toFixed(2)}}</li>
          <li class="mt-2">${{(this.frozen).toFixed(2)}}</li>
        </ul>
      </div>
      <div class="col-3 text-white d-flex justify-content-center text-left">
        <ul>
          <li v-model="activeRecipe.costPerRecipe">Total Cost:</li>
          <li class="mt-2">Food Cost:</li>
          <li class="mt-2">Sales Price:</li>
          <li class="mt-2">Gross Margin: </li>
          <li class="mt-2"> Suggested Price: 40%</li>
          <li class="mt-2"> Suggested Price: 45%</li>
          <li class="mt-2"> Suggested Price: 50%</li>
        </ul>
      </div>
      <div class="col-3 text-white d-flex justify-content-center text-left">
        <ul>
          <li>
            $ {{(this.storeroom + this.meat + this.dairy + this.produce + this.bakery + this.frozen).toFixed(2)}}
          </li>
          <li class="mt-2" v-model="activeRecipe.costPerRecipe">$ {{this.recipeCost}}</li>
          <li>$ <input type="number" placeholder="0.00" class="totalP-input ml-1 mt-2" v-model="activeRecipe.salesPrice"
              required>
          </li>
          <li class="mt-2">$ {{(this.activeRecipe.salesPrice - this.recipeCost).toFixed(2)}}</li>
          <li class="mt-2">$ {{(this.foodCost * 1.4).toFixed(2)}} </li>
          <li class="mt-2">$ {{(this.foodCost * 1.45).toFixed(2)}} </li>
          <li class="mt-2">$ {{(this.foodCost * 1.5).toFixed(2)}} </li>

        </ul>
      </div>
    </div>
    <!-- Save Recipe Button -->
    <div v-if="activeRecipe._id" class="form-row d-flex justify-content-center align-content-center">
      <button @click="saveRecipe" type="button" class="btn saveRecipe-btn">Save Recipe</button>
    </div>
  </div>
</template>

<script>
  import NewRecipeForm from '@/components/NewRecipeForm'
  import EditRecipeForm from '@/components/EditRecipeForm'
  import AddIngredients from '@/components/AddIngredients'
  import SubRecipe from '@/components/SubRecipe'

  export default {
    name: "Costing",
    created() {
      return this.$store.state.recipes
    },
    mounted() {
      // this.$store.dispatch("loadLastSite");
      return this.$store.dispatch("getCostedIngredients")
      // return this.$store.dispatch.dispatch("getRecipes")
      //TODO  ingredients persist on reload 
    },
    data() {
      return {
        storeroom: 0,
        meat: 0,
        dairy: 0,
        produce: 0,
        bakery: 0,
        frozen: 0,
        // subRecipe: 0
      }
    },
    watch: {
      itemCost(nv, ov) {
        // console.log("itemCost has changed")
      },
      recipeCost(nv, ov) {
        // console.log("recipeCost has changed")
      },
      foodCost(nv, ov) {
        // console.log("foodCost has changed")
      },
      profit(nv, ov) {
        // console.log("profit has changed")
      },
      profitMargin(nv, ov) {
        // console.log("profitMargin has changed")
      },
      subRecipes(nv, ov) {
        // console.log("subRecipe cost changed")
      }
      // activeRecipe(nv, ov) {
      //   console.log("active recipe has changed")
      //   this.activeRecipe = nv
      // }
    },
    computed: {
      activeRecipe() {
        return this.$store.state.activeRecipe
      },
      recipeIngredients() {
        return this.$store.state.activeRecipe.recipeIngredients
      },
      recipeCost() {
        return this.activeRecipe.costPerRecipe = ((this.storeroom + this.meat + this.dairy + this.produce + this.bakery + this.frozen) / this.activeRecipe.portions + this.subRecipes).toFixed(2)
      },
      subRecipes() {
        let subRecipe = 0
        if (this.activeRecipe.subRecipe != null) {
          let subRecipeCost = this.activeRecipe.subRecipe.forEach(r => subRecipe += r.costPerRecipe)
          return subRecipe
        } else {
          return 0
        }
      },
      itemCost() {
        this.storeroom = 0
        this.meat = 0
        this.dairy = 0
        this.produce = 0
        this.bakery = 0
        this.frozen = 0
        if (!this.activeRecipe.recipeIngredients) {
          return 0
        }
        return this.recipeIngredients.forEach(r => this.$data[r.category.toLowerCase()] += +r.itemCost * r.quantity)
      },
      foodCost() {
        //totalCost / portions
        if (this.activeRecipe.portions && this.recipeCost) {
          return (this.recipeCost / this.activeRecipe.portions).toFixed(2)
        }
      },
      profit() {
        if (this.foodCost && this.activeRecipe.salesPrice) {
          return (this.activeRecipe.salesPrice - this.foodCost).toFixed(2)
        }
      },
      profitMargin() {
        // profit/salesprice
        if (this.activeRecipe.salesPrice) {
          return (this.profit / this.activeRecipe.salesPrice).toFixed(2)
        }
      },
      markup() {
        //profit / foodcost
        if (this.activeRecipe.salesPrice) {
          return ((this.profit / this.foodCost) * 100).toFixed(0)
        }
      },
      // suggestedSalesPrice1() {
      //   if (this.profitMargin) {
      //     return (this.foodCost * 1.4).toFixed(2)
      //   }
      // },
      // suggestedSalesPrice2() {
      //   if (this.profitMargin) {
      //     return (this.foodCost * 1.45).toFixed(2)
      //   }
      // },
      // suggestedSalesPrice3() {
      //   if (this.profitMargin) {
      //     return (this.foodCost * 1.5).toFixed(2)
      //   }
      // }
    },
    methods: {
      saveRecipe() {
        this.activeRecipe.recipeIngredients.forEach(i => {
          i.unit = i.unit.toUpperCase();
          i.category = i.category.toLowerCase();
        })
        if (this.activeRecipe.recipeIngredients.length > 0) {
          this.$store.dispatch('editRecipe', this.activeRecipe)
        } else { this.$store.dispatch('editRecipeInCosting', this.activeRecipe) }
      }
    },
    components: {
      AddIngredients,
      NewRecipeForm,
      EditRecipeForm,
      SubRecipe
    }
  }

</script>

<style>
  ul {
    list-style: none;
  }

  .recipeCalcs {
    margin-top: 2rem;
  }

  .saveRecipe-btn {
    margin: 1rem;
    background-color: #6DC59A;
    color: white;
  }

  .totalP-input {
    max-width: 5rem;
    text-align: center;
    height: 1.5rem;
  }

  .totalC-input {
    max-width: 5rem;
    text-align: center;
    height: 1.5rem;
  }

  #costingLabel {
    color: whitesmoke;
    margin-top: 15px;
    margin-bottom: 0px;
  }

  #costingTextarea {
    margin: 10px;
  }

  .flagRecipe {
    color: whitesmoke;
  }

  .flagCheckbox {
    max-width: 10px;
  }
</style>