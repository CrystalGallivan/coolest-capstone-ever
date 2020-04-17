<template>
  <div class="menu">
    <!-- Menu Info -->
    <div class="row">
      <div class="col-12">
        <div class="dropdown float-right">
          <!-- NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'" -->
          <button class="btn d-down p-0 shadow-none" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <img src="../assets/menu-vertical-teal-32.png" alt="" srcset="">
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <!-- TODO data-target not working with passing the menu._id to the editMenuModal -->
            <a data-toggle="modal" data-target="#editMenuModal" class="dropdown-item">Edit
              Menu</a>
            <!-- TODO Add that an admin can also delete menus; how to get user role? -->
            <!-- <a v-if="user._id == menu.authorId" @click='deleteMenu(menu._id)' class="dropdown-item" href="#">Delete
                      Menu</a> -->
            <!-- TODO Need to add that an admin user can lock a menu -->
            <!-- <a @click='lockMenu(menuId)' class="dropdown-item" href="#">Lock
                                Menu</a> -->
          </div>
        </div>
        <h1 class="menuTitle menuWeek">{{menu.week}}</h1>
      </div>
      <div class="col-12">
        <h5 class="menuTitle">Title: {{menu.title}}</h5>
      </div>
      <div class="col-12">
        <h5 class="menuTitle mt-1">Kitchen: {{menu.kitchenId | findKitchenName(kitchens)}}</h5>
      </div>
      <div class="col-12">
        <h5 class="menuTitle mt-1">Date: {{menu.date | formatDate }}</h5>
      </div>
    </div>

    <!-- Menu Comments -->
    <div class="row justify-content-center align-items-center">
      <div class="col-12">
        <h6 class="menuCommentsTitle ml-5 mb-0">Menu Comments:<button class="btn shadow-none" type="button"
            data-target="#addCommentModal" data-toggle="modal"><img src="../assets/add-teal-25.png"
              title="Add Comment"></button></h6>
        <add-comment-modal />
        <button class="btn-sm collapseCommentsBtn shadow-none mb-1" data-toggle="collapse"
          data-target="#collapseComments">View/Close
          Comments</button>
      </div>
      <div class="collapse" id="collapseComments">
        <div class="col-12 mt-1 d-flex justify-content-center" v-for="comment in comments" :key="comment._id">
          <div class="card commentCard">
            <div class="card-header">
              <div class="dropdown d-flex justify-content-end m-0">
                <!-- NOTE is role under user? v-if="menu.authorId == user._id || user.role == 'admin'" -->
                <button class="btn d-down p-0 shadow-none" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  <img src="../assets/menu-vertical-25.png" alt="" srcset="">
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <!-- TODO Add that an admin can also delete menus; how to get user role? -->
                  <a @click='deleteComment(comment._id)' class="dropdown-item" href="#">Delete
                    Comment</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p class="cardContent">{{comment.content}}</p>
            </div>
            <div class="card-footer">
              <p class="card-text float-right">{{comment.authorName}}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- List of Days -->
    <div class="row justify-content-center">
      <menu-days-list />
    </div>

    <menu-edit-modal />

  </div>
</template>

<script>
  import AddCommentModal from '@/components/AddCommentModal.vue'
  import MenuDaysList from '@/components/MenuDaysList.vue'
  import MenuEditModal from '@/components/MenuEditModal.vue'
  import moment from 'moment'

  export default {
    name: "Menu",
    props: ['menuId'],
    mounted() { },
    data() {
      return {}
    },
    computed: {
      users() {
        return this.$store.state.users
      },
      user() {
        return this.$store.state.user
      },
      site() {
        return this.$store.state.site
      },
      kitchens() {
        return this.$store.state.site.kitchens
      },
      menu() {
        return this.$store.state.activeMenu
      },
      comments() {
        return this.$store.state.activeMenu.comments
      },
      days() {
        return this.$store.state.activeMenu.days
      },
    },
    filters: {
      formatDate(date) {
        if (date) {
          return moment(date).add(1, 'd').format('MMM Do, YYYY')
        }
      },
      findKitchenName(id, kitchens) {
        if (id && kitchens) {
          let ks = kitchens
          return ks.find(x => x._id === id).name
        }
      },
    },
    methods: {
      deleteComment(commentId) {
        this.menu.comments = this.menu.comments.filter(comment => comment._id !== commentId)
        this.$store.dispatch('editMenu', this.menu)
      },
    },
    components: {
      AddCommentModal,
      MenuDaysList,
      MenuEditModal
    }
  }
</script>

<style scoped>
  .dropdown {
    margin-right: 35%;
    margin-top: 7px;
  }

  .dropdown-item {
    cursor: pointer;
  }

  .menuTitle {
    color: rgb(109, 197, 154)
  }

  .menuWeek {
    margin-left: 38%;
  }

  .menuCommentsTitle {
    color: rgb(109, 197, 154)
  }

  .collapseCommentsBtn {
    background-color: rgb(5, 38, 45);
    color: gray;
    border: none;
    font-size: 12px;
    padding: 3px;
  }

  .commentCard {
    width: 40rem;
  }

  .card {
    color: black;
    max-height: max-content;
  }

  .card-header {
    border: none;
    background-color: #fff;
    padding: 2px 2px;
  }

  .card-body {
    padding: 0 0;
    max-height: min-content;
  }

  .cardContent {
    margin: 2px 2px;
  }

  .card-footer {
    border: none;
    background-color: #fff;
    padding: 2px 5px;
  }
</style>