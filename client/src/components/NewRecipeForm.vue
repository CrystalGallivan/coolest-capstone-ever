<template>
  <div class="new-recipe-form col mt-2">

    <form @submit.prevent="saveRecipe" class="form-inline">
      <input type="text" class="form-control-sm recipeName-input" placeholder="Recipe Name" v-model="newRecipe.name"
        required>
      <input type="number" class="form-control-sm portions-input" placeholder="Portions" v-model="newRecipe.portions"
        min="0" step=".5" required>
      <input type="number" class="form-control-sm portionS-input" placeholder="Portion Size"
        v-model="newRecipe.portionSize" min="0" step=".5" required>
      <select class="form-control custom-select-sm portionU-input" v-model="newRecipe.portionUnit" required>
        <option disabled value="">Unit</option>
        <option value="OZ">OZ</option>
        <option value="EA">EA</option>
      </select>
      <!-- <select class="form-control custom-select-sm side-input ml-1" v-model="newRecipe.side" required>
            <option disabled value="">Side</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select> -->
      <select class="form-control custom-select-sm station-input" v-model="newRecipe.station" required>
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
      <input type="number" class="form-control-sm calories-input" placeholder="Calories" v-model="newRecipe.calories"
        min="0">
      <input type="text" class="form-control-sm allergens-input" placeholder="Allergens" v-model="newRecipe.allergens"
        min="0">
      <button type="submit" class="btn btn-sm saveRecipe-btn">Create
        Recipe</button>
    </form>

  </div>
</template>

<script>
  export default {
    name: "NewRecipeForm",
    mounted() { },
    data() {
      return {
        newRecipe: {
          recipeIngredients: [],
          station: "",
          // side: "",
          name: "",
          portions: "",
          portionSize: "",
          portionUnit: "",
          costPerRecipe: 0,
          calories: "",
          allergens: [],
          salesPrice: 0
        }
      }
    },
    computed: {
      activeRecipe() {
        return this.$store.state.activeRecipe
      }
    },
    methods: {
      saveRecipe() {
        this.$store.dispatch('saveRecipe', this.newRecipe)
      }
    },
  }

</script>

<style scoped>
  .form-inline {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-control-sm,
  .form-control {
    margin: 3px 1.5px;
  }

  .saveRecipe-btn {
    margin: 3px 5px;
    background-color: #6DC59A;
    color: white;
  }

  p {
    color: white;
    font-size: 2rem;
  }

  .recipeName-input,
  .allergens-input {
    min-width: 16rem;
    text-align: center
  }

  .portions-input,
  .portionS-input {
    max-width: 7rem;
    text-align: center
  }

  .portionU-input {
    max-width: 4.4rem;
    text-align: center
  }

  /* .side-input {
    max-width: 5rem;
    text-align: center
  } */

  .station-input {
    max-width: 9rem;
    text-align: center;
    /* align: center; */
  }

  .calories-input {
    max-width: 6rem;
    text-align: center
  }
</style>