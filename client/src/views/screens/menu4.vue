<template>
  <div class="menu4" :id="mode" :key="rerender">
    <div id="menu4-border">
      <div class="container-fluid" id="menu4-body" @click="openFullscreen"
        v-if="activeSign._id && signIsScheduled == true">
        <div class="row" id="header-title-row">
          <div class="col-2" id="logo-col">
            <img :src="icon" id="hr-icon" alt="Hot Entree Icon" />
          </div>
          <div class="col-10" id="header-col">
            <p id="head-title" :signId="activeSign._id">
              {{ activeSign.title }}
            </p>
            <p id="head-subtitle">{{ activeSign.subTitle }}</p>
          </div>
        </div>
        <div class="row" id="hr-row">
          <div class="col-10 offset-2">
            <hr id="header-line" />
          </div>
        </div>
        <div class="row" id="menuItemsBody">
          <!-- Finish chaning ids to special menu-items -->
          <div class="col-5 offset-1" id="specialMenuItems">
            <div v-for="(menuItem, index) in specialMenuItems" :key="menuItem._id">
              <div v-show="isScheduled == true || menuItem.hide == false" id="special-menu-item">
                <p id="special-menu-item-price">{{ menuItem.price }}</p>
                <p id="special-menu-item-name">{{ menuItem.name }}</p>
                <p id="special-menu-item-calories">/ {{ menuItem.calories }} Cal /</p>
                <p id="special-menu-item-description" v-html="menuItem.description"></p>
                <div id="special-menu-item-contains-group">
                  <div id="special-menu-item-contains" v-if="menuItem.allergens[10].checked == true">
                    {{ menuItem.allergens[10].allergen}}
                  </div>
                  <div v-if="menuItem.allergens[10].checked == true && menuItem.allergens[11].checked == true "
                    id="special-menu-item-contains-comma">,</div>
                  <div id="special-menu-item-contains" v-if="menuItem.allergens[11].checked == true ">
                    {{ " " + menuItem.allergens[11].allergen}}
                  </div>
                  <div v-if="menuItem.allergens[12].checked == true && menuItem.allergens[11].checked == true"
                    id="special-menu-item-contains-comma">,</div>
                  <div id="special-menu-item-contains" v-if="menuItem.allergens[12].checked == true ">
                    {{ " " + menuItem.allergens[12].allergen}}
                  </div>
                  <div id="special-menu-item-contains"
                    v-if="menuItem.allergens[10].checked == true || menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true ">
                    {{angleBrackets}} </div>
                  <div id="special-menu-item-contains">Contains: </div>
                  <div id="special-menu-item-contains-protein" v-if="menuItem.protein.length > 0">
                    {{ menuItem.protein + "," }} </div>
                  <div
                    v-if="a.checked == true && a.allergen != 'Vegetarian' && a.allergen != 'Vegan' && a.allergen != 'Gluten Free'"
                    id="special-menu-item-contains" v-for="(a, key) in menuItem.allergens" :key="a._id">
                    <div v-if="getFirstTrue[index] != a.allergen && key !== 0" id="special-menu-item-contains-comma">,
                    </div>
                    {{ a.allergen}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5 offset-1">
            <div v-for="(menuItem, index) in generalMenuItems" :key="menuItem._id">
              <div v-show="isScheduled == true || menuItem.hide == false" id="general-menu-item">
                <p id="general-menu-item-name">{{ menuItem.name }}</p>
                <p id="general-menu-item-calories">/ {{ menuItem.calories }} Cal /</p>
                <p id="general-menu-item-description" v-html="menuItem.description"></p>
                <div id="general-menu-item-contains-group">
                  <div id="general-menu-item-contains" v-if="menuItem.allergens[10].checked == true">
                    {{ menuItem.allergens[10].allergen}}
                  </div>
                  <div v-if="menuItem.allergens[10].checked == true && menuItem.allergens[11].checked == true "
                    id="general-menu-item-contains-comma">,</div>
                  <div id="general-menu-item-contains" v-if="menuItem.allergens[11].checked == true ">
                    {{ " " + menuItem.allergens[11].allergen}}
                  </div>
                  <div v-if="menuItem.allergens[12].checked == true && menuItem.allergens[11].checked == true "
                    id="general-menu-item-contains-comma">,</div>
                  <div id="general-menu-item-contains" v-if="menuItem.allergens[12].checked == true ">
                    {{ " " + menuItem.allergens[12].allergen}}
                  </div>
                  <div id="general-menu-item-contains"
                    v-if="menuItem.allergens[10].checked == true || menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true ">
                    {{angleBrackets}} </div>
                  <div id="general-menu-item-contains">Contains: </div>
                  <div id="general-menu-item-contains-protein" v-if="menuItem.protein.length > 0">
                    {{ menuItem.protein + "," }} </div>
                  <div
                    v-if="a.checked == true && a.allergen != 'Vegetarian' && a.allergen != 'Vegan' && a.allergen != 'Gluten Free'"
                    id="general-menu-item-contains" v-for="(a, key) in menuItem.allergens" :key="a._id">
                    <div v-if="getFirstTrue[index] != a.allergen && key !== 0" id="general-menu-item-contains-comma">,
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
  </div>
  </div>
</template>
<script>
  import Loading from "@/components/Loading.vue";
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "Menu4",
    data() {
      return {
        elem: document.documentElement,
        isScheduled: false,
        isLoading: true,
        kitchenName: "",
        icon: require("../../assets/c17cHotEntreeP353C1080px.png"),
        mode: "cafe17c",
        angleBrackets: "<<<"
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Hot Entree",
          kitchenName: this.kitchenName,
        });
        this.$store.dispatch("checkIfScheduled")
      });
    },
    mounted: function () {
      this.timer();
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Hot Entree"),
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
        "specialMenuItems",
        "generalMenuItems",
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
        if (this.$router.currentRoute.path == "/menu4/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
          this.icon = require("../../assets/c17cHotEntreeP353C1080px.png")
        } else if (this.$router.currentRoute.path == "/menu4/cafe-36") {
          this.kitchenName = "Cafe 36";
          this.mode = "cafe36"
          this.icon = require("../../assets/c36HotEntreeP7408CP1080px.png")
        }
      },
      toggleTheme() {
        this.mode = this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      },
      timer() {
        setInterval(this.checkIfScheduled, 10000);
      },
      checkIfScheduled() {
        return this.$store.dispatch("checkIfScheduled")
      }
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

  #menu4-body {
    outline: var(--cafe-outline)
  }

  #head-title,
  #special-menu-item-name,
  #general-menu-item-name {
    color: var(--cafe-font-color);
  }

  .menu4 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu4-border {
    padding: 1.25vw;
  }

  #menu4-body {
    min-height: 95vh;
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
    margin-bottom: 1vw;
    margin-top: 2%;
    margin-right: 15vw;
  }

  #logo-cal {
    padding: 0px;
  }

  #hr-row {
    height: 100%;
    width: 100%;
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

  #general-menu-item,
  #special-menu-item {
    font-family: "Open Sans", sans-serif;
    margin: 0.5vw;
    padding: 0.5vw;
    min-width: 100%;
    min-height: 100%;
    max-width: 15vw;
  }

  #special-menu-item {
    margin-bottom: 40px;
  }

  #special-menu-item-price,
  #special-menu-item-name,
  #general-menu-item-price,
  #general-menu-item-name {
    font-size: 1.75vw;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: -5px;
  }

  #special-menu-item-calories,
  #general-menu-item-calories {
    font-size: 1.5vw;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -5px;

  }

  #special-menu-item-description,
  #general-menu-item-description {
    font-size: 1vw;
    text-align: left;
    margin-bottom: -5px;

  }

  #special-menu-item-contains,
  #general-menu-item-contains,
  #special-menu-item-contains-protein,
  #general-menu-item-contains-protein,
  #special-menu-item-contains-comma,
  #general-menu-item-contains-comma {
    font-size: 0.75vw;
    margin: 0px;
    padding: 0px;
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 1px;

  }

  #special-menu-item-contains-protein,
  #general-menu-item-contains-protein {
    margin-right: 2px;
  }

  #special-menu-item-contains-comma,
  #general-menu-item-contains-comma {
    margin-left: -3px;
    margin-right: 2px;
  }

  #special-menu-item-contains-group,
  #general-menu-item-contains-group {
    margin: 0px;
    text-align: left;
  }
</style>