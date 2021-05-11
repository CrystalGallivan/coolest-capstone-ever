<template>
  <div class="grill-lunch" :id="mode" v-if="signIsScheduled2 == true">
    <div class="row" id="header-title-row">
      <div class="col-2" id="logo-col">
        <img :src="icon" id="hr-icon" alt="" />
      </div>
      <div class="col-6" id="header-col">
        <p id="head-title" :signId="activeSign2._id">
          {{ activeSign2.title }}
        </p>
      </div>
      <div class="col-3">
        <p id="head-subtitle">{{ activeSign2.subTitle }}</p>
      </div>
      <div class="row" id="hr-row">
        <div class="col-10 offset-2">
          <hr id="header-line" />
        </div>
      </div>
    </div>
    <div class="row" id="menu-item-body">
      <div class="col-5 offset-1">
        <div class="row">
          <div v-for="(menuItem, index) in specialMenuItems" :key="menuItem._id" id="main-menu-item-col">
            <div v-show="isScheduled == true || menuItem.hide == false" id="menu-item">
              <div id="main-menu-item">
                <p id="main-menu-item-name">{{ menuItem.name }}</p>
                <p id="main-menu-item-calories">Calories: {{ menuItem.calories }}</p>
                <p id="main-menu-item-description" v-html="menuItem.description"></p>
                <div id="main-menu-item-contains-group">
                  <div id="main-menu-item-contains" v-if="menuItem.allergens[10].checked == true">
                    {{ menuItem.allergens[10].allergen }}
                  </div>
                  <div v-if="menuItem.allergens[10].checked == true && menuItem.allergens[11].checked == true"
                    id="main-menu-item-contains-comma">,</div>
                  <div id="main-menu-item-contains" v-if="menuItem.allergens[11].checked == true">
                    {{ menuItem.allergens[11].allergen }}
                  </div>
                  <div
                    v-if="menuItem.allergens[12].checked == true && menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true && menuItem.allergens[10].checked == true"
                    id="main-menu-item-contains-comma">,</div>
                  <div id="main-menu-item-contains" v-if="menuItem.allergens[12].checked == true">
                    {{ menuItem.allergens[12].allergen }}
                  </div>
                  <div id="main-menu-item-contains"
                    v-if="menuItem.allergens[10].checked == true || menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true"
                    class="ml-1">
                    {{ angleBrackets }}
                  </div>
                  <div id="main-menu-item-contains-title">Contains:</div>
                  <div id="main-menu-item-contains-protein" v-if="menuItem.protein.length > 0" class="item on">
                    {{ menuItem.protein }} </div>
                  <div
                    v-if="a.checked == true && a.allergen != 'Vegetarian' && a.allergen != 'Vegan' && a.allergen != 'Gluten Free'"
                    id="main-menu-item-contains" v-for="(a, key) in menuItem.allergens" :key="a._id" class="item on">
                    {{ a.allergen }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="row">
          <ul id="other-menu-item-list">
            <li v-for="menuItem in generalMenuItems" :key="menuItem._id" id="other-menu-item-col">
              <!-- <div v-show="isScheduled == true || menuItem.hide == false" id="menu-item"> -->
              <div id="other-menu-item">
                <p id="other-menu-item-price">{{menuItem.price }}</p>
                <p id="other-menu-item-name">{{menuItem.name }}</p>
                <p id="other-menu-item-calories"> / {{ menuItem.calories }} cal</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "GrillLunch",
    props: ["signId"],
    data() {
      return {
        isScheduled: false,
        reRender: false,
        isLoading: true,
        kitchenName: "",
        mode: "cafe17c",
        icon: require("../assets/c17cBurgerP353C1080px.png"),
        angleBrackets: "<<<"
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Grill",
          kitchenName: this.kitchenName,
        });
        this.$store.dispatch("checkIfScheduled")
      });
    },
    mounted() {
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Grill"),
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
        "generalMenuItems",
        "specialMenuItems"
      ]),
      ...mapState([
        "kitchenId",
        "signs",
        "activeSign2",
        "signIsScheduled2",
        "menuItemsOfTheDay2",
        "loading",
        "rerender",
        "day"
      ]),
    },
    methods: {
      async checkRouter() {
        if (this.$router.currentRoute.path == "/menu8/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
          this.icon = require("../assets/c17cBurgerP353C1080px.png")
        } else if (this.$router.currentRoute.path == "/menu8/cafe-36") {
          this.kitchenName = "Cafe 36";
          this.mode = "cafe36"
          this.icon = require("../assets/c36BurgerP7408CP1080px.png")
        }
      },
      toggleTheme() {
        this.mode = this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      },
      checkIfScheduled() {
        return this.$store.dispatch("checkIfScheduled")
      },
    },
  };
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

  #head-title,
  #main-menu-item-name,
  #other-menu-item-price,
  #other-menu-item-name {
    color: var(--cafe-font-color);
  }

  #head-title {
    text-align: left;
  }

  #head-subtitle {
    font-family: "PT Sans Narrow", sans-serif;
    font-size: 2vw;
    padding-top: 90px;
    font-style: bold;
  }

  #head-title {
    font-size: 7vw;
    font-family: "PT Sans Narrow", sans-serif;
    font-style: bold;
    padding-top: 20px;
  }

  #logo-cal {
    padding: 0px;
  }

  #hr-row {
    height: 100%;
    width: 100%;
  }

  #hr-icon {
    max-width: 25vw;
    max-height: 25vh;
    padding: 0px;
  }

  #header-col {
    padding: 0px;
    display: flex;
    align-items: baseline;
  }

  #header-line {
    height: 0px;
    margin-top: -25px;
    margin-bottom: 10px;
    border: 0;
    border-top: 3px solid whitesmoke;
  }

  #main-menu-item-col,
  #other-menu-item-col {
    padding-bottom: 10px;
  }

  #main-menu-item {
    font-family: "Open Sans", sans-serif;
    margin: 0.5vw;
    padding: 0.5vw;
    max-width: 100%;
    max-height: 100%;

  }

  #main-menu-item-name {
    font-size: 1.75vw;
    display: flex;
    justify-content: flex-start;
    margin: 0px;
  }

  #main-menu-item-calories {
    font-size: 1.25vw;
    color: whitesmoke;
    font-style: bold;
    display: flex;
    justify-content: flex-start;
    margin: 0px;

  }

  #main-menu-item-description {
    font-size: 1.15vw;
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    margin-bottom: -10px;
    text-align: left;
  }

  #main-menu-item-contains,
  #main-menu-item-contains-title,
  #main-menu-item-contains-protein,
  #main-menu-item-contains-comma {
    font-size: 1vw;
    margin: 0px;
    padding: 0px;
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
  }

  #main-menu-item-contains-title {
    margin-right: 2px;
    /* margin-left: 5px; */
  }

  #main-menu-item-contains-protein,
  #main-menu-item-contains {
    /* margin-right: -3px; */
    padding-left: 1px;
  }

  .item.on~.item.on::before {
    content: ', ';
    margin-right: 2px;
  }

  #main-menu-item-contains-group {
    margin: 0px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -10px;
  }

  #other-menu-item-list {
    margin-left: 0 px;
  }

  #other-menu-item {
    display: flex;
    margin-bottom: 0px;
  }

  #other-menu-item-price {
    font-style: bold;
    font-size: 2.30vh;
    margin-bottom: 0px;
  }

  #other-menu-item-name {
    font-size: 2vh;
    margin-bottom: 0px;
    margin-left: 8px;

  }

  #other-menu-item-calories {
    margin-top: 4px;
    margin-bottom: 0px;
    margin-left: 7px;
  }
</style>