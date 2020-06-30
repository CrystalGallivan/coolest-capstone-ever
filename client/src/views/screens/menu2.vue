<template>
  <div class="menu2" :id="mode" :key="rerender">
    <div id="menu2-border">
      <!-- <div id="menu2-border" v-if="signIsScheduled == true"> -->
      <div class="container-fluid" id="menu2-body" @click="openFullscreen" v-if="activeSign._id">
        <div class="row" id="header-title-row">
          <div class="col-2" id="logo-col">
            <img :src="icon" id="hr-icon" alt="Sandwich Icon" />
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
        <div class="row">
          <div class="col" v-for="menuItem in menuItemsOfTheDay" :key="menuItem._id">
            <div v-show="isScheduled == true || menuItem.hide == false" id="menu-item">
              <p id="menu-item-order">{{ menuItem.order }}.</p>
              <p id="menu-item-name">{{ menuItem.name }}</p>
              <p id="menu-item-calories">/ {{ menuItem.calories }} Cal /</p>
              <p id="menu-item-description" v-html="menuItem.description"></p>
              <div id="menu-item-contains-group">
                <div id="menu-item-contains" v-if="menuItem.allergens[10].checked == true">
                  {{ menuItem.allergens[10].allergen + ","}}
                </div>
                <div id="menu-item-contains" v-if="menuItem.allergens[11].checked == true ">
                  {{ " " + menuItem.allergens[11].allergen + ","}}
                </div>
                <div id="menu-item-contains" v-if="menuItem.allergens[12].checked == true ">
                  {{ " " + menuItem.allergens[12].allergen}}
                </div>
                <div id="menu-item-contains"
                  v-if="menuItem.allergens[10].checked == true || menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true ">
                  <<< </div>
                    <div id="menu-item-contains">Contains: </div>
                    <div id="menu-item-contains" v-if="menuItem.protein.length > 0">
                      {{ menuItem.protein + "," }} </div>
                    <div
                      v-if="a.checked == true && a.allergen != 'Vegetarian' && a.allergen != 'Vegan' && a.allergen != 'GlutenFree'"
                      id="menu-item-contains" v-for="a in menuItem.allergens" :key="a._id">
                      {{ a.allergen}}<div id="menu-item-contains">,</div>
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
    name: "Menu2",
    data() {
      return {
        elem: document.documentElement,
        isScheduled: false,
        isLoading: true,
        kitchenName: "",
        icon: require("../../assets/c17cSandwichP353C1080px.png"),
        mode: "cafe17c"
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Deli1",
          kitchenName: this.kitchenName,
        });
      });
    },
    mounted: function () {
      this.timer();
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Deli1"),
        60000
      );
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
        if (this.$router.currentRoute.path == "/menu2/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
          this.icon = require("../../assets/c17cSandwichP353C1080px.png")
        } else if (this.$router.currentRoute.path == "/menu2/cafe-36") {
          this.kitchenName = "Cafe 36";
          this.mode = "cafe36"
          this.icon = require("../../assets/c36SandwichP7408CP1080px.png")
        }
      },
      toggleTheme() {
        this.mode = this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      },
      timer() {
        setInterval(this.load, 1);
      },
      load() {
        if (this.loading == true) {
          this.isLoading = false;
        }
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

  #menu2-body {
    outline: var(--cafe-outline)
  }

  #head-title,
  #menu-item-name {
    color: var(--cafe-font-color);
  }

  .menu2 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu2-border {
    padding: 1.25vw;
  }

  #menu2-body {
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

  #menu-item {
    font-family: "Open Sans", sans-serif;
    margin: 0.5vw;
    padding: 0.5vw;
    min-width: 100%;
    min-height: 100%;
    max-width: 15vw;

  }

  #menu-item-order {
    font-size: 1.75vw;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    margin-bottom: -10px;
  }

  #menu-item-name {
    font-size: 1.75vw;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    text-transform: uppercase;
  }

  #menu-item-calories {
    font-size: 1.5vw;
    display: flex;
    justify-content: flex-start;
  }

  #menu-item-description {
    font-size: 1vw;
    text-align: left;
  }

  #menu-item-contains {
    font-size: 0.75vw;
    margin: 0px;
    padding: 0px;
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 1px;
  }

  #menu-item-contains-group {
    margin: 0px;
    text-align: left;
  }
</style>