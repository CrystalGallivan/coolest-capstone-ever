<template>
  <div class="menu10">
    <div id="menu10-border">
      <div class="container-fluid" id="menu10-body" @click="openFullscreen">
        <div class="row" id="header-title">
          <div class="col-2" id="logo-col">
            <img src="@/assets/southwestlogo.png" id="hr-icon" alt="">
          </div>
          <div class="col-9">
            <p id="head-title">Southwest</p>
            <hr id="header-line">
          </div>
        </div>
        <div class="row" id="price-option">
          <div class="col-3 offset-1">
            <ul>
              <p id="price">$6.75</p>
              <li id="price-option">Burrito</li>
              <li id="price-option">Burrito Bowl</li>
              <li id="price-option">Salad</li>
              <li id="price-option">3 Soft Tacos</li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
              <p id="price">$5.25</p>
              <li id="price-option">Smaller Burrito</li>
              <li id="price-option">Smaller Bowl</li>
              <li id="price-option">Smaller Salad</li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
              <p id="price">$2.25</p>
              <li id="price-option">Crisp Taco</li>
              <li id="price-option">Soft Taco</li>
            </ul>
          </div>
        </div>
        <div class="row" id="wednesday-option">
          <div class="col-12">
            <p id="wednesday-option-title">Every Wednesday - Crisp Taco Salad Shells</p>
          </div>
        </div>
        <div class="row" id="body-content">
          <div class="col-4" id="options-1">
            <div class="row">
              <div class="col">
                <p id="options-title">BASE / Calories / Portion</p>
              </div>
            </div>
            <ul>
              <li id="options-list-item">12” flour tortilla / 270 / 1 tortilla</li>
              <li id="options-list-item">10” flour tortilla / 218 / 1 tortilla</li>
              <li id="end-of-option">Romaine lettuce / 50 / 1 cup</li>
            </ul>
            <ul>
              <li id="options-list-item">Crisp corn taco / 50 / 1 tortilla</li>
              <li id="end-of-option">Soft flour taco / 55 / 1 tortilla</li>
            </ul>
            <ul>
              <li id="options-list-item">Cilantro rice / 200 / ½ cup</li>
              <li id="end-of-option">Pinto beans / 200 / ½ cup</li>
            </ul>
          </div>
          <div class="col-4" id="options-2">
            <p id="options-title">PROTEIN / calories/ portion</p>
            <ul>
              <li id="options-list-item">Chicken tinga / 400 / 5 oz</li>
              <li id="description">Chicken thigh, tomato, onion, cilantro, garlic, cumin</li>
            </ul>
            <ul>
              <li id="options-list-item">Pork al pastor / 280 / 5 oz</li>
              <li id="description">Pork shoulder, pineapple, onion, cilantro, spices</li>
            </ul>
            <ul>
              <li id="options-list-item">Butternut squash / 80 / 5 oz</li>
              <li id="description">
                <<< VEGETARIAN <<< squash, seasonings</li>
            </ul>
          </div>
          <div class="col-4" id="options">
            <p id="options-title">TOPPINGS / calories / portion</p>
            <ul>
              <li id="options-list-item">Sour cream / 120 / 1 oz</li>
              <li id="options-list-item">Cheddar cheese / 220 / 1 oz</li>
              <li id="options-list-item">Cotija cheese / 220 / 1 oz</li>
            </ul>
            <ul>
              <li id="add-on-option">Guacamole / 170 / 1 oz</li>
              <li>
                <p id="add-on-option-price">+ 75 cents</p>
              </li>
            </ul>
            <ul></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Menu10",
    data() {
      return {

      }
    }
  }
</script>
<style scoped>

</style>