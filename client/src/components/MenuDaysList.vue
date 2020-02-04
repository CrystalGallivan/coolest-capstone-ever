<template>
  <drop @drop="handleDrop" class="drop">
    <!-- <div class="menu-days-list col-4 d-flex justify-content-center"> -->
    <div class="card mt-2 mr-1">
      <div class="card-body">
        <h5 class="card-title">{{day.name}}</h5>
        <menu-category-list />
      </div>

    </div>
    <!-- </div> -->
  </drop>
</template>

<script>
  import MenuCategoryList from '@/components/MenuCategoryList.vue'
  import draggable from 'vuedraggable';

  export default {
    name: "MenuDaysList.vue",
    props: ['dayData'],
    data() {
      return {}
    },
    computed: {
      days() {
        return this.$store.state.activeMenu.days
      }
    },
    methods: {
      handleDrop(data) {
        let oldDayId = data.dayId
        data.dayId = this.dayData._id
        this.$store.dispatch('moveCategory', { category: data, oldDayId })
      }
    },
    components: {
      MenuCategoryList
    }
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