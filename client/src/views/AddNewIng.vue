<template>
  <div class="add-new-ing">
    <h1>Add A New Ingredient</h1>
    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="itemName">Ingredient Name</label>
          <input type="text" class="form-control" id="itemName" placeholder="Ingredient Name">
        </div>
        <div class="form-group col-md-6">
          <label for="quantity">Quantity</label>
          <input type="number" class="form-control" id="quantity" placeholder="quantity">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="unit">Unit</label>
          <select id="unit" class="form-control">
            <option selected>Choose...</option>
            <option value="OZ">OZ</option>
            <option value="EA">EA</option>
          </select>
        </div>
        <div class="form-group">
          <label for="itemCost">Ingredient Cost</label>
          <input type="number" class="form-control" id="itemCost" placeholder="Cost per unit">
        </div>
        <div class="form-group">
          <label for="inputAddress2">Ingredient Cost</label>
          <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
        </div>
        <div class="form-group col-md-4">
          <label for="category">Category</label>
          <select id="category" class="form-control">
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
        <div class="form-group col-md-6">
          <label for="distributor">Distributor</label>
          <input type="text" class="form-control" id="distributor">
        </div>
        <div class="form-group col-md-2">
          <label for="productNumber">Product Number</label>
          <input type="text" class="form-control" id="productNumber">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="brand">Brand</label>
          <input type="text" class="form-control" id="brand">
        </div>
        <div class="form-group col-md-2">
          <label for="packageSize">Package Size</label>
          <input type="text" class="form-control" id="packageSize">
        </div>
        <div class="form-group col-md-2">
          <label for="packageCost">Package Cost</label>
          <input type="text" class="form-control" id="packageCost">
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

      }
    }
  }
</script>
<style scoped>
  body {
    color: white;
  }
</style>