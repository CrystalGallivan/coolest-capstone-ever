<template>
  <div class="menu-days-list col-4 d-flex justify-content-center">
    <div class="card mt-2 mr-1" v-for="day in days">
      <div class="card-body">
        <h5 class="card-title">{{day.name}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MenuDaysList.vue",
    props: [],
    data() {
      return {}
    },
    computed: {
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
    min-height: 68vh;
    max-height: fit-content;
    min-width: 19vw;
  }
</style>