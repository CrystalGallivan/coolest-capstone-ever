<template>
  <div class="menu-category-list d-flex justify-content-center">
    <!-- <div class="card mt-2 mr-1" v-for="category in allCategories" :key="category._id">
      <div class="card-body">
        <h5 class="card-title">{{category.title}}</h5>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    name: "MenuCategoryList",
    props: [],
    data() {
      return {
        allCategories: this.categories,
      }
    },
    computed: {
      categories() {
        return this.$store.state.activeMenu.days.categories
      },
      days() {
        return this.$store.state.activeMenu.days
      }
    },
    methods: {},
    components: {}
  }
</script>

<style scoped>
  .card {
    color: black;
    font-weight: 900;
    height: 25px;
    width: 15px;
  }
</style>