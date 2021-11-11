<template>
  <div class="warning-modal">
    <div class="modal fade" tabindex="-1" role="dialog" id="warningModal" aria-labelledby="warningModal"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Are you still there?</h5>
            <button type="button" class="close" @click="closeModal()" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>If not, you will be logged out in <b>{{this.idleTimer}}</b> seconds due to inactivy. Press 'Stay
              logged
              in!' to
              continue your current session.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn stayLoggedInBtn" @click="closeModal()">Stay logged in!</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "WarningModal",
    data() {
      return {
        idleTimer: 90,
      }
    },
    mounted() {
      this.$nextTick(function () {
        setInterval(() => {
          if (this.idleTimer > 0 && this.modalOpen == true) {
            this.idleTimer--;
          } else if (this.idleTimer == 0 && this.loading == false && this.modalOpen == true) {
            this.closeModal();
            this.logout();
          }
        }, 1000);
      })
    },
    computed: {
      ...mapState([
        "loading",
        "modalOpen",
      ]),
    },
    methods: {
      closeModal() {
        $('#warningModal').modal("hide");
        $(".modal-backdrop").remove();
        this.idleTimer = 90;
        this.$store.dispatch("changeModalOpenValue", false);
      },
      logout() {
        this.$store.dispatch("logout", this.creds);
      },
    },
    beforeDestroy() {
      clearInterval();
    },
  }
</script>

<style scoped>
  #warningModal {
    margin-top: 15vh;
  }

  .modal-title {
    font-size: 30px;
    font-weight: bold;
    color: #05262D;
  }

  .modal-body {
    color: #05262D;
  }

  .stayLoggedInBtn {
    background-color: #05262D;
    color: white;
  }
</style>