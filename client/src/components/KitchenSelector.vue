<template>
  <div class="kitchen-selector">
    <!--  v-if="user._id"   :class="open ? '': 'd-none'" v-if="user._id" -->
    <div class="kitchen-selector-modal">
      <div class="modal-content">
        <!-- @change="selectKitchen($event)" -->
        <select v-model="kitchenId" id="kitchenSelector" class="form-control" placeholder="Kitchen" required>
          <option disabled value="">Select Kitchen</option>
          <option v-for="kitchen in kitchens" :value="kitchen._id">{{kitchen.name}}</option>
        </select>
        <!-- TODO Fix the selection issue - does not register if select same site twice -->
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
      }
    },
    methods: {},
    components: {}
  }
</script>

<style>
  .kitchenLabel {
    color: black;
  }
</style>