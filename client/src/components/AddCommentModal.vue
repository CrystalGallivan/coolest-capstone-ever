<template>
  <div class="add-comment-modal col">
    <div class="modal fade" id="addCommentModal" tabindex="-1" role="dialog" aria-labelledby="addCommentModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCommentModalLabel">Comment Creator</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createComment">
              <label for="commentInputContent" class="mt-1 mb-0">Content</label>
              <textarea v-model="content" type="text" class="form-control" rows="3" id="commentInputContent"
                aria-describedby="commentContentHelp" placeholder="Enter Content For Your Comment" required></textarea>
              <small id="menuWeekHelp" class="form-text text-muted">Enter content for your comment here</small>
              <button type="submit" class="btn btn-success mt-1">Create Comment</button>
              <button type="button" class="btn btn-secondary mt-1 ml-1" data-dismiss="modal">Close</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddCommentModal",
    props: [],
    data() {
      return {
        content: '',
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      activeMenu() {
        return this.$store.state.activeMenu
      }
    },
    methods: {
      createComment() {
        let newComment = {
          content: this.content,
          authorId: this.user._id,
          authorName: this.user.name
        }
        debugger
        this.activeMenu.comments.push(newComment)
        this.$store.dispatch('editMenu', this.activeMenu)
        setTimeout(() => {
          this.newComment.content = ""
          this.newComment.authorId = ""
          this.newComment.authorName = ""
        }, 1000);
        $("#addCommentModal").modal("hide");
        $(".modal-backdrop").remove();
      }
    },
    components: {}
  }
</script>

<style scoped>
  #addCommentModal {
    margin-top: 5vw;
  }
</style>