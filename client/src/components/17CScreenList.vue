<template>
  <div class="screen-list-17">
    <ul class="collapse" id="collapseSelections">
      <h3 id="cafe-17c-name">Cafe 17C</h3>
      <li>
        <router-link @click="resetActiveSign" to="/menu1/cafe-17c"><a href="#">Chef's Choice / Pizza</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu2/cafe-17c"><a href="#">Deli 1</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu3/cafe-17c"><a href="#">Deli 2</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu4/cafe-17c"><a href="#">Hot Entree</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu5/cafe-17c"><a href="#">Global 1</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu6/cafe-17c"><a href="#">Global 2</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu7/cafe-17c"><a href="#">Global 3</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu8/cafe-17c"><a href="#">Grill Breakfast / Grill Lunch</a>
        </router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu9/cafe-17c"><a href="#">Salad</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu10/cafe-17c"><a href="#">Soup</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu12/cafe-17c"><a href="#">Beverage</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu13/cafe-17c"><a href="#">Main Menu</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu14/cafe-17c"><a href="#">Sushi</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu17/cafe-17c"><a href="#">Modified Hot Entree</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu18/cafe-17c"><a href="#">Modified Salad</a></router-link>
      </li>
      <li>
        <router-link @click="resetActiveSign" to="/menu19/cafe-17c"><a href="#">Modified Grill</a></router-link>
      </li>
      <!-- <li>
        <router-link @click="resetActiveSign" to="/menu17/cafe-17c"><a href="#">Breakfast Bar</a></router-link>
      </li> -->
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ScreenList17",
    methods: {
      resetActiveSign() {
        debugger
        return this.$store.dispatch("resetSignState")
      }
    }

  }
</script>

<style scoped>
  #site-selection,
  #collapseSelections {
    margin-left: -45px;
    list-style: none;
  }

  #cafe-17c-name {
    text-decoration: underline;
  }

  #cafe-17c-name {
    color: rgb(109, 197, 154);
  }

  a {
    color: whitesmoke;
  }
</style>