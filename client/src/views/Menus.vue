<template>
  <div class="row menus">
    <div class="col-12 text-center mt-3">
      <h1 class="blog-page-title">Menus</h1>
    </div>
    <!-- Menu List -->
    <div class="col-12">
      <div class="card" style="width: 18rem;" v-for="menu in menus">
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuList from '@/components/MenuList.vue'

  export default {
    name: "Menus",
    // mounted() {
    //   this.$store.state.menus
    // }, 
    props: [],
    data() {
      return {}
    },
    computed: {
      menus() {
        debugger
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
  .blog-page-title {
    font-family: 'Pacifico', cursive;
    color: rgb(109, 197, 154);
    font-size: 70px;
  }
</style>