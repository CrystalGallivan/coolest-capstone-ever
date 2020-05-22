<template>
  <div class="menu-option">
    <div class="row" id="menu-option-div">
      <div class="col-12" id="menu-option-div">
        <ul id="menu-option-div">
          <li v-for="menuOption in menuOptions">
            <div class="row" id="menu-option-div">
              <div class="col" id="menu-option-div">
                <p id="menu-option-title">{{menuOption.menuOptionTitle}}</p>
                <edit-menu-option :menuOption="menuOption" :signId="signId" />

              </div>
            </div>
            <div class="row" id="menu-option-div">
              <p id="menu-option-description">{{menuOption.description}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-6" id="menu-option-div"></div>
    </div>
  </div>
</template>
<script>
  import EditMenuOption from "@/components/EditMenuOption.vue"
  export default {
    name: "MenuOption",
    props: {
      signId: String,
      menuOptions: Array,
      menuOption: Object,
      menuItems: Array,
      sign: Object,
      menuItem: Object
    },
    data() {
      return {
        contains: []
      }
    },
    computed: {

    },
    components: {
      EditMenuOption
    }
  }
</script>
<style scoped>
  #menu-option-title,
  #menu-option-price {
    font-weight: bold;
    font-size: 2vw;
    color: rgb(109, 197, 164);
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