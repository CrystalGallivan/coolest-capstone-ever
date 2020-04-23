<template>
  <div id="screen-selection">
    <p>
      <a class="btn btn-light" id='screen-selection-btn' data-toggle="collapse" href="#collapseSelections" role="button"
        aria-expanded="false" aria-controls="collapseExample">
        Digital Screen Selection
      </a>
    </p>
    <ul class="collapse" id="collapseSelections">
      <li>
        <router-link to='/menu1'><a href="#">Chef's Choice / Pizza</a></router-link>
      </li>
      <li>
        <router-link to='/menu2'><a href="#">Deli 1</a></router-link>
      </li>
      <li>
        <router-link to='/menu3'><a href="#">Deli 2</a></router-link>
      </li>
      <li>
        <router-link to='/menu4'><a href="#">Hot Entree / Breakfast Bar</a></router-link>
      </li>
      <li>
        <router-link to='/menu5'><a href="#">Global 1</a></router-link>
      </li>
      <li>
        <router-link to='/menu6'><a href="#">Global 2</a></router-link>
      </li>
      <li>
        <router-link to='/menu7'><a href="#">Global 3</a></router-link>
      </li>
      <li>
        <router-link to='/menu8'><a href="#">Grill Breakfast / Grill Lunch</a></router-link>
      </li>
      <li>
        <router-link to='/menu9'><a href="#">Salad / Sushi</a></router-link>
      </li>
      <li>
        <router-link to='/menu10'><a href="#">Soup</a></router-link>
      </li>
      <li>
        <router-link to='/menu11'><a href="#">Southwest</a></router-link>
      </li>
      <li>
        <router-link to='/menu12'><a href="#">Beverage</a></router-link>
      </li>
      <li>
        <router-link to='/menu13'><a href="#">Main Menu</a></router-link>
      </li>
      <li>
        <router-link to='/menu14'><a href="#"></a></router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "ScreenSelection",

  }
</script>
<style scoped>
  #screen-selection-btn {
    color: rgb(5, 38, 45);
    margin-top: 20px;
    margin-bottom: 5px;
  }

  ul {
    margin-left: -45px;
  }

  a {
    color: whitesmoke;
  }
</style>