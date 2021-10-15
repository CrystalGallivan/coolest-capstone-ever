<template>
  <div class="menu19" :id="mode" :key="rerender">
    <div id="menu19-border" :id="loading">
      <!-- <loading v-if="loading == true" /> -->
      <div class="container-fluid" id="menu19-body" @click="openFullscreen"
        v-if="activeSign._id && signIsScheduled == true">
        <div class="row" id="header-title-row">
          <div class="col-2" id="logo-col">
            <img :src="icon" id="hr-icon" alt="MHE Icon" />
          </div>
          <div class="col-10" id="header-col">
            <p id="head-title" :signId="activeSign._id">
              {{ activeSign.title }}
            </p>
            <p id="head-subtitle">{{ activeSign.subTitle }}</p>
          </div>
          <div class="row" id="hr-row">
            <div class="col-10 offset-2">
              <hr id="header-line" />
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-5 card" v-for="(menuItem, index) in menuItemsOfTheDay" :key="menuItem._id"
            v-show="isScheduled == true || menuItem.hide == false">
            <div class="card-header">
              <p class="card-header" id="menu-item-name">{{ menuItem.name }}</p>
            </div>
            <div class="card-body">
              <div class="card-subtitle" id="menu-item-calories">
                <p>{{menuItem.price}}</p>
                <p style="margin-left: 6%;">/ {{
                  menuItem.calories
                  }} Cal /</p>
              </div>
              <p class="card-text" id="menu-item-description" v-html="menuItem.description"></p>
            </div>
            <div class="card-footer">
              <div id="menu-item-contains" v-if="menuItem.allergens[10].checked == true">
                {{ menuItem.allergens[10].allergen}}
              </div>
              <div v-if="menuItem.allergens[10].checked == true && menuItem.allergens[11].checked == true"
                id="menu-item-contains-comma">,</div>
              <div id="menu-item-contains" v-if="menuItem.allergens[11].checked == true">
                {{ menuItem.allergens[11].allergen}}
              </div>
              <div
                v-if="menuItem.allergens[12].checked == true && menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true && menuItem.allergens[10].checked == true"
                id="menu-item-contains-comma">,</div>
              <div id="menu-item-contains" v-if="menuItem.allergens[12].checked == true">
                {{ menuItem.allergens[12].allergen}}
              </div>
              <div id="menu-item-contains"
                v-if="menuItem.allergens[10].checked == true || menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true"
                class="ml-1 mr-1"> {{ angleBrackets }}
              </div>
              <div id="menu-item-contains-title">Contains:</div>
              <div id="menu-item-contains-protein" v-if="menuItem.protein.length > 0" class="item on">
                {{ menuItem.protein }}
              </div>
              <div
                v-if="a.checked == true && a.allergen != 'Vegetarian' && a.allergen != 'Vegan' && a.allergen != 'Gluten Free'"
                id="menu-item-contains" v-for="(a, key) in menuItem.allergens" :key="a._id" class="item on">
                {{ a.allergen}}
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
    name: "menu19",
    data() {
      return {
        elem: document.documentElement,
        isScheduled: false,
        isLoading: true,
        kitchenName: "",
        icon: require("../../assets/c17cBurgerP353C1080px.png"),
        mode: "cafe17c",
        angleBrackets: "<<<",
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Modified Grill",
          kitchenName: this.kitchenName,
        });
        this.$store.dispatch("checkIfScheduled")
        this.$store.dispatch("getMenuItemsOfTheDay")
      });
    },
    mounted() {
      // this.timer();
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Modified Grill"),
        60000
      );
      this.$store.dispatch("checkIfScheduled")
      this.$store.dispatch("getMenuItemsOfTheDay")
      this.toggleTheme()
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
        "signsLength"
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
        if (this.$router.currentRoute.path == "/menu19/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
          this.icon = require("../../assets/c17cBurgerP353C1080px.png")
        } else if (this.$router.currentRoute.path == "/menu19/cafe-36") {
          this.kitchenName = "Cafe 36";
          this.mode = "cafe36"
          this.icon = require("../../assets/c36BurgerP7408CP1080px.png")
        }
      },
      toggleTheme() {
        this.mode = this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      },
      // checkIfScheduled() {
      //   return this.$store.dispatch("checkIfScheduled")
      // },
      getMenuItems() {
        return this.$store.dispatch("getMenuItemsOfTheDay")
      },
      timer() {
        // setInterval(this.checkIfScheduled, 300000);
        setTimeout(this.getMenuItems, 10000);
      },
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

  #menu19-body {
    outline: var(--cafe-outline)
  }

  #head-title,
  #menu-item-name {
    color: var(--cafe-font-color);
  }

  .menu19 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    padding-top: 20px;
  }

  #menu19-border {
    padding: 1.25vw;
  }

  #menu19-body {
    min-height: 95vh;
  }

  .container-fluid {
    width: 97%;
    height: 94%;
  }

  #head-title,
  #head-subtitle {
    display: inline;
  }

  #head-subtitle {
    font-family: "PT Sans Narrow", sans-serif;
    font-size: 2.5vw;
    /* font-weight: bold; */
  }

  #head-title {
    text-align: left;
    font-size: 7vw;
    font-family: "PT Sans Narrow", sans-serif;
    font-style: bold;
    margin-top: 2%;
    margin-right: 15vw;
  }

  #logo-cal {
    padding: 0px;
  }

  #hr-row {
    height: 100%;
    width: 100%;
    margin-bottom: 30px;
  }

  #hr-icon {
    max-width: 100%;
    max-height: 100%;
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

  #menu-item-name {
    font-size: 3.5vw;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    text-transform: uppercase;
  }

  #menu-item-calories {
    font-size: 2.5vw;
    display: flex;
    justify-content: flex-start;
  }

  #menu-item-description {
    font-size: 1.75vw;
    text-align: left;
  }

  #menu-item-contains,
  #menu-item-contains-title,
  #menu-item-contains-protein,
  #menu-item-contains-comma {
    font-size: 1.25vw;
    margin: 0px;
    padding: 0px;
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
  }

  #menu-item-contains-title {
    margin-right: 2px;
    /* margin-left: 5px; */
  }

  #menu-item-contains-protein,
  #menu-item-contains {
    margin-right: -3px;
    padding-left: 1px;
  }

  .item.on~.item.on::before {
    content: ', ';
    margin-right: 2px;
  }

  .card {
    background: none;
    border: none;
  }

  .card-header {
    background: none;
    border: none;
    height: 20vh;
    padding: 12px 0px;
    display: flex;
    align-items: start;
    justify-items: center;
  }

  .card-body {
    padding: 12px 0px;
    background: none;
  }

  .card-footer {
    background: none;
    border: none;
    padding: 12px 0px;
    margin: 0px;
    text-align: left;
  }
</style>