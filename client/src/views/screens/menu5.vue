<template>
  <div class="menu5" :id="mode" :key="rerender">
    <div id="menu5-border">
      <div class="container-fluid" id="menu5-body" @click="openFullscreen"
        v-if="activeSign._id && signIsScheduled == true">
        <div class="row" id="header-title-row">
          <div class="col-2" id="logo-col">
            <img :src="icon" id="hr-icon" alt="Global1 Icon" />
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
          <div class="col-5" id="global-prices">
            <ul id="global-prices-list">
              <li id="menu-item-price-large">{{this.largePrice}}</li>
              <li id="menu-item-price-small">{{this.smallPrice}}</li>
              <li id="menu-item-price-descriptor">{{this.descriptor}}</li>
            </ul>
          </div>
          <div class="col-5 offset-1">
            <div v-for="(menuItem, index) in generalMenuItems" :key="menuItem._id">
              <div v-show="isScheduled == true || menuItem.hide == false" id="general-menu-item">
                <p id="general-menu-item-name">{{ menuItem.name }}</p>
                <p id="general-menu-item-description" v-html="menuItem.description"></p>
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
    name: "Menu5",
    data() {
      return {
        elem: document.documentElement,
        isScheduled: false,
        isLoading: true,
        kitchenName: "",
        icon: require("../../assets/c17cGlobalCuisineP353C1080px.png"),
        mode: "cafe17c",
        largePrice: "",
        smallPrice: "",
        descriptor: ""
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Global1",
          kitchenName: this.kitchenName,
        });
        this.$store.dispatch("checkIfScheduled")
        this.getPrices()
      });
    },
    mounted: function () {
      this.timer();
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Global1"),
        60000
      );
      this.toggleTheme()
      this.$store.dispatch("checkIfScheduled")
      this.getPrices()
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
        if (this.$router.currentRoute.path == "/menu5/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
          this.icon = require("../../assets/c17cGlobalCuisineP353C1080px.png")
        } else if (this.$router.currentRoute.path == "/menu5/cafe-36") {
          this.kitchenName = "Cafe 36";
          this.mode = "cafe36"
          this.icon = require("../../assets/c36GlobalCuisineP7408CP1080px.png")
        }
      },
      getPrices() {
        if (this.generalMenuItems[0]) {
          let menuItem = this.generalMenuItems[0];
          let priceString = menuItem.price;
          let priceArray = priceString.split(", ");
          this.largePrice = priceArray[0]
          this.smallPrice = priceArray[1]
          this.descriptor = priceArray[2]
        }

      },
      toggleTheme() {
        this.mode = this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      },
      timer() {
        setInterval(this.load, 1);
        setInterval(this.checkIfScheduled, 10000);
        setInterval(this.getPrices, 10000);
      },
      load() {
        if (this.loading == true) {
          this.isLoading = false;
        }
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

  #menu5-body {
    outline: var(--cafe-outline)
  }

  #head-title,
  #general-menu-item-name,
  #menu-item-price-descriptor {
    color: var(--cafe-font-color);
  }

  .menu5 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu5-border {
    padding: 1.25vw;
  }

  #menu5-body {
    min-height: 95vh;
  }

  #head-title,
  #head-subtitle {
    display: inline;
  }

  #head-subtitle {
    font-family: "PT Sans Narrow", sans-serif;
    font-size: 4.5vw;
    font-weight: bold;
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

  #general-menu-item {
    font-family: "Open Sans", sans-serif;
    margin: 0.5vw;
    padding: 0.5vw;
    min-width: 100%;
    min-height: 100%;
    max-width: 15vw;
    margin-top: 10%;
  }

  #general-menu-item-name {
    font-size: 3.5vw;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: -5px;
  }

  #general-menu-item-description {
    font-size: 2.25vw;
    text-indent: 10px;
    text-align: left;
    margin-bottom: -5px;

  }

  #global-prices-list {
    margin-top: 20%;
  }

  #menu-item-price-large,
  #menu-item-price-small {
    font-size: 6vw;
  }

  #menu-item-price-descriptor {
    font-size: 2vw;
  }
</style>