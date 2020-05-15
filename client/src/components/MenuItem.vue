<template>
  <div class="menu-item">
    <div class="row" id="menu-item-div">
      <div class="col-12" id="menu-item-div">
        <ul id="menu-item-div">
          <li v-for="menuItem in menuItems">
            <div class="row" id="menu-item-div">
              <div class="col-6" id="menu-item-div">
                <p id="menu-item-name">{{menuItem.name}}</p>
              </div>
              <div class="col-6" id="menu-item-div">
                <p id="menu-item-price">{{menuItem.price}}</p>
                <edit-menu-item :menuItem="menuItem" :signId="signId" />
              </div>
            </div>
            <div class="row" id="menu-item-div">
              <p id="menu-item-contains">Contains: {{menuItem.protein}} /
                {{menuItem.allergens}} /
                {{menuItem.calories}}</p>
            </div>
            <div class="row" id="menu-item-div">
              <p id="menu-item-description">{{menuItem.description}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-6" id="menu-item-div"></div>
    </div>
  </div>
</template>
<script>
  import EditMenuItem from "@/components/EditMenuItem.vue"
  export default {
    name: "MenuItem",
    props: {
      signId: String,
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
      EditMenuItem
    }
  }
</script>
<style scoped>
  #menu-item-name,
  #menu-item-price {
    font-weight: bold;
    font-size: 2vw;
    color: rgb(109, 197, 164);
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