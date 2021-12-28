<template>
  <div class="bug-report-list">
    <table class="table" id="bugReportList">
      <thead>
        <tr>
          <th scope="col">Number</th>
          <th scope="col">Title</th>
          <th scope="col">Caller</th>
          <th scope="col">Severity</th>
          <th scope="col">State</th>
          <th scope="col">Assigned to</th>
          <th scope="col">Updated</th>
          <th scope="col">Updated by</th>
        </tr>
      </thead>
      <tbody v-for="(bugReport, index) in bugReports" :key="bugReport.id" v-on:click="editReport(bugReport)">
        <tr class="clickable-row">
          <td>{{bugReport.number}}</td>
          <td>{{bugReport.title}}</td>
          <td>{{names[index].name}}</td>
          <td>{{bugReport.severity}}</td>
          <td>{{bugReport.state}}</td>
          <td>{{bugReport.assignedTo}}</td>
          <td>{{bugReport.updated}}</td>
          <td>{{bugReport.updatedBy}}</td>
        </tr>
      </tbody>
    </table>
    <bug-report-ticket />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  import BugReportTicket from "@/components/BugReportTicket.vue";
  export default {
    name: "BugReportList",
    mounted() {
      this.$store.dispatch("getAllBugReports");
      this.$store.dispatch("getAllUsers");
    },
    props: [],
    data() {
      return {
        count: 1,
      }
    },
    computed: {
      ...mapState([
        "bugReports",
      ]),
      ...mapGetters([
        "names",
      ])
    },
    methods: {
      editReport(bugReport) {
        $('#editBugReportModal').modal({
          show: true
        });
        this.$store.dispatch('setActiveBugReport', bugReport);
      }
    },
    components: {
      BugReportTicket
    }
  }
</script>

<style scoped>
  /* Remove these */
  th {
    color: white;
  }

  td {
    color: white;
  }

  #bugReportList {
    margin-top: 6rem;
  }
</style>