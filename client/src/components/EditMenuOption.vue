<template>
  <div class="edit-menu-option">

    <!-- Modal -->
    <div class="modal fade" id="editMenuOptionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ menuOptionSelected.menuOptionTitle }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group" id="menu-option-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-option-title">Title</span>
              </div>
              <input v-if="menuOptionSelected.menuOptionTitle" type="text" class="form-control"
                v-model="menuOptionSelected.menuOptionTitle" />
            </div>
            <div class="input-group" id="menu-option-input">
              <div class="input-group-prepend">
                <span class="input-group-text" id="edit-menu-option-description">Description</span>
              </div>
              <ckeditor :editor="editor" class="form-control" v-model="menuOptionSelected.description"
                :config="editorConfig">
              </ckeditor>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="deleteMenuOption(signId)" class="btn btn-secondary" data-dismiss="modal">
              Delete
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" @click="editMenuOption" class="btn btn-primary">
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
    name: "EditMenuOption",
    props: {
      menuOption: Object,
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
      menuOptionSelected() {
        return this.$store.state.activeOption;
      },
      signs() {
        return this.$store.state.signs;
      },
    },
    methods: {
      editMenuOption() {
        let id = this.menuOptionSelected._id;
        let signs = this.signs;
        for (let i = 0; i < signs.length; i++) {
          let s = signs[i];
          let option = s.menuOption;
          for (let j = 0; j < option.length; j++) {
            let m = option[j];
            if (id == m._id) {
              return this.$store.dispatch("editSign", s).then((a) => {
                $("#editMenuOptionModal").modal('toggle')
                $(".modal-backdrop").remove();
              });
            }
          }
        }
      },
      async deleteMenuOption(signId) {
        try {
          let id = this.menuOptionSelected._id;
          let signs = this.signs;
          for (let i = 0; i < signs.length; i++) {
            let s = signs[i];
            let option = s.menuOption;
            for (let j = 0; j < option.length; j++) {
              let m = option[j];
              if (id == m._id) {
                option.splice(j, 1);
                this.$store.dispatch("editSign", s);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
    // editorDestroy(editor) {
    //   debugger
    //   editor.destroy()
    //   console.log('Editor Destroyed!')
    // }
  };
</script>
<style scoped>
  #edit-menu-option-allergens,
  #edit-menu-option-days,
  #edit-menu-option-hide {
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

  #menu-option-allergens,
  #menu-option-hide,
  #menu-option-days {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #menu-option-label {
    margin-top: 10px;
    font-weight: bold;
  }

  #edit-menu-option-title,
  #edit-menu-option-description,
  #edit-menu-option-price,
  #edit-menu-option-calories,
  #edit-menu-option-protein,
  #edit-menu-option-portion,
  #edit-menu-option-order,
  #edit-menu-option-category {
    width: 6rem;
    padding: 5px;
  }

  #menu-option-input {
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>