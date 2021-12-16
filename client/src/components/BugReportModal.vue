<template>
  <div class="bug-report-modal">
    <div class="modal fade" tabindex="-1" role="dialog" id="bugReportModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Report Bug</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <div class="col-6">
                  <label for="reportedByInput" class="mt-3 mb-0 d-flex justify-content-left">Name:</label>
                  <!-- <input type="text" v-model="newBug.name" class="form-control" id="nameInput"
                    aria-describedby="nameHelp" placeholder="Enter name" required> -->
                  <select v-model="newBug.reportedBy" class="form-control" id="reportedByInput" required>
                    <option value="none">None</option>
                    <option v-for="user in users" :value="user._id">{{user.name}}</option>
                  </select>
                </div>
                <div class="col-6">
                  <label for="preferedContactMethodInput" class="mt-3 mb-0 d-flex justify-content-left">Prefered contact
                    method:</label>
                  <select v-model="newBug.preferedContactMethod" class="form-control" id="preferedContactMethodInput"
                    required>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>
                <div class="col-6">
                  <!-- TODO Make either email or phone required by what prefered method of contact is selected -->
                  <label for="emailInput" class="mt-3 mb-0 d-flex justify-content-left">Email address:</label>
                  <input type="email" v-model="newBug.email" class="form-control" id="emailInput"
                    aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="col-6">
                  <label for="phoneInput" class="mt-3 mb-0 d-flex justify-content-left">Phone number:</label>
                  <input type="tel" v-model="newBug.phone" class="form-control" id="phoneInput"
                    aria-describedby="telHelp" placeholder="Enter phone number">
                </div>
                <div class="col-6">
                  <label for="severityInput" class="mt-3 mb-0 d-flex justify-content-left">Severity:</label>
                  <select class="form-control" v-model="newBug.severity" id="severityInput" required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div class="col-6">
                  <label for="attachmentInput" class="mt-3 mb-0 d-flex justify-content-left">Attachment:</label>
                  <input type="file" v-on:change="attachmentChange" class="form-control-file" id="attachmentInput">
                </div>
              </div>
              <div class="form-group">
                <label for="titleInput" class="mt-3 mb-0 d-flex justify-content-left">Title:</label>
                <input type="text" v-model="newBug.title" class="form-control" id="titleInput"
                  aria-describedby="titleHelp" placeholder="Enter title" required>
                <label for="descriptionInput" class="mt-3 mb-0 d-flex justify-content-left">Description:</label>
                <textarea v-model="newBug.description" class="form-control" id="descriptionInput" rows="5"
                  required></textarea>
              </div>
              <!-- <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div> -->
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" @click="createNewBugReport">Submit</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "BugReportModal",
    mounted() {
      this.$store.dispatch("getAllUsers");
    },
    data() {
      return {
        newBug: {
          reportedBy: "",
          preferedContactMethod: "",
          email: "",
          phone: "",
          number: "BR-100000",
          severity: "",
          attachment: "",
          title: "",
          description: "",
        }
      }
    },
    computed: {
      ...mapState([
        "siteId",
        "users",
        "user",
        "bugReports",
      ])
    },
    methods: {
      createNewBugReport() {
        this.newBug.number += this.bugReports.length + 1
        this.$store.dispatch("createBugReport", this.newBug);
        $("#bugReportModal").modal("hide");
        $(".modal-backdrop").remove();
      },
      attachmentChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createAttachment(files[0]);
      },
      createAttachment(file) {
        let image = new Image();
        let reader = new FileReader();
        let vm = this;

        reader.onload = (e) => {
          vm.image = e.target.result;
          this.attachment = vm.image;
        };
        reader.readAsDataURL(file);
      },
      removeAttachment: function (e) {
        this.attachment = '';
      }
    },
    components: {}
  }
</script>

<style scoped>

</style>