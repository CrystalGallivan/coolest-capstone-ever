<template>
  <div class="bug-reports">
    <div class="row">
      <div class="col-1 offset-1">
        <button type="button" class="btn btn-primary reportModalBtn" data-target="#bugReportModal"
          data-toggle="modal">Report
          Bug</button>
      </div>
    </div>
    <div class="row">
      <div class="col-10 offset-1">
        <bug-report-list />
      </div>

    </div>
    <bug-report-modal />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import BugReportList from "@/components/BugReportList.vue";
  import BugReportModal from "@/components/BugReportModal.vue";
  import BugReportTicket from "@/components/BugReportTicket.vue";

  export default {
    name: "BugReports",
    props: [],
    data() {
      return {}
    },
    computed: {
      ...mapState([
        "siteId",
        "users",
      ])
    },
    methods: {
      // getUsersBySite() {
      //   this.$store.dispatch("getAllUsersBySite", this.siteId);
      // }
    },
    components: {
      BugReportList,
      BugReportModal,
      BugReportTicket,
    }
  }
</script>

<style scoped>
  /* .reportModalBtn {
    margin-top: 8vh;
  } */
</style>