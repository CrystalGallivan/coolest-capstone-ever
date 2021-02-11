<template>
  <div class="menu-item" :id="mode">
    <div class="row" id="menu-item-div">
      <edit-menu-item />
      <div class="col-12" id="menu-item-div">
        <ul id="menu-item-div">
          <li v-for="(menuItem, index) in menuItems">
            <div class="row" id="menu-item-header-row">
              <p v-if="menuItem.name" class="col-5" id="menu-item-name">{{ menuItem.name }}</p>
              <p class="col-5" id="menu-item-price">{{ menuItem.price }}</p>
              <button id="edit-menu-item-btn" type="button" @click="CurrentSign(menuItem)" style="float: right;"
                class="btn btn-light offset-1 col-1" data-toggle="modal" data-target="#editMenuItemModal">
                <img id="edit-menu-item-btn-img" src="@/assets/Edit-Icon-40.png" alt="Edit" />
              </button>
            </div>
            <p id="menu-item-portion"> {{ menuItem.portionSize }} / {{ menuItem.calories }} cal</p>
            <p id="menu-item-description" v-html="menuItem.description"></p>
            <div id="menu-item-contains-group">
              <div id="menu-item-contains" v-if="menuItem.allergens[10].checked == true">
                {{ menuItem.allergens[10].allergen}}
              </div>
              <div v-if="menuItem.allergens[10].checked == true && menuItem.allergens[11].checked == true"
                id="menu-item-contains-comma">,</div>
              <div id="menu-item-contains" v-if="menuItem.allergens[11].checked == true">
                {{ menuItem.allergens[11].allergen}}
              </div>
              <div
                v-if="menuItem.allergens[12].checked == true && menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true && menuItem.allergens[10].checked == true">
                ,</div>
              <div id="menu-item-contains" v-if="menuItem.allergens[12].checked == true">
                {{ menuItem.allergens[12].allergen}}
              </div>
              <div id="menu-item-contains"
                v-if="menuItem.allergens[10].checked == true || menuItem.allergens[11].checked == true || menuItem.allergens[12].checked == true"
                class="ml-1">
                {{angleBrackets}}
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
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import EditMenuItem from "@/components/EditMenuItem.vue";
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "MenuItem",
    props: {
      // signId: String,
      menuItems: Array,
      sign: Object,
      menuItem: Object,
    },
    data() {
      return {
        contains: [],
        angleBrackets: "<<<"
      };
    },
    mounted() {
      this.toggleTheme();
    },
    computed: {
      ...mapGetters([
        "getFirstTrue"
      ]),
      ...mapState([
        "mode"
      ]),
    },
    methods: {
      toggleTheme() {
        this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      },
      CurrentSign(menuItem) {
        let currentItem = menuItem;
        return this.$store.dispatch("setMenuItem", currentItem);
      },
    },
    components: {
      EditMenuItem,
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

  #menu-item-name,
  #menu-item-price {
    color: var(--cafe-font-color);
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    font-size: 2vw;
    text-align: left;
  }

  ul {
    list-style: none;
  }

  #menu-item-header-row {
    margin-top: 20px;
  }

  #menu-item-name {
    text-align: left;
  }

  #menu-item-price {
    text-align: right;
  }

  #menu-item-description,
  #menu-item-contains {
    font-size: 2.5vw;
    color: whitesmoke;
  }

  #menu-item-div {
    margin: 0px;
    padding: 0px;
  }



  #menu-item-portion,
  #menu-item-backslash,
  #menu-item-calories {
    color: whitesmoke;
    font-size: 1.5vw;
    /* display: inline-flex; */
    margin-bottom: 4px;
    margin-right: 5px;
  }

  #menu-item-portion {
    text-align: left;
  }

  #menu-item-description {
    font-size: 1vw;
    text-align: left;
  }


  #menu-item-contains,
  #menu-item-contains-title,
  #menu-item-contains-protein {
    font-size: 0.75vw;
    margin: 0px;
    padding: 0px;
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
    color: whitesmoke;
  }

  #menu-item-contains-comma {
    font-size: 0.75vw;
    margin: 0px;
    padding: 0px;
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
    color: whitesmoke;
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

  /* .angleBrackies {
    margin-right: 5px;
    margin-left: 8px;
  } */

  #menu-item-contains-group {
    margin: 0px;
    text-align: left;
  }

  .item {
    display: none;
  }

  .item.on~.item.on::before {
    content: ', ';
    margin-right: 2px;
  }
</style>