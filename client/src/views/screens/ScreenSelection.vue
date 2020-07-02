<template>
  <div>
    <p>
      <a class="btn btn-light" id="screen-selection-btn" data-toggle="collapse" href="#collapseSelections" role="button"
        aria-expanded="false" aria-controls="collapseExample">
        Digital Screen Selection
      </a>
    </p>
    <div class="row">
      <div class="col-3 offset-3">
        <screen-list-17 />
      </div>
      <div class="col-3">
        <screen-list-36 />
      </div>
    </div>
  </div>
</template>
<script>
  import ScreenList17 from "@/components/17CScreenList.vue";
  import ScreenList36 from "@/components/36ScreenList.vue";

  export default {
    name: "ScreenSelection",
    props: ["siteId"],
    created() {
      this.$store.dispatch("getAllSites");
    },
    computed: {
      allSites() {
        return this.$store.state.allSites;
      },
    },
    components: {
      ScreenList17,
      ScreenList36
    }
  };
</script>
<style scoped>
  #screen-selection-btn {
    color: rgb(5, 38, 45);
    margin-top: 20px;
    margin-bottom: 5px;
  }

  #site-selection,
  #collapseSelections {
    margin-left: -45px;
    list-style: none;
  }

  #cafe-36-name,
  #cafe-17c-name {
    text-decoration: underline;
  }

  #cafe-36-name {
    color: rgb(246, 192, 14);
  }

  #cafe-17c-name {
    color: rgb(109, 197, 154);
  }

  a {
    color: whitesmoke;
  }
</style>