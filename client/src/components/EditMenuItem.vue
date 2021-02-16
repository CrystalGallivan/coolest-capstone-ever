<template>
  <div class="edit-menu-item">

    <!-- Modal -->
    <div class="modal fade" id="editMenuItemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ menuItemSelected.name }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-name">Name</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.name" />
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-description">Description</span>
              </div>
              <ckeditor :editor="editor" class="form-control" @destroy="onEditorDestroy"
                v-model.lazy="menuItemSelected.description"></ckeditor>
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-price">Price</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.price" />
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-calories">Calories</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.calories" />
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-protein">Protein</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.protein" />
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-portion">Portion</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.portionSize" />
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-order">Order</span>
              </div>
              <input type="text" class="form-control" v-model="menuItemSelected.order" />
            </div>
            <div class="input-group" id="menu-item-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-category">Category</span>
              </div>
              <select class="form-control custom-select-md station-input" v-model="menuItemSelected.category" required>
                <option disabled value="">Choose Category</option>
                <option value="Add On">Add On</option>
                <option value="Base">Base</option>
                <option value="General">General</option>
                <option value="Protein">Protein</option>
                <option value="Sauce">Sauce</option>
                <option value="Special">Special</option>
                <option value="Toppings">Toppings</option>
              </select>
            </div>
            <hr />

            <label id="menu-item-label" for="#menu-item-allergens">Contains:</label>
            <div class="input-group" id="menu-item-allergens">
              <div v-for="itemA in menuItemSelected.allergens" :key="itemA._id" class="input-group-prepend">
                <span class="input-group-text" :for="itemA.allergen" id="edit-menu-item-allergens">{{ itemA.allergen
                  }}</span>
                <input class="edit-menu-checkbox" type="checkbox" :id="itemA.allergen" v-model="itemA.checked"
                  aria-label="Checkbox for following text input" />
              </div>
            </div>
            <hr />
            <div class="input-group" id="menu-item-hide">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-item-hide">Hide</span>
                <input type="checkbox" id="edit-menu-checkbox" v-model="menuItemSelected.hide"
                  aria-label="Checkbox for following text input" />
              </div>
            </div>
            <hr />
            <label id="menu-item-label" for="#menu-item-days">Scheduled Days:</label>
            <div class="input-group" id="menu-item-days">
              <div v-for="itemD in menuItemSelected.days" :key="itemD._id" class="input-group-prepend">
                <span class="input-group-text" :for="itemD.day" id="edit-menu-item-days">{{ itemD.day }}</span>
                <input class="edit-menu-checkbox" type="checkbox" :id="itemD.day" v-model="itemD.checked"
                  aria-label="Checkbox for following text input" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="deleteMenuItem(signId)" class="btn btn-secondary" data-dismiss="modal">
              Delete
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" @click="editMenuItem()" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
  export default {
    name: "EditMenuItem",
    props: {
      menuItem: Object,
      signId: String,
    },
    data() {
      return {
        editor: ClassicEditor,
        editorData: "<p>Content of the editor.</p>",
        editorConfig: {
          // The configuration of the editor.
        },
      };
    },
    computed: {
      menuItemSelected() {
        return this.$store.state.activeItem;
      },
      signs() {
        return this.$store.state.signs;
      },
    },
    methods: {
      editMenuItem() {
        let id = this.menuItemSelected._id;
        let signs = this.signs;
        for (let i = 0; i < signs.length; i++) {
          let s = signs[i];
          let item = s.menuItem;
          for (let j = 0; j < item.length; j++) {
            let m = item[j];
            if (id == m._id) {
              // console.log(s)
              s.menuItem[j] = this.menuItemSelected;
              this.$store.dispatch("editSign", s).then((a) => {
                $("#editMenuItemModal").modal('toggle');
                $(".modal-backdrop").remove();
              });
              return;
            }
          }
        }
      },
      async deleteMenuItem(signId) {
        try {
          let id = this.menuItemSelected._id;
          let signs = this.signs;
          for (let i = 0; i < signs.length; i++) {
            let s = signs[i];
            let item = s.menuItem;
            for (let j = 0; j < item.length; j++) {
              let m = item[j];
              if (id == m._id) {
                item.splice(j, 1);
                this.$store.dispatch("editSign", s);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
    beforeDestroy: function () {
      this.editorData.destroy()
    },
    // onEditorDestroy(editor) {
    //   console.log('Editor destroyed.', { editor });
    // }
  };
</script>
<style scoped>
  #edit-menu-item-allergens,
  #edit-menu-item-days,
  #edit-menu-item-hide {
    width: 6rem;
    margin: 2px;
    padding: 5px;
  }

  .modal-dialog {
    max-width: 59.5vw;
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