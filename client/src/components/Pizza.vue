<template>
  <div class="pizza" :key="rerender" v-if="signIsScheduled2 == true">
    <div class="row" id="header-title-row">
      <div class="col-4" id="logo-col">
        <img src="@/assets/c17cPizzaP353C1080px.png" id="hr-icon" alt="" />
      </div>
      <div class="col-8" id="header-col">
        <p id="head-title" :signId="activeSign2._id">
          {{ activeSign2.title }}
        </p>
      </div>
      <div class="row" id="hr-row">
        <div class="col-8 offset-4">
          <hr id="header-line" />
        </div>
      </div>
    </div>
    <div class="row">
      <p id="head-subtitle">{{ activeSign2.subTitle }}</p>
      <div class="col-12" v-for="menuItem in menuItemsOfTheDay2" :key="menuItem._id" id="menu-item-col">
        <div v-show="isScheduled == true || menuItem.hide == false" id="menu-item">
          <div v-show="isScheduled == true || menuItem.hide == false" id="menu-item">
            <p id="menu-item-name">{{ menuItem.order + "." + " " + menuItem.name }}</p>
            <p id="menu-item-calories">Calories: {{ menuItem.calories }}</p>
            <p id="menu-item-description" v-html="menuItem.description"></p>
            <!-- <div id="menu-item-contains-group">
              <p id="menu-item-contains-title">Contains:</p>
              <p id="menu-item-contains">{{ menuItem.protein + "," }} </p>
              <p v-if="a.checked == true" id="menu-item-contains" v-for="a in menuItem.allergens" :key="a._id">
                {{ a.allergen }},
              </p>
            </div> -->
            <div id="menu-item-contains-group">
              <div id="menu-item-contains" v-if="menuItem.allergens[10].checked == true">
                {{ menuItem.allergens[10].allergen }}
              </div>
              <div v-if="menuItem.allergens[10].checked == true && menuItem.allergens[11].checked == true"
                id="menu-item-contains-comma">,</div>
              <div id="menu-item-contains" v-if="menuItem.allergens[11].checked == true">
                {{ menuItem.allergens[11].allergen }}
              </div>
              <div
                v-if="menuItem.allergens[12].checked == true && menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true && menuItem.allergens[10].checked == true"
                id="menu-item-contains-comma">,</div>
              <div id="menu-item-contains" v-if="menuItem.allergens[12].checked == true">
                {{ menuItem.allergens[12].allergen }}
              </div>
              <div id="menu-item-contains"
                v-if="menuItem.allergens[10].checked == true || menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true"
                class="ml-1">
                {{ angleBrackets }}
              </div>
              <div id="menu-item-contains-title">Contains:</div>
              <div id="menu-item-contains-protein" v-if="menuItem.protein.length > 0" class="item on">
                {{ menuItem.protein }} </div>
              <div
                v-if="a.checked == true && a.allergen != 'Vegetarian' && a.allergen != 'Vegan' && a.allergen != 'Gluten Free'"
                id="menu-item-contains" v-for="(a, key) in menuItem.allergens" :key="a._id" class="item on">
                {{a.allergen}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "Pizza",
    props: ["signId"],
    data() {
      return {
        isScheduled: false,
        reRender: false,
        isLoading: true,
        kitchenName: "",
        angleBrackets: "<<<"
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Pizza",
          kitchenName: this.kitchenName,
        });
        this.$store.dispatch("checkIfScheduled")
        this.$store.dispatch("getMenuItemsOfTheDay")
      });
    },
    mounted() {
      // this.timer()
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Pizza"),
        60000
      );
      this.$store.dispatch("checkIfScheduled")
      this.$store.dispatch("getMenuItemsOfTheDay")
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
        if (this.$router.currentRoute.path == "/menu1/cafe-17c") {
          this.kitchenName = "Cafe 17C";
        } else if (this.$router.currentRoute.path == "/menu1/cafe-36") {
          this.kitchenName = "Cafe 36";
        }
      },
      // checkIfScheduled() {
      //   return this.$store.dispatch("checkIfScheduled")
      // },
      getMenuItemsOfTheDay() {
        return this.$store.dispatch("getMenuItemsOfTheDay")
      },
      timer() {
        // setInterval(this.checkIfScheduled, 300000);
        setTimeout(this.getMenuItemsOfTheDay, 10000);
      },
    },

  };
</script>

<style scoped>
  #head-title {
    color: rgb(109, 197, 154);
    text-align: left;
  }

  #head-title,
  #head-subtitle {
    display: inline;
  }

  #head-subtitle {
    font-family: "PT Sans Narrow", sans-serif;
    font-size: 2vw;
    margin-left: 40px;
    margin-bottom: -10px;
    /* font-weight: bold; */
  }

  #head-title {
    font-size: 5vw;
    font-family: "PT Sans Narrow", sans-serif;
    font-style: bold;
    margin-top: 2%;
    padding-top: 50px;
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

  #menu-item-col {
    /* margin-bottom: -40px; */
    padding-bottom: 10px;
  }

  #menu-item {
    font-family: "Open Sans", sans-serif;
    margin: 0.5vw;
    padding: 0.5vw;
    max-width: 100%;
    max-height: 100%;

  }

  #menu-item-name {
    font-size: 2vw;
    color: rgb(109, 197, 154);
    display: flex;
    justify-content: flex-start;
    margin: 0px;
  }

  #menu-item-calories {
    font-size: 1.5vw;
    color: whitesmoke;
    font-style: bold;
    display: flex;
    justify-content: flex-start;
    margin: 0px;

  }

  #menu-item-description {
    font-size: 1.5vw;
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    margin-bottom: -10px;
    text-align: left;
  }

  /* #menu-item-contains {
    font-size: 1.25vw;
    margin: 0px;
    display: inline-flex;
    font-weight: bold;
    text-transform: uppercase;
    margin-left: 5px;
  } */
  /* NOTE Check the CSS for this page once data is in */
  /* #menu-item-contains-title {
    font-size: 1.25vw;
    margin: 0px;
    display: inline-flex;
    text-transform: uppercase;
    font-weight: bold;
  } */

  #menu-item-contains,
  #menu-item-contains-title,
  #menu-item-contains-protein,
  #menu-item-contains-comma {
    font-size: 1vw;
    margin: 0px;
    padding: 0px;
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
  }

  #menu-item-contains-title {
    margin-right: 2px;
    margin-left: 5px;
  }

  #menu-item-contains-protein {
    margin-right: -.2px;
    padding-left: 5px;
  }

  #menu-item-contains {
    margin-right: -.2px;
    padding-left: 2px;
  }

  .item.on~.item.on::before {
    content: ', ';
    margin-right: 2px;
  }

  #menu-item-contains-group {
    /* margin: 0px; */
    display: flex;
    /* justify-content: flex-start; */
    /* margin-bottom: -30px; */
  }
</style>