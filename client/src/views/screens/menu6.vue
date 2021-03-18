<template>
  <div class="menu6" :id="mode" :key="rerender">
    <div id="menu6-border">
      <div class="container-fluid" id="menu6-body" @click="openFullscreen"
        v-if="activeSign._id && signIsScheduled == true">
        <div class="row" id="menuItemsBody">
          <!-- Finish chaning ids to special menu-items -->
          <div class="col-5" id="specialMenuItems">
            <p id="base-menu-item-header">1. Choose Your Base</p>
            <div v-for="(menuItem, index) in baseMenuItems" :key="menuItem._id">
              <div v-show="isScheduled == true || menuItem.hide == false" id="base-menu-item">
                <p id="menu-item-name">{{ menuItem.name }}</p>
                <p id="menu-item-portion">{{ menuItem.portionSize }} </p>
                <p id="menu-item-backslash"> / </p>
                <p id="menu-item-calories"> {{ menuItem.calories }} cal </p>
                <p id="menu-item-description" v-html="menuItem.description"></p>
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
          <div class="col-5 offset-1">
            <p id="protein-menu-item-header">2. Choose Your Protein</p>
            <div v-for="(menuItem, index) in proteinMenuItems" :key="menuItem._id">
              <div v-show="isScheduled == true || menuItem.hide == false" id="protein-menu-item">
                <p id="menu-item-name">{{ menuItem.name }}</p>
                <p id="menu-item-portion"> {{ menuItem.portionSize }} </p>
                <p id="menu-item-backslash"> / </p>
                <p id="menu-item-calories"> {{ menuItem.calories }} cal</p>
                <p id="menu-item-description" v-html="menuItem.description"></p>
                <div id="menu-item-contains-group">
                  <div id="menu-item-contains" v-if="menuItem.allergens[10].checked == true">
                    {{ menuItem.allergens[10].allergen}}
                  </div>
                  <div v-if="menuItem.allergens[10].checked == true && menuItem.allergens[11].checked == true "
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
                    class="ml-1">
                    {{angleBrackets}}
                  </div>
                  <div id="menu-item-contains-title">Contains:</div>
                  <div id="menu-item-contains-protein" v-if="menuItem.protein.length > 0" class="item on">
                    {{ menuItem.protein }}
                  </div>
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
    </div>
  </div>
  </div>
</template>
<script>
  import Loading from "@/components/Loading.vue";
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "Menu6",
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
          category: "Global2",
          kitchenName: this.kitchenName,
        });
        this.$store.dispatch("checkIfScheduled")
      });
    },
    mounted: function () {
      // this.timer();
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Global2"),
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
        "baseMenuItems",
        "proteinMenuItems"
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
        if (this.$router.currentRoute.path == "/menu6/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
          this.icon = require("../../assets/c17cGlobalCuisineP353C1080px.png")
        } else if (this.$router.currentRoute.path == "/menu6/cafe-36") {
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

  #menu6-body,
  #base-menu-item,
  #protein-menu-item {
    outline: var(--cafe-outline)
  }

  #head-title,
  #menu-item-name {
    color: var(--cafe-font-color);
  }

  .menu6 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu6-border {
    padding: 1.25vw;
  }

  #menu6-body {
    min-height: 95vh;
  }

  #base-menu-item-header,
  #protein-menu-item-header {
    display: flex;
    align-self: flex-start;
    font-size: 20px;
    margin-top: 2vh;
    margin-bottom: -15px;
    text-indent: 15px;
  }

  #base-menu-item,
  #protein-menu-item {
    font-family: "Open Sans", sans-serif;
    margin-top: 30px;
    margin-bottom: -15px;
    padding: 0.5vw;
    min-width: 100%;
    min-height: 100%;
    max-width: 15vw;
  }

  #base-menu-item-header,
  #base-menu-item {
    margin-left: 6vw;
  }

  #protein-menu-item-header,
  #protein-menu-item {
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

  #menu-item-portion,
  #menu-item-backslash,
  #menu-item-calories {
    font-size: 1.5vw;
    display: inline-flex;
    margin-bottom: 4px;
    margin-right: 5px;
  }

  #menu-item-portion {
    margin-left: -28vw;

  }

  #menu-item-description {
    font-size: 1vw;
    text-align: left;
    margin-bottom: -10px;

  }

  #menu-item-contains,
  #menu-item-contains-title,
  #menu-item-contains-protein,
  #menu-item-contains-comma {
    font-size: 0.75vw;
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

  #menu-item-contains-protein,
  #menu-item-contains {
    margin-right: -3px;
    padding-left: 1px;
  }

  .item.on~.item.on::before {
    content: ', ';
    margin-right: 2px;
  }

  #menu-item-contains-group {
    margin: 0px;
    text-align: left;
  }

  /* .item {
    display: none;
  } */
</style>