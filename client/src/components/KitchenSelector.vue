<template>
  <div class="kitchen-selector">
    <div class="kitchen-selector-modal card" :class="open ? '': 'd-none'">
      <div class="modal-header">
        <h5 class="modal-title" id="selectKitchenModalLabel">Select Kitchen</h5>
        <button id="kitchen-selector-modal-btn" type="button" @click="closeModal" class="close" data-dismiss="modal"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-content">
        <select v-model="kitchenId" @change="selectKitchen($event)" id="kitchenSelector" class="form-control"
          placeholder="Kitchen" required>
          <option disabled value="">Select Kitchen</option>
          <option v-for="kitchen in kitchens" :value="kitchen._id">{{kitchen.name}}</option>
        </select>
      </div>
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
    components: {}
  }
</script>

<style>
  .kitchenLabel {
    color: black;
  }

  .kitchen-selector {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  #kitchen-selector-modal-btn {
    display: flex;
  }

  .kitchen-selector-modal {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    /* height: 15.3%; */
    width: 50%;
    position: fixed;
    margin-top: 6%;
  }
</style>