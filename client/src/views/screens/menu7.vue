<template>
  <div class="menu7" :id="mode" :key="rerender">
    <div id="menu7-border">
      <div class="container-fluid" id="menu7-body" @click="openFullscreen"
        v-if="activeSign._id && signIsScheduled == true">
        <div class="row" id="menuItemsBody">
          <!-- Finish chaning ids to special menu-items -->
          <div class="col-5" id="sauceMenuItems">
            <p id="sauce-menu-item-header">3. Choose Your Sauce</p>
            <div v-for="(menuItem, index) in sauceMenuItems" :key="menuItem._id">
              <div v-show="isScheduled == true || menuItem.hide == false" id="sauce-menu-item">
                <p id="menu-item-name">{{ menuItem.name }}</p>
                <p id="menu-item-portion">{{ menuItem.portionSize }} </p>
                <p id="menu-item-backslash"> / </p>
                <p id="menu-item-calories"> {{ menuItem.calories }} cal </p>
                <p id="menu-item-description" v-html="menuItem.description"></p>
                <div id="menu-item-contains-group">
                  <div id="menu-item-contains" v-if="menuItem.allergens[10].checked == true">
                    {{ menuItem.allergens[10].allergen}}
                  </div>
                  <div v-if="menuItem.allergens[10].checked == true && menuItem.allergens[11].checked == true "
                    id="menu-item-contains-comma">,</div>
                  <div id="menu-item-contains" v-if="menuItem.allergens[11].checked == true ">
                    {{ " " + menuItem.allergens[11].allergen}}
                  </div>
                  <div v-if="menuItem.allergens[12].checked == true" id="menu-item-contains-comma">,</div>
                  <div id="menu-item-contains" v-if="menuItem.allergens[12].checked == true ">
                    {{ " " + menuItem.allergens[12].allergen}}
                  </div>
                  <div id="menu-item-contains"
                    v-if="menuItem.allergens[10].checked == true || menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true ">
                    {{angleBrackets}}
                  </div>
                  <div id="menu-item-contains">Contains: </div>
                  <div id="menu-item-contains-protein" v-if="menuItem.protein.length > 0">
                    {{ menuItem.protein + "," }} </div>
                  <div
                    v-if="a.checked == true && a.allergen != 'Vegetarian' && a.allergen != 'Vegan' && a.allergen != 'Gluten Free'"
                    id="menu-item-contains" v-for="(a, key) in menuItem.allergens" :key="a._id">
                    <div v-if="getFirstTrue[index] != a.allergen && key !== 0" id="menu-item-contains-comma">,</div>
                    {{ a.allergen}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5 offset-1">
            <p id="toppings-menu-item-header">4. Choose Your Toppings</p>
            <div v-for="(menuItem, index) in toppingsMenuItems" :key="menuItem._id">
              <div v-show="isScheduled == true || menuItem.hide == false" id="toppings-menu-item">
                <p id="menu-item-description" v-html="menuItem.description"></p>
              </div>
            </div>
          </div>
        </div>
        <!--TODO Find a way to use v-show or v-if so it does not show up when there are no extras -->
        <p id="add-on-menu-item-header">+. Add Some Extras</p>
        <div class="row" id="add-on-menu-item-row">
          <div class="col-4 offset-1" v-for="(menuItem, index) in addOnMenuItems" :key="menuItem._id">
            <div v-show="isScheduled == true || menuItem.hide == false" id="add-on-menu-item">
              <p id="menu-item-name">{{ menuItem.name }}</p>
              <p id="add-on-menu-item-portion"> {{ menuItem.portionSize }} </p>
              <p id="menu-item-backslash"> / </p>
              <p id="menu-item-calories"> {{ menuItem.calories }} cal</p>
              <p id="menu-item-description" v-html="menuItem.description"></p>
              <div id="menu-item-contains-group">
                <div id="menu-item-contains" v-if="menuItem.allergens[10].checked == true">
                  {{ menuItem.allergens[10].allergen}}
                </div>
                <div v-if="menuItem.allergens[10].checked == true && menuItem.allergens[11].checked == true "
                  id="menu-item-contains-comma">,</div>
                <div id="menu-item-contains" v-if="menuItem.allergens[11].checked == true ">
                  {{ " " + menuItem.allergens[11].allergen}}
                </div>
                <div v-if="menuItem.allergens[12].checked == true" id="menu-item-contains-comma">,</div>
                <div id="menu-item-contains" v-if="menuItem.allergens[12].checked == true ">
                  {{ " " + menuItem.allergens[12].allergen}}
                </div>
                <div id="menu-item-contains"
                  v-if="menuItem.allergens[10].checked == true || menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true ">
                  {{angleBrackets}}
                </div>
                <div id="menu-item-contains">Contains: </div>
                <div id="menu-item-contains-protein" v-if="menuItem.protein.length > 0">
                  {{ menuItem.protein + "," }} </div>
                <div
                  v-if="a.checked == true && a.allergen != 'Vegetarian' && a.allergen != 'Vegan' && a.allergen != 'Gluten Free'"
                  id="menu-item-contains" v-for="(a, key) in menuItem.allergens" :key="a._id">
                  <div v-if="getFirstTrue[index] != a.allergen && key !== 0" id="menu-item-contains-comma">,
                  </div>
                  {{ a.allergen}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from "@/components/Loading.vue";
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "Menu7",
    data() {
      return {
        elem: document.documentElement,
        isScheduled: false,
        isLoading: true,
        kitchenName: "",
        icon: require("../../assets/c17cGlobalCuisineP353C1080px.png"),
        mode: "cafe17c",
        angleBrackets: "<<<"
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Global3",
          kitchenName: this.kitchenName,
        });
        this.$store.dispatch("checkIfScheduled")
      });
    },
    mounted: function () {
      // this.timer();
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Global3"),
        60000
      );
      this.toggleTheme()
      this.$store.dispatch("checkIfScheduled")
    },
    beforeDestroy() {
      clearInterval(this.timeout);
      clearInterval(this.timer);
    },
    computed: {
      ...mapGetters([
        "scheduledMenuItems",
        "getSignTemplate",
        "scheduled",
        "signsLength",
        "sauceMenuItems",
        "toppingsMenuItems",
        "addOnMenuItems",
        "getFirstTrue"
      ]),
      ...mapState([
        "kitchenId",
        "signs",
        "activeSign",
        "signIsScheduled",
        "menuItemsOfTheDay",
        "loading",
        "rerender"
      ]),
    },
    methods: {
      openFullscreen() {
        try {
          if (this.elem.requestFullscreen) {
            this.elem.requestFullscreen();
          } else if (this.elem.mozRequestFullScreen) {
            /* Firefox */
            this.elem.mozRequestFullScreen();
          } else if (this.elem.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            this.elem.webkitRequestFullscreen();
          } else if (this.elem.msRequestFullscreen) {
            /* IE/Edge */
            this.elem.msRequestFullscreen();
          }
        } catch (error) {
          console.log(error);
        }
      },
      async checkRouter() {
        if (this.$router.currentRoute.path == "/menu7/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
          this.icon = require("../../assets/c17cGlobalCuisineP353C1080px.png")
        } else if (this.$router.currentRoute.path == "/menu7/cafe-36") {
          this.kitchenName = "Cafe 36";
          this.mode = "cafe36"
          this.icon = require("../../assets/c36GlobalCuisineP7408CP1080px.png")
        }
      },
      toggleTheme() {
        this.mode = this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      },
      // timer() {
      //   setInterval(this.checkIfScheduled, 300000);
      // },
      // checkIfScheduled() {
      //   return this.$store.dispatch("checkIfScheduled")
      // }
    },
    components: {
      Loading,
    },
  }
