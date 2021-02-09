<template>
  <div class="menu-option" :id="mode">
    <div class="row" id="menu-option-div">
      <edit-menu-option />
      <div class="col-12" id="menu-option-div">
        <ul id="menu-option-div">
          <li v-for="menuOption in menuOptions">
            <div class="row" id="menu-option-div">
              <div class="col" id="menu-option-div">
                <p v-if='menuOption.menuOptionTitle' id="menu-option-title">{{ menuOption.menuOptionTitle }}</p>
                <button type="button" @click="CurrentSign(menuOption)" id="edit-menu-option-btn" style="float: right;"
                  class="btn btn-light" data-toggle="modal" data-target="#editMenuOptionModal">
                  <img id="edit-menu-option-btn-img" src="@/assets/Edit-Icon-40.png" alt="Edit" />
                </button>
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
      sign: Object,
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
      },
      CurrentSign(menuOption) {
        let currentOption = menuOption;
        return this.$store.dispatch("setMenuOption", currentOption);
      },
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
    text-align: left;
  }

  #menu-option-div {
    margin: 0px;
    padding: 0px;
  }

  #edit-menu-option-btn {
    padding: 2px;
  }

  #edit-menu-option-btn-img {
    max-height: 60%;
    max-width: 60%;
  }
</style>