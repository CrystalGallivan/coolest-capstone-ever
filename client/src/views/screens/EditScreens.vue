<template>
  <div class="edit-screens" :id="mode">
    <div class="col-12" :id="loading">
      <!-- <loading v-if="loading == true" /> -->
      <h1 id="cafe-name" v-if="kitchen">{{ kitchen.name }}</h1>
      <ul>
        <li v-if="sign.kitchenId == kitchen._id" v-for="sign in signs" :key="sign._id" :signId="sign._id">
          <div class="row" id="selected-sign">
            <div class="col-6" id="sign-title">
              <p>{{ sign.title }}</p>
            </div>
            <div class="col-5" id="sign-subtitle">
              <p id="subtitle">{{ sign.subTitle }}</p>
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
</template>
<script>
  import MenuItem from "@/components/MenuItem.vue";
  import MenuOption from "@/components/MenuOption.vue";
  import EditSign from "@/components/EditSign.vue";
  import Loading from "@/components/Loading.vue";
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
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
      };
    },
    created() {
      this.$store.dispatch("getAllSigns");
    },
    mounted() {
      this.toggleTheme();
    },
    computed: {
      ...mapGetters([
        "kitchen"
      ]),
      ...mapState([
        "kitchenId",
        "signs",
        "kitchens",
        "mode",
        "loading"
      ]),
    },
    methods: {
      toggleTheme() {
        this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      }
    },
    components: {
      MenuItem,
      MenuOption,
      EditSign,
      Loading
    },
  };
</script>
<style scoped>
  #cafe17c {
    --cafe-font-color: rgb(109, 197, 154);
  }

  #cafe36 {
    --cafe-font-color: rgb(246, 192, 14);
  }

  #cafe-name,
  #sign-title {
    color: var(--cafe-font-color);
  }

  .edit-screens {
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
    font-size: 6.5vw;
    font-family: "PT Sans Narrow", sans-serif;
    display: flex;
    align-items: flex-start;
  }

  #sign-subtitle {
    color: whitesmoke;
    font-size: 4vw;
    display: flex;
    align-items: center;
  }

  #subtitle {
    margin-bottom: 5px;
  }

  .modal-open {
    overflow: scroll;
  }
</style>