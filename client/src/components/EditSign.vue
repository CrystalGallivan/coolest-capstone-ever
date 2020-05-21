<template>
  <div class="edit-sign">
    <!-- Button trigger modal -->
    <button type="button" @click="currentSign(signId)" style="float: right;" class="btn btn-secondary"
      data-toggle="modal" id="edit-sign-btn" data-target="#editSignModal">
      <img id="edit-sign-btn-img" src="@/assets/Edit-Icon-40.png" alt="Edit">
    </button>

    <!-- Modal -->
    <div class="modal fade" id="editSignModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Sign -- {{activeSign.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-sign-title">Title</span>
              </div>
              <input type="text" class="form-control" v-model="activeSign.title">
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-sign-subtitle">SubTitle</span>
              </div>
              <input type="text" class="form-control" v-model="activeSign.subTitle">
            </div>
            <div class="input-group mb-3">
              <!-- <div class="custom-file">
                <input type="file" class="custom-file-input-md" id="inputGroupFile02">
                <label class="custom-file-label" for="inputGroupFile02">Choose Image</label>
              </div>
              <div class="input-group-append">
                <span class="input-group-text" id="">Upload</span>
              </div> -->
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">Category</span>
                </div>
                <select class="form-control custom-select-md station-input" v-model="activeSign.category" required>
                  <option disabled value="">Choose Station</option>
                  <option value="Breakfast Bar">Breakfast Bar</option>
                  <option value="Chef's Choice">Chef's Choice</option>
                  <option value="Deli">Deli</option>
                  <option value="General">General</option>
                  <option value="Global1">Global 1</option>
                  <option value="Global2">Global 2</option>
                  <option value="Global3">Global 3</option>
                  <option value="Grill">Grill</option>
                  <option value="GrillBreakfast">Grill Breakfast</option>
                  <option value="Hot Entree">Hot Entree</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Salad Bar">Salad Bar</option>
                  <option value="Soup">Soup</option>
                  <option value="Southwest">Southwest</option>
                  <option value="Sushi">Sushi</option>
                </select>
              </div>
              <div class="input-group">
                <div class="input-group-prepend-md">
                  <span class="input-group-text" id="">Scheduled Hours</span>
                </div>
                <input type="time" class="form-control" v-model="activeSign.beginningTime">
                <p style="padding: 2px; font-size: 25px;">to</p>
                <input type="time" class="form-control" v-model="activeSign.endingTime">
              </div>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">Screen</span>
                </div>
                <input type="text" class="form-control" v-model="activeSign.screen">
              </div>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">Order</span>
                </div>
                <input type="text" class="form-control" v-model="activeSign.order">
              </div>
            </div>
            <button type="button" @click="addMenuItem()" class="btn btn-primary">Add
              Menu Item</button>
            <p>{{countMenuItems}}</p>
            <button type="button" @click="addMenuOption()" class="btn btn-primary">Add
              Menu Option</button>
            <p>{{countMenuOptions}}</p>
            <div class="modal-footer">
              <button type="button" @click="resetCount()" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" @click="editSign(activeSign)" class="btn btn-primary"
                data-dismiss="modal">Save</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "EditSign",
    props: {
      signId: String,
      menuItems: Array,
      sign: Object
    },
    data() {
      return {
        countMenuItems: 0,
        countMenuOptions: 0
      }
    },
    computed: {
      activeSign() {
        return this.$store.state.activeSign
      }
    },
    methods: {
      currentSign(signId) {
        return this.$store.dispatch("getSignById", signId)
      },
      editSign(activeSign) {
        this.countMenuItems = 0;
        this.countMenuOptions = 0;
        return this.$store.dispatch("editSign", activeSign)
      },
      addMenuItem() {
        let newMenuItem = {
          name: 'Add your item here',
          description: '',
          calories: '',
          price: '',
          protein: '',
          portionSize: '',
          allergens: [
            { allergen: 'Egg', checked: false },
            { allergen: "Wheat", checked: false },
            { allergen: "Dairy", checked: false },
            { allergen: "Milk", checked: false },
            { allergen: "Soy", checked: false },
            { allergen: "Nuts", checked: false },
            { allergen: "TreeNuts", checked: false },
            { allergen: "Shellfish", checked: false },
            { allergen: "Fish", checked: false },
            { allergen: "Corn", checked: false },
            { allergen: "Vegan", checked: false },
            { allergen: "Vegetarian", checked: false },
            { allergen: "GlutenFree", checked: false }
          ],
          days: [
            { day: "Monday", checked: false },
            { day: "Tuesday", checked: false },
            { day: "Wednesday", checked: false },
            { day: "Thursday", checked: false },
            { day: "Friday", checked: false },
            { day: "Saturday", checked: false },
            { day: "Sunday", checked: false }
          ],
          category: '',
          order: 1,
          hide: false,
        }
        this.activeSign.menuItem.push(newMenuItem)
        this.countMenuItems = this.activeSign.menuItem.length
        return this.$store.dispatch("setMenuItem", newMenuItem)
      },
      addMenuOption() {
        let newMenuOption = {
          menuOptionTitle: 'Add your menu option here',
          description: ''
        }
        this.activeSign.menuOption.push(newMenuOption)
        this.countMenuOptions = this.activeSign.menuOption.length
      },
      resetCount() {
        this.countMenuItems = 0;
        this.countMenuOptions = 0;
      }

    }
  }
</script>
<style scoped>
  #edit-sign-btn {
    padding: 2px;
    margin-top: 100%;
  }

  #edit-sign-btn-img {
    max-height: 70%;
    max-width: 70%;
  }
</style>