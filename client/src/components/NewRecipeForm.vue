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
<<<<<<< HEAD
          <select class="form-control custom-select-sm station-input ml-1" v-model="newRecipe.station" required>
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

          <!-- Multiple Select -->
          <!-- <div class="dropdown">
            <a class="btn btn-light dropdown-toggle" href="#" role="button" v-model="newRecipe.station" required
              id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Stations
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Breakfast Bar" v-model="newRecipe.station"
                  id="breakfast-bar">
                <label class="form-check-label" for="breakfast-bar">
                  Breakfast Bar
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Chef's Choice" v-model="newRecipe.station"
                  id="chefs-choice">
                <label class="form-check-label" for="chefs-choice">
                  Chef's Choice
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Deli" v-model="newRecipe.station" id="deli">
                <label class="form-check-label" for="deli">
                  Deli
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="General" v-model="newRecipe.station"
                  id="general">
                <label class="form-check-label" for="general">
                  General
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Global" v-model="newRecipe.station"
                  id="global">
                <label class="form-check-label" for="global">
                  Global
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Grill" v-model="newRecipe.station"
                  id="grill">
                <label class="form-check-label" for="grill">
                  Grill
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Hot Entree" v-model="newRecipe.station"
                  id="hot-entree">
                <label class="form-check-label" for="hot-entree">
                  Hot Entree
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Pizza" v-model="newRecipe.station"
                  id="pizza">
                <label class="form-check-label" for="pizza">
                  Pizza
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Salad Bar" v-model="newRecipe.station"
                  id="salad-bar">
                <label class="form-check-label" for="salad-bar">
                  Salad Bar
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Soup" v-model="newRecipe.station" id="soup">
                <label class="form-check-label" for="soup">
                  Soup
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Southwest" v-model="newRecipe.station"
                  id="southwest">
                <label class="form-check-label" for="southwest">
                  Southwest
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" true-value="Sushi" v-model="newRecipe.station"
                  id="sushi">
                <label class="form-check-label" for="sushi">
                  Sushi
                </label>
              </div>
            </div>
          </div> -->
          <!-- End of Selector -->
          <input type="number" class="form-control-sm calories-input ml-1" placeholder="Calories"
            v-model="newRecipe.calories" min="0">
          <input type="text" class="form-control-sm allergens-input ml-1" placeholder="Allergens"
            v-model="newRecipe.allergens" min="0">
        </div>
      </div>
=======
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
>>>>>>> 7279bed922e8a89410ec1118b77ba305f7b718fa
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