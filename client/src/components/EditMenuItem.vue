<template>
  <div class="edit-menu-item">
    <!-- Button trigger modal -->
    <button type="button" @click="CurrentSign(signId, )" style="float: right;" class="btn" data-toggle="modal"
      data-target="#editMenuItemModal">
      <img src="@/assets/Edit-Icon-40.png" alt="Edit">
    </button>

    <!-- Modal -->
    <div class="modal fade" id="editMenuItemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit {{menuItemSelected.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-name">Name</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.name">
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-description">Description</span>
              </div>
              <textarea type="text" class="form-control" v-model="menuItemSelected.description"></textarea>
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-price">Price</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.price">
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-calories">Calories</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.calories">
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-protein">Protein</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.protein">
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-portion">Portion</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.portionSize">
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-order">Order</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.order">
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-category">Category</span>
              </div>
              <select class="form-control custom-select-md station-input" v-model="menuItemSelected.category" required>
                <option disabled value="">Choose Category</option>
                <option value="Base">Base</option>
                <option value="Protein">Protein</option>
                <option value="Toppings">Toppings</option>
                <option value="Add On">Add On</option>
              </select>
            </div>
            <hr />

            <label id="menu-item-label" for="#menu-item-allergens">Contains:</label>
            <div class="input-group" id="menu-item-allergens">
              <div v-for="(item, index) in allergens" :key="index" class="input-group-prepend">
                <span class="input-group-text" :for="item.allergen"
                  id="edit-menu-item-allergens">{{item.allergen}}</span>
                <input class="edit-menu-checkbox" type="checkbox" :id="item.allergen" v-model="item.checked"
                  aria-label="Checkbox for following text input">
              </div>
            </div>
            <hr />
            <div class="input-group" id="menu-item-hide">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-hide">Hide</span>
                <input type="checkbox" id="edit-menu-checkbox" v-model="menuItemSelected.Hide"
                  aria-label="Checkbox for following text input">
              </div>
            </div>
            <hr />
            <label id="menu-item-label" for="#menu-item-days">Scheduled Days:</label>
            <div class="input-group" id="menu-item-days">
              <div v-for="(item, index) in days" :key="index" class="input-group-prepend">
                <span class="input-group-text" :for="item.day" id="edit-menu-item-allergens">{{item.day}}</span>
                <input class="edit-menu-checkbox" type="checkbox" :id="item.day" v-model="item.checked"
                  aria-label="Checkbox for following text input">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="deleteMenuItem(signId)" class="btn btn-secondary"
              data-dismiss="modal">Delete</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click="editMenuItem()" class="btn btn-primary" data-dismiss="modal">Save
              changes</button>
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
      menuItem: Object,
      signId: String
    },
    data() {
      return {
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
        ]
      }
    },
    computed: {
      menuItemSelected() {
        return this.$store.state.activeItem
      },
      signs() {
        return this.$store.state.signs
      }
    },
    methods: {
      CurrentSign(signId) {
        let currentItem = this.menuItem
        return this.$store.dispatch("setItem", currentItem)
      },
      editMenuItem(signId) {
        let editedMenuItem = {
          name: this.menuItemSelected.name,
          description: this.menuItemSelected.description,
          calories: this.menuItemSelected.calories,
          price: this.menuItemSelected.price,
          protein: this.menuItemSelected.protein,
          portionSize: this.menuItemSelected.portionSize,
          allergens: {
            egg: this.allergens[0].checked,
            wheat: this.allergens[1].checked,
            dairy: this.allergens[2].checked,
            milk: this.allergens[3].checked,
            soy: this.allergens[4].checked,
            nuts: this.allergens[5].checked,
            treeNuts: this.allergens[6].checked,
            shellfish: this.allergens[7].checked,
            fish: this.allergens[8].checked,
            corn: this.allergens[9].checked,
            vegan: this.allergens[10].checked,
            vegetarian: this.allergens[11].checked,
            glutenFree: this.allergens[12].checked
          },
          days: {
            monday: this.days[0],
            tuesday: this.days[1],
            wednesday: this.days[2],
            thursday: this.days[3],
            friday: this.days[4],
            saturday: this.days[5],
            sunday: this.days[6]
          },
          category: this.menuItemSelected.category,
          order: this.menuItemSelected.order,
          hide: this.menuItemSelected.hide,
        }
        let id = this.menuItemSelected._id
        let signs = this.signs
        for (let i = 0; i < signs.length; i++) {
          let s = signs[i]
          let item = s.menuItem
          for (let j = 0; j < item.length; j++) {
            let m = item[j]
            if (id == m._id) {
              // item.push(editedMenuItem)
              s.menuItemd[m] = editedMenuItem
              this.$store.dispatch("editSign", s)
            }
          }
        }
        // return this.$store.dispatch("editSign", editedMenuItem)
      },
      async deleteMenuItem(signId) {
        try {
          let id = this.menuItemSelected._id
          let signs = this.signs
          for (let i = 0; i < signs.length; i++) {
            let s = signs[i]
            let item = s.menuItem
            for (let j = 0; j < item.length; j++) {
              let m = item[j]
              if (id == m._id) {
                item.splice(j, 1)
                this.$store.dispatch("editSign", s)
              }
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
</script>
<style scoped>
  #edit-menu-item-allergens,
  #edit-menu-item-hide {
    width: 6rem;
    margin: 2px;
    padding: 5px;

  }

  .edit-menu-checkbox,
  #edit-menu-checkbox {
    width: 1rem;
    margin-top: 15px;
  }

  #menu-item-allergens,
  #menu-item-hide,
  #menu-item-days {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #menu-item-label {
    margin-top: 10px;
    font-weight: bold;
  }

  #edit-menu-item-name,
  #edit-menu-item-description,
  #edit-menu-item-price,
  #edit-menu-item-calories,
  #edit-menu-item-protein,
  #edit-menu-item-portion,
  #edit-menu-item-order,
  #edit-menu-item-category {
    width: 6rem;
    padding: 5px;
  }

  #menu-item-input {
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>