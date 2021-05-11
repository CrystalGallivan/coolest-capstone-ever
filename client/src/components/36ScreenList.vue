<template>
  <div class="screen-list-36">
    <ul class="collapse" id="collapseSelections">
      <h3 id="cafe-36-name">Cafe 36</h3>
      <li>
        <router-link to="/menu2/cafe-36"><a href="#">Deli 1</a></router-link>
      </li>
      <li>
        <router-link to="/menu3/cafe-36"><a href="#">Deli 2</a></router-link>
      </li>
      <li>
        <router-link to="/menu4/cafe-36"><a href="#">Hot Entree</a></router-link>
      </li>
      <li>
        <router-link to="/menu5/cafe-36"><a href="#">Global 1</a></router-link>
      </li>
      <li>
        <router-link to="/menu6/cafe-36"><a href="#">Global 2</a></router-link>
      </li>
      <li>
        <router-link to="/menu7/cafe-36"><a href="#">Global 3</a></router-link>
      </li>
      <li>
        <router-link to="/menu8/cafe-36"><a href="#">Grill Breakfast / Grill Lunch</a></router-link>
      </li>
      <li>
        <router-link to="/menu9/cafe-36"><a href="#">Salad</a></router-link>
      </li>
      <li>
        <router-link to="/menu10/cafe-36"><a href="#">Soup</a></router-link>
      </li>
      <li>
        <router-link to="/menu11/cafe-36"><a href="#">Southwest</a></router-link>
      </li>
      <li>
        <router-link to="/menu12/cafe-36"><a href="#">Beverage</a></router-link>
      </li>
      <li>
        <router-link to="/menu13/cafe-36"><a href="#">Main Menu</a></router-link>
      </li>
      <li>
        <router-link to="/menu14/cafe-36"><a href="#">Sushi</a></router-link>
      </li>
      <li>
        <router-link to="/menu15/cafe-36"><a href="#">Chef's Choice</a></router-link>
      </li>
      <li>
        <router-link to="/menu16/cafe-36"><a href="#">Pizza</a></router-link>
      </li>
      <!-- <li>
        <router-link to="/menu17/cafe-36"><a href="#">Breakfast Bar</a></router-link>
      </li> -->
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ScreenList36"
  }
</script>

<style scoped>
  #site-selection,
  #collapseSelections {
    margin-left: -45px;
    list-style: none;
  }

  #cafe-36-name {
    text-decoration: underline;
  }

  #cafe-36-name {
    color: rgb(246, 192, 14);
  }

  a {
    color: whitesmoke;
  }
</style>