<template>
  <div class="menu1">
    <div id="menu1-border">
      <!-- <div id="menu1-border" v-if="signIsScheduled == true"> -->
      <!-- <div class="container-fluid" id="menu1-body" @click="openFullscreen" v-if="activeSign._id"> -->
      <div class="container-fluid" id="menu1-body" @click="openFullscreen">
        <div class="row">

          <div class="col-6 chefs-choice">
            <chefs-choice />
          </div>
          <div class="col-6 pizza">
            <pizza />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from "@/components/Loading.vue";
  import ChefsChoice from "@/components/ChefsChoice.vue";
  import Pizza from "@/components/Pizza.vue";
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "Menu1",
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
      };
    },
    // created() {
    //   this.checkRouter().then((a) => {
    //     this.$store.dispatch("getSignsByCategory", {
    //       category: "Chef's Choice/Pizza",
    //       kitchenName: this.kitchenName,
    //     });
    //   });
    // },
    // mounted() {
    //   this.timer();
    //   this.timeout = setInterval(
    //     () => this.$store.dispatch("checkForUpdatedSign", "Chef's Choice/Pizza"),
    //     60000
    //   );
    // },
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
      // async checkRouter() {
      //   if (this.$router.currentRoute.path == "/menu1/cafe-17c") {
      //     this.kitchenName = "Cafe 17C";
      //   } else if (this.$router.currentRoute.path == "/menu1/cafe-36") {
      //     this.kitchenName = "Cafe 36";
      //   }
      // },
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
      Pizza,
      ChefsChoice
    },
  };
</script>

<style scoped>
  .menu1 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu1-border {
    padding: 1.25vw;
  }

  #menu1-body {
    outline: 3px solid rgb(109, 197, 154);
    min-height: 95vh;
  }

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
    font-size: 2.5vw;
    /* font-weight: bold; */
  }

  #head-title {
    font-size: 7vw;
    font-family: "PT Sans Narrow", sans-serif;
    font-style: bold;
    margin-bottom: -1%;
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
    color: rgb(109, 197, 154);
  }

  #menu-item-calories {
    font-size: 1.75vw;
    color: rgb(109, 197, 154);
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