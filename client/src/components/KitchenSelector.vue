<template>
  <div class="kitchen-selector">
    <div class="kitchen-selector-modal card kitchenCard" :class="open ? '': 'd-none'" v-if="user._id">
      <div class="modal-content kitchenModalContent">
        <div class="modal-header kitchenModalHeader">
          <h5 class="modal-title kitchenModalTitle" id="selectKitchenModalLabel">Select Kitchen</h5>
          <button id="kitchen-selector-modal-btn" type="button" @click="closeModal" class="close" data-dismiss="modal"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <select v-model="kitchenId" @change="selectKitchen($event)" id="kitchenSelector"
          class="form-control kitchen-input" placeholder="Kitchen" required>
          <option disabled value="">Select Kitchen</option>
          <option v-for="kitchen in kitchens" :value="kitchen._id">{{kitchen.name}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "KitchenSelector",
    data() {
      return {
        kitchenId: ''
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      kitchens() {
        return this.$store.state.site.kitchens
      },
      open() {
        return this.$store.state.openKitchenSelector
      }
    },
    methods: {
      selectKitchen(e) {
        let Kitchen = e.target.value
        this.$store.dispatch("selectKitchen", this.kitchenId)
      },
      closeModal() {
        this.$store.dispatch("closeKitchenSelector")
      }
    },
  }
</script>

<style>
  .kitchen-selector {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .kitchen-selector-modal {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 25%;
    position: fixed;
    margin-top: 6%;
    padding: 5px;
  }

  .kitchenCard {
    border: none;

  }

  .kitchenModalContent {
    height: 125px;
    padding-right: 5px;
    padding-left: 5px;

  }

  .kitchenModalHeader {
    border: none;
    padding: 3px 0px
  }

  .kitchenModalTitle {
    width: 100%;
    padding-left: 16px;
    padding-bottom: 15px;
  }

  #kitchen-selector-modal-btn {
    display: flex;
    margin: 0;
    padding: 0;
  }

  .kitchen-input {
    width: 75%;
    margin-left: 12.5%;
  }
</style>