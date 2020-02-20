<template>
  <div class="menu-category-list d-flex justify-content-center">
    <div class="card mt-2 mr-1" v-for="category in categories" :key="category._id">
      <div class="card-body">
        <h5 class="card-title">{{category.title}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MenuCategoryList",
    props: [],
    data() {
      return {}
    },
    computed: {
      categories() {
        return this.$store.state.activeMenu.days.categories
      }
    },
    methods: {},
    components: {}
  }
</script>

<style scoped>

</style>