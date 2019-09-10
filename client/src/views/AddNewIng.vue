<template>
  <div class="add-new-ing">
    <h1>Add A New Ingredient</h1>
    <form @submit.prevent="submitIngredient">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="itemName">Ingredient Name</label>
          <input v-model="newIngredient.itemName" type="text" class="form-control" id="itemName"
            placeholder="Ingredient Name">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="quantity">Quantity</label>
          <input v-model="newIngredient.quantity" type="number" step="0.1" class="form-control" id="quantity"
            placeholder="Quantity">
        </div>
        <div class="form-group col-md-2">
          <label for="unit">Unit</label>
          <select v-model="newIngredient.unit" id="unit" class="form-control">
            <option selected>Choose...</option>
            <option value="OZ">OZ</option>
            <option value="EA">EA</option>
          </select>
        </div>
      </div>
      <div class="form-row">

        <div class="form-group col-md-2">
          <label for="itemCost">Cost Per Unit</label>
          <input v-model="newIngredient.itemCost" type="number" step="0.01" class="form-control" id="itemCost"
            placeholder="Cost">
        </div>
        <div class="form-group col-md-3">
          <label for="category">Category</label>
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
          <label for="distributor">Distributor</label>
          <input v-model="newIngredient.distributor" type="text" class="form-control" id="distributor"
            placeholder="ie FSA">
        </div>
        <div class="form-group col-md-2">
          <label for="productNumber">Product #</label>
          <input v-model="newIngredient.productNumber" type="text" class="form-control" id="productNumber"
            placeholder="00000000">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="brand">Brand</label>
          <input v-model="newIngredient.brand" type="text" class="form-control" id="brand" placeholder="Brand">
        </div>
        <div class="form-group col-md-2">
          <label for="packageSize">Package Size</label>
          <input v-model="newIngredient.packageSize" type="text" class="form-control" id="packageSize"
            placeholder="ie 12/12 EA">
        </div>
        <div class="form-group col-md-2">
          <label for="packageCost">Package Cost</label>
          <input v-model="newIngredient.packageCost" type="text" class="form-control" id="packageCost"
            placeholder="ie $20.00">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
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
      }
    }

  }
</script>
<style scoped>
  form {
    display: block;
    /* margin-left: 30%; */
  }

  .form-row {
    display: flex;
    justify-content: center;
  }
</style>