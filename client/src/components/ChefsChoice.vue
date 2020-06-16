<template>
  <div class="chefs-choice">
    <div class="row" id="header-title-row" v-if="activeSign._id">
      <div class="col-4" id="logo-col">
        <img src="@/assets/c17cChefP353C1080px.png" id="hr-icon" alt="" />
      </div>
      <div class="col-8" id="header-col">
        <p id="head-title" :signId="activeSign._id">
          {{ activeSign.category }}
        </p>

      </div>
      <div class="row" id="hr-row">
        <div class="col-8 offset-4">
          <hr id="header-line" />
        </div>
      </div>
    </div>
    <div class="row">
      <p id="head-subtitle">{{ activeSign.subTitle }}</p>
      <div class="col-12" v-for="menuItem in menuItemsOfTheDay" :key="menuItem._id" id="menu-item-col">
        <div v-show="isScheduled == true || menuItem.hide == false" id="menu-item">
          <p id="menu-item-name">{{ menuItem.order + "." + " " + menuItem.name }}</p>
          <p id="menu-item-calories">Calories: {{ menuItem.calories }}</p>
          <p id="menu-item-description" v-html="menuItem.description"></p>
          <div id="menu-item-contains-group">
            <p id="menu-item-contains">Contains: {{ menuItem.protein + "," }} </p>
            <p v-if="a.checked == true" id="menu-item-contains" v-for="a in menuItem.allergens" :key="a._id">
              {{ a.allergen }},
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "ChefsChoice",
    props: ["signId"],
    data() {
      return {
        isScheduled: false,
        reRender: false,
        isLoading: true,
        kitchenName: "",
      };
    },
    created() {
      this.checkRouter().then((a) => {
        this.$store.dispatch("getSignsByCategory", {
          category: "Chef's Choice",
          kitchenName: this.kitchenName,
        });
      });
    },
    mounted() {
      this.timeout = setInterval(
        () => this.$store.dispatch("checkForUpdatedSign", "Chef's Choice"),
        60000
      );
    },
    beforeDestroy() {
      clearInterval(this.timeout);

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
      async checkRouter() {
        if (this.$router.currentRoute.path == "/menu1/cafe-17c") {
          this.kitchenName = "Cafe 17C";
        } else if (this.$router.currentRoute.path == "/menu1/cafe-36") {
          this.kitchenName = "Cafe 36";
        }
      },

    },

  };
</script>

<style scoped>
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
    font-size: 2vw;
    margin-left: 25px;
    margin-bottom: 0px;
    /* font-weight: bold; */
  }

  #head-title {
    font-size: 5vw;
    font-family: "PT Sans Narrow", sans-serif;
    font-style: bold;
    margin-bottom: -1%;
    margin-top: 2%;
    padding-top: 50px;

  }

  #logo-cal {
    padding: 0px;
  }

  #hr-row {
    height: 100%;
    width: 100%;
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
    padding: 0.5vw;
    max-width: 100%;
    max-height: 100%;
  }

  #menu-item-name {
    font-size: 2vw;
    color: rgb(109, 197, 154);
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

  #menu-item-contains {
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
  }
</style>