<template>
  <div class="edit-screens">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <ul>
            <li v-show="sign.kitchenId == kitchenId" v-for="sign in signs" :key="sign._id" :signId="sign._id">
              <div class="row" id="selected-sign">
                <div class="col-6" id="sign-title">
                  <p>{{ sign.title }}</p>
                </div>
                <div class="col-5" id="sign-subtitle">
                  <p>{{ sign.subTitle }}</p>
                </div>
                <div class="col-1" id="sign-edit-btn">
                  <edit-sign :sign="sign" :signId="sign._id" />
                </div>
              </div>
              <menu-option :signId="sign._id" :menuOptions="sign.menuOption" :sign="sign" />
              <menu-item :signId="sign._id" :menuItems="sign.menuItem" :sign="sign" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MenuItem from "@/components/MenuItem.vue";
  import MenuOption from "@/components/MenuOption.vue";
  import EditSign from "@/components/EditSign.vue";
  export default {
    name: "EditScreens",
    props: {
      signId: String,
      menuOptions: Array,
      menuItems: Array,
      sign: Object,
    },
    data() {
      return {
        backgroundImage: "@/assets/tile-bkg-teal.jpg",
      };
    },
    created() {
      this.$store.dispatch("getAllSigns");
    },
    mounted() { },
    computed: {
      kitchens() {
        return this.$store.state.kitchens;
      },
      kitchenId() {
        return this.$store.state.kitchenId;
      },
      signs() {
        return this.$store.state.signs;
      },
      activeKitchen() {
        return this.$store.state.activeKitchen;
      },
    },
    methods: {},
    components: {
      MenuItem,
      MenuOption,
      EditSign,
    },
  };
</script>
<style scoped>
  .edit-screens {
    /* background-color: rgb(5, 38, 45); */
    background: url(../../assets/tile-bkg-teal.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  ul {
    list-style: none;
  }

  #edit-sign-btn {
    display: flex;
    align-items: center;
  }

  #sign-title,
  #sign-subtitle {
    padding: 0px;
    margin: 0px;
  }

  #sign-title {
    color: rgb(109, 197, 164);
    font-size: 6.5vw;
    font-family: "PT Sans Narrow", sans-serif;
    display: flex;
    align-items: flex-start;
  }

  #sign-subtitle {
    color: whitesmoke;
    font-size: 4vw;
    display: flex;
    align-items: flex-end;
  }
</style>