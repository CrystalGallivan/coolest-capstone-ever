<template>
  <div>
    <!-- <p> -->
    <!-- <a
        class="btn btn-light"
        id="screen-selection-btn"
        data-toggle="collapse"
        href="#collapseSelections"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
        v-for="site in allSites"
        :key="site._id"
        :siteId="site._id"
      >
        {{ site.name }}
      </a>
    </p> -->

    <p>
      <a
        class="btn btn-light"
        id="screen-selection-btn"
        data-toggle="collapse"
        href="#collapseSelections"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Digital Screen Selection
      </a>
    </p>
    <!-- <ul id="site-selection">
      <li v-for="site in allSites" :key="site._id">{{ site.name }}</li>
    </ul> -->
    <div class="row">
      <div class="col-3 offset-3">
        <ul class="collapse" id="collapseSelections">
          <h3 id="cafe-17c-name">Cafe 17C</h3>
          <li>
            <router-link to="/menu1/cafe-17c"
              ><a href="#">Chef's Choice / Pizza</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu2/cafe-17c"
              ><a href="#">Deli 1</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu3/cafe-17c"
              ><a href="#">Deli 2</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu4/cafe-17c"
              ><a href="#">Hot Entree / Breakfast Bar</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu5/cafe-17c"
              ><a href="#">Global 1</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu6/cafe-17c"
              ><a href="#">Global 2</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu7/cafe-17c"
              ><a href="#">Global 3</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu8/cafe-17c"
              ><a href="#">Grill Breakfast / Grill Lunch</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu9/cafe-17c"
              ><a href="#">Salad / Sushi</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu10/cafe-17c"
              ><a href="#">Soup</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu12/cafe-17c"
              ><a href="#">Beverage</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu13/cafe-17c"
              ><a href="#">Main Menu</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu14/cafe-17c"><a href="#"></a></router-link>
          </li>
        </ul>
      </div>
      <div class="col-3">
        <ul class="collapse" id="collapseSelections">
          <h3 id="cafe-36-name">Cafe 36</h3>
          <li>
            <router-link to="/menu1/cafe-36"
              ><a href="#">Chef's Choice / Pizza</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu2/cafe-36"
              ><a href="#">Deli 1</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu3/cafe-36"
              ><a href="#">Deli 2</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu4/cafe-36"
              ><a href="#">Hot Entree / Breakfast Bar</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu5/cafe-36"
              ><a href="#">Global 1</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu6/cafe-36"
              ><a href="#">Global 2</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu7/cafe-36"
              ><a href="#">Global 3</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu8/cafe-36"
              ><a href="#">Grill Breakfast / Grill Lunch</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu9/cafe-36"
              ><a href="#">Salad / Sushi</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu10/cafe-36"><a href="#">Soup</a></router-link>
          </li>
          <li>
            <router-link to="/menu11/cafe-36"
              ><a href="#">Southwest</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu12/cafe-36"
              ><a href="#">Beverage</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu13/cafe-36"
              ><a href="#">Main Menu</a></router-link
            >
          </li>
          <li>
            <router-link to="/menu14/cafe-36"><a href="#"></a></router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ScreenSelection",
  props: ["siteId"],
  created() {
    this.$store.dispatch("getAllSites");
  },
  computed: {
    allSites() {
      return this.$store.state.allSites;
    },
  },
};
</script>
<style scoped>
#screen-selection-btn {
  color: rgb(5, 38, 45);
  margin-top: 20px;
  margin-bottom: 5px;
}
#site-selection,
#collapseSelections {
  margin-left: -45px;
  list-style: none;
}
#cafe-36-name,
#cafe-17c-name {
  text-decoration: underline;
}
#cafe-36-name {
  color: rgb(246, 192, 14);
}
#cafe-17c-name {
  color: rgb(109, 197, 154);
}
a {
  color: whitesmoke;
}
</style>
