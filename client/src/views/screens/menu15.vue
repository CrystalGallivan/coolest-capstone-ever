<template>
  <div class="menu15">
    <div id="menu15-border">
      <div class="container-fluid" id="menu15-body" @click="openFullscreen" v-if="signIsScheduled == true">
        <div class="row">
          <div class="chefs-choice">
            <div class="row" id="header-title-row">
              <div class="col-2" id="logo-col">
                <img src="@/assets/c36cChefP7408CP1080px.png" id="hr-icon" alt="" />
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
              <div class="col-6" v-for="menuItem in menuItemsOfTheDay" :key="menuItem._id" id="menu-item-col">
                <div v-show="isScheduled == true || menuItem.hide == false" id="menu-item">
                  <p id="menu-item-name">{{ menuItem.order + "." + " " + menuItem.name }}</p>
                  <p id="menu-item-calories">Calories: {{ menuItem.calories }}</p>
                  <p id="menu-item-description" v-html="menuItem.description"></p>
                  <!-- <div id="menu-item-contains-group">
                    <p id="menu-item-contains">Contains: {{ menuItem.protein + "," }} </p>
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
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from "@/components/Loading.vue";
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "Menu15",
    props: ["signId"],
    data() {
      return {
        // backgroundImage: "../assets/tile-bkg-teal.jpg",
        elem: document.documentElement,
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
          category: "Chef's Choice",
          kitchenName: this.kitchenName,
        });
        this.$store.dispatch("checkIfScheduled")
      });
    },
    mounted() {
      // this.timer()
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Chef's Choice"),
        60000
      );
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
        if (this.$router.currentRoute.path == "/menu15/cafe-17c") {
          this.kitchenName = "Cafe 17C";
        } else if (this.$router.currentRoute.path == "/menu15/cafe-36") {
          this.kitchenName = "Cafe 36";
        }
      },
      // timer() {
      //   setInterval(this.checkIfScheduled, 300000);
      // },
      // checkIfScheduled() {
      //   return this.$store.dispatch("checkIfScheduled")
      // },
    },
    components: {
      Loading,
    },
  };
</script>

<style scoped>
  .menu15 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu15-border {
    padding: 1.25vw;
  }

  #menu15-body {
    outline: 3px solid rgb(246, 192, 14);
    min-height: 95vh;
  }

  #head-title {
    color: rgb(246, 192, 14);
    text-align: left;
  }

  #head-title,
  #head-subtitle {
    display: inline;
  }

  #head-subtitle {
    font-family: "PT Sans Narrow", sans-serif;
    font-size: 4vw;
    margin-left: 40vw;
    margin-bottom: 0px;
    /* font-weight: bold; */
  }

  #head-title {
    font-size: 5vw;
    font-family: "PT Sans Narrow", sans-serif;
    font-style: bold;
    margin-bottom: 1%;
    margin-top: 2%;
    padding-top: 50px;

  }

  #logo-cal {
    padding: 0px;
  }

  #hr-row {
    height: 100%;
    width: 100%;
    padding-bottom: 20px;
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
    padding: 4vw;
    max-width: 100%;
    max-height: 100%;
  }

  #menu-item-name {
    font-size: 2vw;
    color: rgb(246, 192, 14);
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

  /* #menu-item-contains {
    font-size: 1.25vw;
    margin: 0px;
    display: inline-flex;
    font-weight: bold;
    text-transform: uppercase;
  }

  #menu-item-contains-group {
    margin: 0px;
    display: flex;
    justify-content: flex-start;
  } */
</style>