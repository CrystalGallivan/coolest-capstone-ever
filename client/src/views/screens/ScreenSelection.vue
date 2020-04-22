<template>
  <div id="screen-selection">
    <ol>
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
    </ol>

    <router-view />

  </div>
</template>
<script>
  export default {
    name: "ScreenSelection",

  }
</script>
<style scoped>

</style>