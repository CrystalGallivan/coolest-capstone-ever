<template>
  <div class="warning-modal">
    <div class="modal fade" tabindex="-1" role="dialog" id="warningModal" aria-labelledby="warningModal"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{this.idleTimer}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>dfghfgh</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeModal()">Stay logged in!</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="logout">Logout</button>
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
    props: ['openModal'],
    data() {
      return {
        idleTimer: 10,
        modalOpen: this.openModal,
      }
    },
    mounted() {
      //if (this.openModal == true) {
      this.$nextTick(function () {
        setInterval(() => {
          if (this.idleTimer > 0 && this.openModal == true) {
            this.idleTimer--;
          } else if (this.idleTimer == 0 && this.loading == false && this.openModal == true) {
            this.closeModal();
            //this.idleTimer = 10;
            this.logout();
          }
        }, 1000);
        //clearInterval();
      })
      // }
      //this.startTimer();
      //$(document).on('shown.bs.modal', '#warningModal', this.$data.modalOpen, function () {
      // debugger
      // });
      // this.startTimer();


    },
    computed: {
      ...mapState([
        "loading"
      ]),
    },
    methods: {
      closeModal() {
        $('#warningModal').modal("hide");
        $(".modal-backdrop").remove();
        this.idleTimer = 10;
        this.modalOpen = false;
      },
      logout() {
        this.$store.dispatch("logout", this.creds)
      },
      // startTimer: function () {
      //   debugger
      //   if (this.modalOpen == true) {
      //     this.$nextTick(function () {
      //       setInterval(() => {
      //         if (this.idleTimer > 0) {
      //           this.idleTimer--;
      //         } else if (this.idleTimer == 0 && this.loading == false && this.openModal == true) {
      //           $('#warningModal').modal("hide");
      //           $(".modal-backdrop").remove();
      //           this.idleTimer = 10;
      //           // this.logout();
      //         }
      //       }, 1000);
      //     });
      //   }
      // }
    },
    beforeDestroy() {
      clearInterval();
    },
  }
</script>

<style scoped>
  #warningModal {
    margin-top: 10vh;
  }
</style>