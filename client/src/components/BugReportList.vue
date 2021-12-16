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
      <tbody>
        <tr v-for="bugReport in bugReports">
          <th scope="row">{{bugReport.number}}</th>
          <td>{{bugReport.title}}</td>
          <td>{{bugReport.createdBy}}</td>
          <td>{{bugReport.severity}}</td>
          <td>{{bugReport.state}}</td>
          <td>{{bugReport.assignedTo}}</td>
          <td>{{bugReport.updated}}</td>
          <td>{{bugReport.updatedBy}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapState } from "vuex";

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
    },
    methods: {},
    components: {}
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