</script>
<style scoped>
  #cafe17c {
    --cafe-font-color: rgb(109, 197, 154);
    --cafe-outline: 3px solid rgb(109, 197, 154);
  }

  #cafe36 {
    --cafe-font-color: rgb(246, 192, 14);
    --cafe-outline: 3px solid rgb(246, 192, 14);
  }

  #menu7-body,
  #sauce-menu-item,
  #toppings-menu-item {
    outline: var(--cafe-outline)
  }

  #menu-item-name {
    color: var(--cafe-font-color);
  }

  .menu7 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu7-border {
    padding: 1.25vw;
  }

  #menu7-body {
    min-height: 95vh;
  }

  #sauce-menu-item-header,
  #toppings-menu-item-header {
    display: flex;
    align-self: flex-start;
    font-size: 20px;
    margin-top: 2vh;
    margin-bottom: -15px;
    text-indent: 15px;
  }

  #add-on-menu-item-header {
    margin-left: 75px;
    margin-top: 40px;
    margin-bottom: -15px;
    display: flex;
    align-self: flex-start;
    font-size: 20px;
    text-indent: 15px;
  }

  #sauce-menu-item,
  #toppings-menu-item {
    font-family: "Open Sans", sans-serif;
    margin-top: 30px;
    margin-bottom: -15px;
    padding: 8px;
    min-width: 100%;
    min-height: 100%;
    max-width: 15vw;
  }

  #add-on-menu-item {
    font-family: "Open Sans", sans-serif;
    min-width: 100%;
    min-height: 100%;
    max-width: 15vw;
    display: inline-table;
    padding: 8px;
    margin-top: 20px;
  }

  #sauce-menu-item-header,
  #sauce-menu-item {
    margin-left: 6vw;
  }

  #toppings-menu-item-header,
  #toppings-menu-item {
    margin-left: 2vw;
  }

  #menu-item-price,
  #menu-item-name {
    font-size: 1.75vw;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: -10px;
  }

  #add-on-menu-item-portion,
  #menu-item-portion,
  #menu-item-backslash,
  #menu-item-calories {
    font-size: 1.5vw;
    display: inline-flex;
    margin-bottom: 4px;
    margin-right: 5px;
  }

  #menu-item-portion {
    margin-left: -73%;

  }

  #add-on-menu-item-portion {
    margin-left: -65%;
  }

  #menu-item-description {
    font-size: 1vw;
    text-align: left;
    margin-bottom: -10px;

  }

  #menu-item-contains,
  #menu-item-contains-protein,
  #menu-item-contains-comma {
    font-size: 0.75vw;
    margin: 0px;
    padding: 0px;
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 1px;

  }

  #menu-item-contains-protein {
    margin-right: 2px;
  }

  #menu-item-contains-comma {
    margin-left: -3px;
    margin-right: 2px;
  }

  #menu-item-contains-group {
    margin: 0px;
    text-align: left;
  }
</style>