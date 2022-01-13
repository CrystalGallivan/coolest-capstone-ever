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
      <tbody v-for="bugReport in bugReports" :key="bugReport._id" v-on:click="editReport(bugReport)">
        <tr class="clickable-row">
          <td>{{bugReport.number}}</td>
          <td>{{bugReport.title}}</td>
          <td>{{users.find(user => user._id === bugReport.reportedBy).name}}</td>
          <td>{{bugReport.severity}}</td>
          <td>{{bugReport.state}}</td>
          <!-- FIXME - Fix this because it's breaking for some reason -->
          <!-- <td>{{users.find(user => user._id === bugReport.assignedTo).name}}</td> -->
          <!-- <td>{{assignedToName}}</td> -->
          <td>{{bugReport.assignedTo}}</td>
          <!-- FIXME Trying to get the date to show up correctly -->
          <!-- <td>{{moment(bugReport.updatedAt).format('MMM Do, YYYY, h:mm;ss a') || formatDate}}</td> -->
          <!-- <td>{{timestamp}}</td> -->
          <td>{{bugReport.updatedAt}}</td>
          <!-- FIXME - Fix this because it's breaking for some reason -->
          <!-- <td>{{users.find(user => user._id === bugReport.updatedBy).name}}</td> -->
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
  import moment from "moment";
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
        "users",
      ]),
    },
    methods: {
      editReport(bugReport) {
        $('#editBugReportModal').modal({
          show: true
        });
        this.$store.dispatch('setActiveBugReport', bugReport);
      },
      // array(arr) {
      //   return arr.filter(bug => this.users.some(user => arr[bugReport].assignedTo === this.users)
      // },
    },
    filters: {
      // formatDate(date) {
      //   if (date) {
      //     return moment(date)
      //       .add(1, "d")
      //       .format("MMM Do, YYYY, h:mm;ss a");
      //   }
      // },
      // reportedByName() {
      //   return users.find(user => user._id === this.bugReport.reportedBy).name
      // },
      // assignedToName() {
      //   return users.find(user => user._id === this.bugReport.assignedTo).name
      // },
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