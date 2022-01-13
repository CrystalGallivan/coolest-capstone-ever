<template>
  <div class="bug-report-ticket">
    <div class="modal fade" tabindex="-1" role="dialog" id="editBugReportModal" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Report Bug</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6">
                <label for="reportedByInput" class="mt-3 mb-0">Name:</label>
                <p id="reportedByInput">{{name}}</p>
              </div>
              <!-- NOTE - Maybe add a created by and other sections that we only want us 'Admins' to see -->
              <div class="col-6">
                <label for="preferedContactMethodInput" class="mt-3 mb-0">Prefered contact
                  method:</label>
                <p id="preferedContactMethodInput">
                  {{activeBugReport.preferedContactMethod |uppercase}}</p>
              </div>
              <div class="col-6">
                <!-- TODO Make either email or phone required by what prefered method of contact is selected -->
                <label for="emailInput" class="mt-3 mb-0">Email address:</label>
                <p id="emailInput">{{activeBugReport.email}}</p>
              </div>
              <div class="col-6">
                <label for="phoneInput" class="mt-3 mb-0">Phone number:</label>
                <p id="phoneInput">{{activeBugReport.phone}}</p>
              </div>
            </div>
            <hr>
            <form>
              <div class="row">
                <div class="form-group col-4">
                  <label for="severityInput" class="mt-3 mb-0">Severity:</label>
                  <select class="form-control" v-model="activeBugReport.severity" id="severityInput" required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div class="col-4">
                  <label for="stateInput" class="mt-3 mb-0">State:</label>
                  <select class="form-control" v-model="activeBugReport.state" id="stateInput" required>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="on_hold">On Hold</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>
                <div class="col-4">
                  <label for="assignedToInput" class="mt-3 mb-0">Assigned To:</label>
                  <select v-model="activeBugReport.assignedTo" class="form-control" id="assignedToInput">
                    <option v-for="siteUser in siteUsers" :value="siteUser.userId._id"
                      v-if="siteUser.role[0] === 'admin'">
                      {{siteUser.userId.name}}
                    </option>
                    <!-- <option value="crystal_gallivan">Crystal Gallivan</option>
                    <option value="dallin_fahnestock">Dallin Fahnestock</option> -->
                  </select>
                </div>
              </div>
            </form>
            <hr>
            <div class="row">
              <div class="col-12">
                <label for="attachmentInput" class="mt-3 mb-0">Attachment:</label>
                <!-- NOTE - Add an attachment/image loader -->
              </div>
              <div class="col-12">
                <label for="titleInput" class="mt-3 mb-0">Title:</label>
                <p id="titleInput">{{activeBugReport.title}}</p>
              </div>
              <div class="col-12">
                <label for="descriptionInput" class="mt-3 mb-0">Description:</label>
                <p id="descriptionInput">{{activeBugReport.description}}</p>
              </div>
            </div>
          </div>
          <hr>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" @click="editBugReport">Save</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "BugReportTicket",
    props: [],
    data() {
      return {}
    },
    mounted() {
      this.$store.dispatch("getAllUsersBySite", this.siteId)
    },
    computed: {
      ...mapState([
        "activeBugReport",
        "users",
        "user",
        "siteUsers",
        "siteId"
      ]),
      ...mapGetters([
        "name",
      ])
    },
    methods: {
      editBugReport() {
        this.$store.dispatch("editBugReport", this.activeBugReport);
        debugger
        $("#editBugReportModal").modal("hide");
        $(".modal-backdrop").remove();
      },
    },
    filters: {
      uppercase: function (text) {
        if (!text) return '';
        text = text.toString();
        return text.charAt(0).toUpperCase() + text.slice(1);
      },
    },
    components: {}
  }
</script>
<style scoped>
  p,
  label {
    display: flex;
    justify-content: left;
    text-align: left;
  }
</style>