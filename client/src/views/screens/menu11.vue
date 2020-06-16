<template>
  <div class="menu11" id="menu11" v-if="activeSign._id">
    <!-- <loading v-if="loading == true" /> -->
    <div id="menu11-border">
      <div class="container-fluid" id="menu11-body" @click="openFullscreen">
        <div class="row" id="header-title">
          <div class="col-2" id="logo-col">
            <img src="@/assets/c36TacoP7408CP1080px.png" id="hr-icon" alt="" />
          </div>
          <div class="col-9">
            <p id="head-title">{{ activeSign.title }}</p>
            <hr id="header-line" />
          </div>
        </div>
        <div class="row" id="price-option">
          <div class="col-3 offset-1" v-for="menuOption in menuOptions" :key="menuOption._id">
            <ul>
              <p id="price">
                {{ menuOption.menuOptionTitle }}
              </p>
              <li id="price-option" v-html="menuOption.description"></li>
            </ul>
          </div>
        </div>
        <div class="row" id="wednesday-option">
          <div class="col-12">
            <p id="wednesday-option-title">
              Every Wednesday - Crisp Taco Salad Shells
            </p>
          </div>
        </div>
        <div class="row" id="body-content">
          <div class="col-4" id="options-1">
            <div class="row">
              <div class="col">
                <p id="options-title">BASE / Calories / Portion</p>
              </div>
            </div>
            <ul id="end-of-option">
              <li v-if="baseMenuItems.length > 0" id="options-list-item"
                v-for="baseMenuItem in baseMenuItems.splice(0, 3)" :key="baseMenuItem._id">
                {{ baseMenuItem.name }} / {{ baseMenuItem.calories }} /
                {{ baseMenuItem.portionSize }}
              </li>
            </ul>
            <ul id="end-of-option">
              <li v-if="baseMenuItems.length > 0" id="options-list-item"
                v-for="baseMenuItem in baseMenuItems.splice(0, 2)" :key="baseMenuItem._id">
                {{ baseMenuItem.name }} / {{ baseMenuItem.calories }} /
                {{ baseMenuItem.portionSize }}
              </li>
            </ul>
            <ul id="end-of-option">
              <li id="options-list-item" v-for="baseMenuItem in baseMenuItems.splice(0, 2)" :key="baseMenuItem._id">
                {{ baseMenuItem.name }} / {{ baseMenuItem.calories }} /
                {{ baseMenuItem.portionSize }}
              </li>
            </ul>
          </div>
          <div class="col-4" id="options-2">
            <p id="options-title">PROTEIN / calories/ portion</p>
            <ul v-if="proteinMenuItems.length > 0" v-for="proteinMenuItem in proteinMenuItems"
              :key="proteinMenuItem._id">
              <li id="options-list-item">
                {{ proteinMenuItem.name.toUpperCase() }} / {{ proteinMenuItem.calories }} /
                {{ proteinMenuItem.portionSize }}
              </li>
              <li id="description" v-html="proteinMenuItem.description"></li>
            </ul>
          </div>
          <div class="col-4" id="options">
            <p id="options-title">TOPPINGS / calories / portion</p>
            <ul v-if="toppingsMenuItems.length > 0" v-for="toppingsMenuItem in toppingsMenuItems.slice(0, 3)"
              :key="toppingsMenuItem._id">
              <li id="options-list-item">
                {{ toppingsMenuItem.name }} / {{ toppingsMenuItem.calories }} /
                {{ toppingsMenuItem.portionSize }}
              </li>
            </ul>
            <ul>
              <li id="add-on-option" v-if="addOnMenuItems.length > 0" v-for="addOnMenuItem in addOnMenuItems"
                :key="addOnMenuItem._id">
                {{ addOnMenuItem.name }} / {{ addOnMenuItem.calories }} /
                {{ addOnMenuItem.portionSize }}
                <p id="add-on-option-price">{{ addOnMenuItem.price }}</p>
              </li>
            </ul>
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
    name: "Menu11",
    data() {
      return {
        backgroundImage: "../assets/tile-bkg-teal.jpg",
        elem: document.documentElement,
        loading: false,
        isScheduled: false,
        reRender: false,
        isLoading: true,
        kitchenName: "",
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Southwest",
          kitchenName: this.kitchenName,
        });
      });
    },
    mounted() {
      this.timer();
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Southwest"),
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
        "menuOptions",
        "baseMenuItems",
        "proteinMenuItems",
        "toppingsMenuItems",
        "addOnMenuItems",
      ]),
      ...mapState([
        "kitchenId",
        "signs",
        "activeSign",
        "signIsScheduled",
        "menuItemsOfTheDay",
        // "loading",
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
        if (this.$router.currentRoute.path == "/menu11/cafe-17c") {
          this.kitchenName = "Cafe 17C";
        } else if (this.$router.currentRoute.path == "/menu11/cafe-36") {
          this.kitchenName = "Cafe 36";
        }
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
  .menu11 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    background-repeat: inherit;
    padding-top: 1.5vh;
    padding-bottom: 1.5vh;
    max-width: 100%;
    max-height: 100%;
  }

  #menu11-border {
    padding: 1.25vw;
  }

  #menu11-body {
    outline: 3px solid rgb(246, 192, 14);
    padding-bottom: 3vh;
  }

  ul {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
  }

  #title,
  #head-title {
    color: rgb(246, 192, 14);
    text-align: left;
  }

  #head-title {
    font-size: 7vw;
    font-family: "Open Sans", sans-serif;
    margin-bottom: -1%;
    margin-top: 2%;
  }

  #add-on-option {
    margin-top: 50px;
  }

  #description {
    margin-bottom: 25px;
    font-size: 1.5vw;
  }

  #end-of-option {
    margin-bottom: 25px;
  }

  #wednesday-option-title {
    outline: 1px solid rgb(65, 113, 156);
    padding: 5px;
    margin: 10px;
    font-size: 1.5vw;
    color: rgb(246, 192, 14);
  }

  #bcp-col {
    margin-right: -10px;
    margin-left: -10px;
    padding: 0px;
  }

  #options-title,
  #add-on-option-price {
    color: rgb(246, 192, 14);
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.5vw;
  }

  #hr-icon {
    max-width: 95%;
    max-height: 95%;
    margin-top: 15px;
    margin-left: 5px;
    margin-right: 5px;
  }

  #header-line {
    height: 0px;
    margin-top: 1px;
    margin-bottom: 10px;
    border: 0;
    border-top: 3px solid whitesmoke;
  }

  p {
    margin-bottom: 0px;
  }

  #options-list-item,
  #description,
  #end-of-option,
  #price-option,
  #add-on-option {
    font-size: 1.25vw;
  }

  #price {
    font-size: 1.5vw;
  }
</style>