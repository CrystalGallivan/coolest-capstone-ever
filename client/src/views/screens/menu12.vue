<template>
  <div class="menu12" :key="rerender" :id="mode">
    <!-- <loading v-if="isLoading == true" /> -->
    <div id="menu12-border">
      <div class="container-fluid" id="menu12-body" @click="openFullscreen"
        v-if="activeSign._id && signIsScheduled == true">
        <div class=" row" id="header-title-row">
          <div class="col-2" id="logo-col">
            <img :src="icon" id="hr-icon" alt="Beverage Icon" />
          </div>
          <div class="col-19" id="header-col">
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
          <div class="col-5 offset-1" id="list-col-one">
            <ul v-for="(menuItem, index) in menuItemsOfTheDay" :key="menuItem._id">
              <li v-if="menuItem.hide == false && index < 12" id="menu-item">
                <p id="menu-item-price">{{ menuItem.price }}</p>
                <p id="menu-item-name">{{ menuItem.name }}</p>
                <p id="menu-item-slash">/</p>
                <p id="menu-item-calories">{{ menuItem.calories }} cal</p>
              </li>
            </ul>
          </div>
          <div class="col-5 offset-1" id="list-col-two">
            <ul v-for="(menuItem, index) in menuItemsOfTheDay" :key="menuItem._id">
              <li v-if="menuItem.hide == false && index >= 12" id="menu-item">
                <p id="menu-item-price">{{ menuItem.price }}</p>
                <p id="menu-item-name">{{ menuItem.name }}</p>
                <p id="menu-item-slash">/</p>
                <p id="menu-item-calories">{{ menuItem.calories }} cal</p>
              </li>
            </ul>
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
    name: "Menu12",
    props: ["signId"],
    data() {
      return {
        elem: document.documentElement,
        isScheduled: false,
        reRender: false,
        isLoading: true,
        domDescription: [],
        kitchenName: "",
        icon: require("../../assets/c17cBeveragesP353C1080px.png"),
        mode: "cafe17c",
        angleBrackets: "<<<"
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Beverage",
          kitchenName: this.kitchenName,
        });
        this.$store.dispatch("checkIfScheduled")
        this.$store.dispatch("getMenuItemsOfTheDay")
      });
    },
    mounted() {
      // this.timer();
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Beverage"),
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
        "signsLength"
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
        if (this.$router.currentRoute.path == "/menu12/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
          this.icon = require("../../assets/c17cBeveragesP353C1080px.png")
        } else if (this.$router.currentRoute.path == "/menu12/cafe-36") {
          this.kitchenName = "Cafe 36";
          this.mode = "cafe36"
          this.icon = require("../../assets/c36BeveragesP7408CP1080px.png")
        }
      },
      toggleTheme() {
        this.mode = this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      },
      checkIfScheduled() {
        return this.$store.dispatch("checkIfScheduled")
      },
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

  #menu12-body {
    outline: var(--cafe-outline)
  }

  #head-title,
  #menu-item-price {
    color: var(--cafe-font-color);
  }

  .menu12 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu12-border {
    padding: 1.25vw;
  }

  #menu12-body {
    min-height: 95vh;
  }

  #head-title {
    text-align: left;
  }

  #head-title,
  #head-subtitle {
    display: inline;
  }

  #head-subtitle {
    font-family: "PT Sans Narrow", sans-serif;
    font-size: 2.5vw;
  }

  #head-title {
    font-size: 7vw;
    font-family: "PT Sans Narrow", sans-serif;
    font-style: bold;
    margin-top: 2%;
    margin-right: 37vw;
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

  #list-col-one {
    padding-top: 5%;
  }

  #list-col-two {
    padding-top: 3.5%;
  }

  #menu-item {
    display: flex;
    margin-bottom: -30px;
    margin-top: -30px;
  }

  #menu-item-price {
    font-weight: bold;
    margin-right: 2vw;
    font-size: 1.75vw;
  }

  #menu-item-name {
    font-size: 1.5vw;
  }

  #menu-item-slash {
    margin-left: 0.5vw;
  }

  #menu-item-calories {
    font-weight: bold;
    margin-left: 0.5vw;
    font-size: 1.5vw;

  }
</style>