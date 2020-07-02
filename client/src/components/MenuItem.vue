<template>
  <div class="menu-item" :id="mode">
    <div class="row" id="menu-item-div">
      <div class="col-12" id="menu-item-div">
        <ul id="menu-item-div">
          <li v-for="menuItem in menuItems">
            <div class="row" id="menu-item-div">
              <div class="col-6" id="menu-item-div">
                <p id="menu-item-name">{{ menuItem.name }}</p>
              </div>
              <div class="col-6" id="menu-item-div">
                <p id="menu-item-price">{{ menuItem.price }}</p>
                <edit-menu-item :menuItem="menuItem" :signId="signId" />
              </div>
            </div>
            <div class="row" id="menu-item-div">
              <p id="menu-item-description" v-html="menuItem.description"></p>
            </div>
            <div class="row" id="menu-item-div">
              <p id="menu-item-contains">Contains: {{ menuItem.protein }} /</p>
              <p v-if="a.checked == true" id="menu-item-contains" v-for="a in menuItem.allergens" :key="a._id">
                {{ a.allergen }} /
              </p>
              <p id="menu-item-contains">Calories: {{ menuItem.calories }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-6" id="menu-item-div"></div>
    </div>
  </div>
</template>
<script>
  import EditMenuItem from "@/components/EditMenuItem.vue";
  export default {
    name: "MenuItem",
    props: {
      signId: String,
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
      }
    },
    methods: {
      toggleTheme() {
        this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
      }
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
  }

  #menu-item-name,
  #menu-item-price {
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    font-size: 2vw;
  }

  ul {
    list-style: none;
  }

  #menu-item-name {
    display: flex;
    align-items: flex-start;
    margin: 0px;
  }

  #menu-item-description,
  #menu-item-contains {
    font-size: 1.25vw;
    color: whitesmoke;
  }

  #menu-item-div {
    margin: 0px;
    padding: 0px;
  }
</style>