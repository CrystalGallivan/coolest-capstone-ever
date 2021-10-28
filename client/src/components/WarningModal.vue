<template>
  <div class="warning-modal">
    <div class="modal fade" tabindex="-1" role="dialog" id="warningModal" aria-labelledby="warningModal"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">sdfg</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>dfghfgh</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="resetTimer">sdfg</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WarningModal",
    data() {
      return {
        timerCount: 120
      }
    },
    methods: {
      resetTimer() {

      },
      logout() {
        this.$store.dispatch("logout", this.creds)
      }
    },
  }
</script>

<style scoped>
  #warningModal {
    margin-top: 10vh;
  }
</style>