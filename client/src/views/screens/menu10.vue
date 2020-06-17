<template>
  <div class="menu10" :key="rerender" :id="mode">
    <!-- <loading v-if="isLoading == true" /> -->
    <div id="menu10-border" v-if="signIsScheduled == true">
      <div class="container-fluid" id="menu10-body" @click="openFullscreen" v-if="activeSign._id">
        <div class="row" id="header-title-row">
          <div class="col-2" id="logo-col">
            <img v-bind:src="icon" id="hr-icon" alt="Soup Icon" />
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
          <div class="col-6" v-for="menuItem in scheduledMenuItems" :key="menuItem._id">
            <div v-show="isScheduled == true || menuItem.hide == false" id="menu-item">
              <p id="menu-item-name">{{ menuItem.name }}</p>
              <p id="menu-item-calories">Calories: {{ menuItem.calories }}</p>
              <p id="menu-item-description" v-html="menuItem.description"></p>
              <p id="menu-item-contains">Contains: {{ menuItem.protein }} /</p>
              <p v-if="a.checked == true" id="menu-item-contains" v-for="a in menuItem.allergens" :key="a._id">
                {{ a.allergen }},
              </p>
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
    name: "Menu10",
    props: ["signId"],
    data() {
      return {
        backgroundImage: "../assets/tile-bkg-teal.jpg",
        elem: document.documentElement,
        isScheduled: false,
        reRender: false,
        isLoading: true,
        domDescription: [],
        kitchenName: "",
        icon: "@/assets/c17cSoupP353C1080px.png",
        mode: "cafe17c"
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Soup",
          kitchenName: this.kitchenName,
        });
      });
    },
    mounted() {
      this.timer();
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Soup"),
        60000
      );
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
        if (this.$router.currentRoute.path == "/menu10/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
          this.icon = "@/assets/c17cSoupP353C1080px.png"
        } else if (this.$router.currentRoute.path == "/menu10/cafe-36") {
          this.kitchenName = "Cafe 36";
          this.mode = "cafe36"
          this.icon = "@/assets/c36SoupP7408CP1080px.png"
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

  #menu10-body {
    outline: var(--cafe-outline)
  }

  #head-title,
  #menu-item-name,
  #menu-item-calories {
    color: var(--cafe-font-color);
  }

  .menu10 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu10-border {
    padding: 1.25vw;
  }

  #menu10-body {
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
    /* font-weight: bold; */
  }

  #head-title {
    font-size: 7vw;
    font-family: "PT Sans Narrow", sans-serif;
    font-style: bold;
    margin-bottom: 1%;
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

  #menu-item {
    font-family: "Open Sans", sans-serif;
    margin: 0.5vw;
    padding: 0.5vw;
    max-width: 100%;
    max-height: 100%;
  }

  #menu-item-name {
    font-size: 2.5vw;
  }

  #menu-item-calories {
    font-size: 1.75vw;
  }

  #menu-item-description {
    font-size: 1.5vw;
  }

  #menu-item-contains {
    font-size: 1.25vw;
    margin: 0px;
    display: inline;
    font-weight: bold;
  }
</style>