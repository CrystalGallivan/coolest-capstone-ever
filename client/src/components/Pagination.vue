<template>
  <div class="pagination-wrapper">
    <div class="row">
      <div class="col-2 offset-1">
        <span>
          <button class="btn btn-sm" v-if="showPrev" id="pagination-btn"
            @click="updatePage(currentPage - 1)">Previous</button>
        </span>
      </div>
      {{currentPage + 1}} of {{totalPages()}}
      <div class="col-2 offset-7">
        <span>
          <button class="btn btn-sm" v-if="showNext" id="pagination-btn"
            @click='updatePage(currentPage + 1)'>Next</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['recipes', 'pageSize', 'currentPage'],
    data() {
      return {
        pageNumber: 0,
        // listData: {
        //   type: Array,
        //   required: true,
        // },
        // size: {
        //   type: Number,
        //   required: false,
        //   default: 10
        // }
      }
    },
    computed: {
      // pageCount() {
      //   let l = this.recipes.length,
      //     s = this.size;
      //   return Math.ceil(l / s);
      // },
      // paginatedData() {
      //   const start = this.pageNumber * this.size,
      //     end = start + this.size;
      //   return this.listData.slice(start, end);
      // },
    },
    methods: {
      // nextPage() {
      //   this.pageNumber++;
      // },
      // previousPage() {
      //   this.pageNumber--;
      // },
      updatePage() {
        this.$emit('page:update', this.pageNumber)
      },
      totalPages() {
        return Math.ceil(this.recipes.length / this.pageSize)
      },
      showNext() {
        return this.currentPage == (this.totalPages() - 1) ? false : true;
      },
      showPrev() {
        return this.currentPage == 0 ? false : true;
      }
    }

  }
</script>

<style scoped>
  #pagination-btn {
    background-color: rgb(109, 197, 154);
    display: flex;
    justify-content: center;
  }
</style>