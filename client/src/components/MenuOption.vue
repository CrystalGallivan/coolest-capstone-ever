<template>
  <div class="menu-option" :id="mode">
    <div class="row" id="menu-option-div">
      <div class="col-12" id="menu-option-div">
        <ul id="menu-option-div">
          <li v-for="menuOption in menuOptions">
            <div class="row" id="menu-option-div">
              <div class="col" id="menu-option-div">
                <p id="menu-option-title">{{ menuOption.menuOptionTitle }}</p>
                <edit-menu-option :menuOption="menuOption" :signId="signId" />
              </div>
            </div>
            <div class="row" id="menu-option-div">
              <p id="menu-option-description" v-html="menuOption.description"></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-6" id="menu-option-div"></div>
    </div>
  </div>
</template>
<script>
  import EditMenuOption from "@/components/EditMenuOption.vue";
  export default {
    name: "MenuOption",
    props: {
      signId: String,
      menuOptions: Array,
      menuOption: Object,
      menuItems: Array,
      sign: Object,
      menuItem: Object,
    },
    data() {
      return {
        contains: [],
      };
    },
    mounted() {
      this.toggleTheme();
    },
    computed: {
      mode() {
        return this.$store.state.mode;
      },
    },
    methods: {
      toggleTheme() {
        this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      }
    },
    components: {
      EditMenuOption,
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

  #menu-option-title,
  #menu-option-price {
    color: var(--cafe-font-color);
  }

  #menu-option-title,
  #menu-option-price {
    font-weight: bold;
    font-size: 2vw;
  }

  ul {
    list-style: none;
  }

  #menu-option-title {
    display: flex;
    align-items: flex-start;
    margin: 0px;
  }

  #menu-option-description,
  #menu-option-contains {
    font-size: 1.25vw;
    color: whitesmoke;
  }

  #menu-option-div {
    margin: 0px;
    padding: 0px;
  }
</style>