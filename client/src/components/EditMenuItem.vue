<template>
  <div class="edit-menu-item">
    <!-- Button trigger modal -->
    <button type="button" style="float: right;" class="btn" data-toggle="modal" data-target="#editMenuItemModal">
      <img src="@/assets/Edit-Icon-40.png" alt="Edit">
    </button>

    <!-- Modal -->
    <div class="modal fade" id="editMenuItemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit {{menuItem._id}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "EditMenuItem",
    props: {
      menuItem: Object
    },
    data() {
      return {

      }
    }
  }
</script>
<style scoped>

</style>