<template>
  <div class="add-new-ing container-fluid">
    <div class="col-12">
      <h1 class="addIngTitle pt-5 pb-4">Add A New Ingredient</h1>
    </div>
    <form @submit.prevent="submitIngredient">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="itemName" class="addNewIngLabel">Ingredient Name</label>
          <input v-model="newIngredient.itemName" type="text" class="form-control" id="itemName"
            placeholder="Ingredient Name">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="quantity" class="addNewIngLabel">Quantity</label>
          <input v-model="newIngredient.quantity" type="number" step="0.1" class="form-control" id="quantity"
            placeholder="Quantity">
        </div>
        <div class="form-group col-md-2">
          <label for="unit" class="addNewIngLabel">Unit</label>
          <select v-model="newIngredient.unit" id="unit" class="form-control">
            <option selected>Choose...</option>
            <option value="OZ">OZ</option>
            <option value="EA">EA</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="itemCost" class="addNewIngLabel">Cost Per Unit</label>
          <input v-model="newIngredient.itemCost" type="number" step="0.01" class="form-control" id="itemCost"
            placeholder="Cost">
        </div>
        <div class="form-group col-md-3">
          <label for="category" class="addNewIngLabel">Category</label>
          <select v-model="newIngredient.category" id="category" class="form-control">
            <option selected>Select Category</option>
            <option value="bakery">Bakery</option>
            <option value="dairy">Dairy</option>
            <option value="frozen">Frozen</option>
            <option value="meat">Meat</option>
            <option value="produce">Produce</option>
            <option value="storeroom">Storeroom</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-3">
          <label for="distributor" class="addNewIngLabel">Distributor</label>
          <input v-model="newIngredient.distributor" type="text" class="form-control" id="distributor"
            placeholder="ie FSA">
        </div>
        <div class="form-group col-md-2">
          <label for="productNumber" class="addNewIngLabel">Product #</label>
          <input v-model="newIngredient.productNumber" type="text" class="form-control" id="productNumber"
            placeholder="00000000">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="brand" class="addNewIngLabel">Brand</label>
          <input v-model="newIngredient.brand" type="text" class="form-control" id="brand" placeholder="Brand">
        </div>
        <div class="form-group col-md-2">
          <label for="packageSize" class="addNewIngLabel">Package Size</label>
          <input v-model="newIngredient.packageSize" type="text" class="form-control" id="packageSize"
            placeholder="ie 12/12 EA">
        </div>
        <div class="form-group col-md-2">
          <label for="packageCost" class="addNewIngLabel">Package Cost</label>
          <input v-model="newIngredient.packageCost" type="text" class="form-control" id="packageCost"
            placeholder="ie $20.00">
        </div>
      </div>
      <button type="submit" class="btn addNewIngBTN">Submit</button>
    </form>
  </div>
</template>
<script>
  export default {
    name: "AddNewIng",
    data() {
      return {
        newIngredient: {
          itemName: "",
          category: "",
          brand: "",
          productNumber: 0,
          quantity: 1,
          unit: "",
          itemCost: 0,
          packageSize: "",
          packageCost: "",
          distributor: ""
        }
      }
    },
    methods: {
      submitIngredient() {
        this.$store.dispatch('addMasterIngredient', this.$data.newIngredient)
        this.$store.dispatch('addCostedIngredient', this.$data.newIngredient)
      }
    }

  }
</script>
<style scoped>
  .addIngTitle {
    color: rgb(109, 197, 154);
    font-family: "Pacifico", cursive;
  }

  form {
    display: block;
    /* margin-left: 30%; */
  }

  .form-row {
    display: flex;
    justify-content: center;
  }

  .addNewIngLabel {
    color: whitesmoke;
  }

  .addNewIngBTN {
    background-color: rgb(109, 197, 154);
    color: whitesmoke;
  }
</style>