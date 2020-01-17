<template>
  <div class="row menus">
    <div class="col-12 text-center mt-3">
      <h1 class="menu-page-title">Menus</h1>
    </div>
    <!-- Menu List -->
    <div class="col-12">
      <div class="card m-2" style="width: 18rem;" v-for="menu in menus" :key="menu._id">
        <div class="card-body">
          <h5 class="card-title">{{menu.week}}</h5>
          <p class="card-text"> {{menu.title}} </p>
          <p class="card-text"> {{menu.date}} </p>
          <p class="card-text"> {{menu.kitchenId}} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuList from '@/components/MenuList.vue'

  export default {
    name: "Menus",
    mounted() {
      this.$store.dispatch('getMenus');
    },
    props: [],
    data() {
      return {
        newMenu: {
          week: '',
          title: '',
          date: Date,
          monday: '',
        }
      }
    },
    computed: {
      menus() {
        return this.$store.state.menus
      }
    },
    methods: {

    },
    components: {
      MenuList
    }
  }
</script>

<style scoped>
  .menu-page-title {
    font-family: 'Pacifico', cursive;
    color: rgb(109, 197, 154);
    font-size: 70px;
  }

  .card {
    color: black;
  }
</style>