<template>
  <div class="sub-recipe col justify-content-center">
    <!-- Add Recipe Button 
    <div class="row">
      <div class="col-lg-12 col-md-8 col-sm-6 mt-3 mb-1">
        <button type="button" class="btn addIng-btn text-white my-2" @click="addRecipe">Add
          Recipe <img src="../assets/icons8-plus-25.png" alt="Plus Icon" class="ml-1"></button>
      </div>
    </div> -->

    <!-- <auto-complete @result="setIngredient" :selected="subRecipe" :items="costedIngredients" @input="setIngredientName"
      id="autocomplete" /> -->
    <form @submit.prevent="saveIngredients">
      <div class="form-row">
        <div class="col-lg-12 col-md-8 col-sm-3 d-flex justify-content-center">
          <div class="table">
            <!-- <div class="table-responsive"> -->
            <table class="table table-sm text-white">
              <thead>
                <tr>
                  <th scope="col">Recipe</th>
                  <th scope="col">Portions</th>
                  <th scope="col">Portion Size</th>
                  <th scope="col">Unit</th>
                  <th scope="col"> $ Portion</th>
                  <th scope="col"> $ Total</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody v-for="subRecipe in subRecipes" :subRecipe="subRecipe" class="sub-recipe">
                <tr>
                  <td class="align-middle">
                    <auto-complete @result="setSubRecipe" :selected="subRecipe" :items="recipeList"
                      @input="setSubRecipeName" id="autocomplete" />
                  </td>
                  <td class="align-middle">
                    <!-- <input v-if="portions[subRecipe.name] > 0" type="number" v-on:input="portionsChange"
                      v-model="portions[subRecipe.name]" :selected="subRecipe" placeholder="portions" min="0" step="1"
                      class="quan-input" required>
                    <input v-else type="number" v-on:input="portionsChange" v-model="subRecipe.portions"
                      :selected="subRecipe" placeholder="portions" min="0" step="1" class="quan-input" required> -->
                    <p v-if="portions[subRecipe.name]" class="mt-3">{{portions[subRecipe.name]}}</p>
                    <p v-else class="mt-3">{{subRecipe.portions}}</p>
                  </td>
                  <td class="align-middle">
                    <input type="number" v-on:input="portionsChange" v-model="subRecipe.portionSize"
                      :selected="subRecipe" placeholder="portionSize" min="0" step=".5" class="port-quan-input"
                      required>
                  </td>
                  <td class="align-middle">
                    <p class="mt-3">{{subRecipe.portionUnit}}</p>
                    <!-- <select class="form-control custom-select-sm unit-input" placeholder="Unit"
                      v-model="subRecipe.portionUnit" required>
                      <option disabled value="">Unit</option>
                      <option value="OZ">OZ</option>
                      <option value="EA">EA</option>
                    </select> -->
                  </td>
                  <td class="align-middle">
                    <!-- <input v-if="costPerRecipe[subRecipe.name] > 0" type="number" style="width:40%;"
                      v-model="costPerRecipe[subRecipe.name]" :selected="subRecipe" placeholder="$" min="0" step=".01"
                      class="cost-input" value="costPerRecipe" required>
                    <input v-else type="number" style="width:40%;" v-model="subRecipe.costPerRecipe"
                      :selected="subRecipe" placeholder="$" min="0" step=".01" class="cost-input"
                      value="subRecipe.costPerRecipe" required> -->
                    <p v-if="costPerRecipe[subRecipe.name]" class="mt-3">{{costPerRecipe[subRecipe.name]}}</p>
                    <p v-else class="mt-3">{{subRecipe.costPerRecipe}}</p>
                  </td>
                  <td class="align-middle">
                    <p v-model="totalRecipeCost" class="mt-3">
                      ${{(subRecipe.costPerRecipe * subRecipe.portions).toFixed(2)}}
                    </p>
                  </td>
                  <td class="align-middle">
                    <img src="../assets/Trash-Can-Red-30.png" alt="Remove Recipe" title="Remove Recipe"
                      @click="removeRecipe(subRecipe)" class="rem-rec-btn">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
    <!-- Add Recipe Button  -->
    <div class="row">
      <div class="col-lg-12 col-md-8 col-sm-6 mb-1">
        <button type="button" class="btn addIng-btn text-white" @click="addRecipe">Add
          Recipe <img src="../assets/icons8-plus-25.png" alt="Plus Icon" class="ml-1"></button>
      </div>
    </div>
  </div>
</template>

<script>
  import AutoComplete from '@/components/AutoComplete'
  export default {
    name: 'SubRecipe',
    data() {
      return {
        recipeIndex: 0,
        recipe: {},
        recipes: [],
        totalRecipeCost: 0,
        portions: {},
        costPerRecipe: {},
      }
    },
    mounted() {
      // this.$store.dispatch('getRecipes')
    },
    computed: {
      recipeList() {
        return this.$store.state.recipes
      },
      subRecipes() {
        return this.$store.state.activeRecipe.subRecipe
      },
    },
    methods: {
      addRecipe() {
        let recipe = {
          name: '',
          station: '',
          portions: '',
          portionSize: '',
          portionUnit: '',
          recipeIngredients: [],
          costPerRecipe: 0,
          calories: '',
          allergens: [],
          siteId: '',
          salesPrice: ''
        }
        this.$store.dispatch('addSubRecipe', recipe)
      },
      removeRecipe(subRecipe) {
        let i = this.subRecipes.indexOf(subRecipe)
        this.subRecipes.splice(i, 1)
      },
      setSubRecipeName(payload) {
        let rec = this.subRecipes.find(r => r.name == payload)
        if (!rec) {
          rec = this.subRecipes[this.subRecipes.length - 1]
        }
        this.recipeIndex = this.subRecipes.indexOf(rec)
        // rec.itemName = rec.name
        rec.name = payload
      },
      setSubRecipe(autocomplete) {
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
      portionsChange() {
        this.subRecipes.forEach(r => {
          this.portions[r.name] = (r.portions / r.portionSize).toFixed(0)
          this.costPerRecipe[r.name] = (r.costPerRecipe * r.portionSize).toFixed(2)
          // this.portions[r.name].toFixed(0)
          // this.costPerRecipe[r.name].tof
        });

      }
    },
    components: {
      AutoComplete
    }
  }
</script>

<style scoped>
  table {
    border: 1px solid;
  }

  form {
    margin-bottom: -22px;
  }

  .rem-rec-btn {
    cursor: pointer;
  }

  .port-quan-input {
    width: 5rem;
    text-align: center;
  }
</style>