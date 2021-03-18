<template>
  <div class="menu9" :id="mode" :key="rerender">
    <div id="menu9-border">
      <div class="container-fluid" id="menu9-body" @click="openFullscreen"
        v-if="activeSign._id && signIsScheduled == true">
        <div class="row" id="header-title-row">
          <div class="col-2" id="logo-col">
            <img :src="icon" id="hr-icon" alt="" />
          </div>
          <div class="col-6" id="header-col">
            <p id="head-title" :signId="activeSign._id">
              {{ activeSign.title }}
            </p>
          </div>
          <div class="row" id="hr-row">
            <div class="col-10 offset-2">
              <hr id="header-line" />
            </div>
          </div>
        </div>
        <div class="row" id="menu-item-body">
          <div class="col-6">
            <div class="row">
              <div class="col-12">
                <div class="row" id="special-menu-item-row">
                  <p id="head-subtitle">{{ activeSign.subTitle }}</p>
                  <div v-for="(menuItem, index) in specialMenuItems" :key="menuItem._id" id="main-menu-item-col">
                    <div v-show="isScheduled == true || menuItem.hide == false" id="menu-item">
                      <div id="main-menu-item">
                        <p id="main-menu-item-name">{{ menuItem.name }}</p>
                        <p id="main-menu-item-calories">{{ menuItem.calories }} cal</p>
                        <div id="main-menu-item-description" v-html="menuItem.description"></div>
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
                            {{ angleBrackets }} </div>
                          <div id="main-menu-item-contains-title">Contains:</div>
                          <div id="main-menu-item-contains-protein" v-if="menuItem.protein.length > 0" class="item on">
                            {{ menuItem.protein }} </div>
                          <div
                            v-if="a.checked == true && a.allergen != 'Vegetarian' && a.allergen != 'Vegan' && a.allergen != 'Gluten Free'"
                            id="main-menu-item-contains" v-for="(a, key) in menuItem.allergens" :key="a._id"
                            class="item on">
                            {{ a.allergen }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <p id="other-menu-item-title">Salad Bar</p>
            <p id="other-menu-item-sub-title">sm $2.50 / m $4.00 / lg $5.00</p>
            <div class="row" id="other-menu-item-row">
              <div class="col-5 offset-1" id="other-menu-items-list">
                <div class="row">
                  <ul id="other-menu-item-list">
                    <li v-for="(menuItem, index) in generalMenuItems" :key="menuItem._id" id="other-menu-item-col">
                      <div v-show="menuItem.hide == false" id="menu-item">
                        <div id="other-menu-item">
                          <p v-if="index <= 2" id="other-menu-item-description" v-html="menuItem.description"></p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-5 offset-1" id="other-menu-items-list-2">
                <div class=" row">
                  <ul id="other-menu-item-list">
                    <li v-for="(menuItem, index) in generalMenuItems" :key="menuItem._id" id="other-menu-item-col">
                      <div v-show="menuItem.hide == false" id="menu-item">
                        <div id="other-menu-item">
                          <p v-if="index >= 3" id="other-menu-item-description" v-html="menuItem.description"></p>
                        </div>
                      </div>
                    </li>
                  </ul>
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
    name: "Menu9",
    props: ["signId"],
    data() {
      return {
        elem: document.documentElement,
        isScheduled: false,
        reRender: false,
        isLoading: true,
        domDescription: [],
        kitchenName: "",
        icon: require("../../assets/c17cSaladP353C1080px.png"),
        mode: "cafe17c",
        angleBrackets: " <<< "
      }
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Salad Bar",
          kitchenName: this.kitchenName,
        });
        this.$store.dispatch("checkIfScheduled")
        this.$store.dispatch("getMenuItemsOfTheDay")
      });
    },
    mounted() {
      // this.timer();
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Salad Bar"),
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
        "getSignTemplate",
        "scheduled",
        "signsLength",
        "specialMenuItems",
        "generalMenuItems"
      ]),
      ...mapState([
        "kitchenId",
        "signs",
        "activeSign",
        "signIsScheduled",
        "menuItemsOfTheDay",
        "loading",
        "rerender",
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
        if (this.$router.currentRoute.path == "/menu9/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
          this.icon = require("../../assets/c17cSaladP353C1080px.png")
        } else if (this.$router.currentRoute.path == "/menu9/cafe-36") {
          this.kitchenName = "Cafe 36";
          this.mode = "cafe36"
          this.icon = require("../../assets/c36SaladP7408CP1080px.png")
        }
      },
      toggleTheme() {
        this.mode = this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
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

  #menu9-body {
    outline: var(--cafe-outline)
  }

  #head-title,
  #menu-item-price {
    color: var(--cafe-font-color);
  }

  .menu9 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu9-border {
    padding: 1.25vw;
  }

  #menu9-body {
    min-height: 95vh;
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
    font-style: bold;
    padding-left: 10px;
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
    height: 95%;
    width: 95%;
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

  #special-menu-item-row {
    margin-left: 25px;
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
    font-size: 1.75vw;
    color: whitesmoke;
    font-style: bold;
    display: flex;
    justify-content: flex-start;
    margin: 0px;

  }

  #main-menu-item-description>>>p {
    font-size: 1.15vw;
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    margin-bottom: -10px;
    text-align: left;
    white-space: pre-wrap;
    /* css-3 */
    white-space: -moz-pre-wrap;
    /* Mozilla, since 1999 */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
    word-wrap: break-word;
    /* Internet Explorer 5.5+ */
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
    margin-left: 5px;
  }

  #main-menu-item-contains-protein,
  #main-menu-item-contains {
    margin-right: -3px;
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
    margin-top: 10px;
  }

  #other-menu-item-sub-title {
    color: white;
    font-size: 1.75vw;
    text-align: left;
    margin-left: 2.75vw;
    margin-bottom: 0px;
  }

  #other-menu-item-title {
    color: var(--cafe-font-color);
    font-size: 2vw;
    font-style: bold;
    text-align: left;
    margin-left: 2.75vw;
    margin-bottom: 0px;


  }

  #other-menu-items-list-2 {
    margin-top: -20px;
    padding-left: 0px;
    margin-left: 0px;
    margin-right: -10px;
  }

  #other-menu-item-list {
    margin-left: 0px;
    padding-left: 0px;
    margin-right: -10px;
  }

  #other-menu-item-row {
    margin-bottom: -20px;
  }

  #other-menu-item {
    display: flex;
    margin-bottom: -15px;
  }

  #other-menu-item-description>>>p {
    font-size: 1vw;
    margin-bottom: 0px;
    text-align: left;
  }
</style>