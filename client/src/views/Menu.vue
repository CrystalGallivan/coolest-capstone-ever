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
            <a data-toggle="modal" data-target="'#editMenuModal'+menu._id" class="dropdown-item">Edit
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
        <h5 class="menuTitle">{{menu.title}}</h5>
      </div>
      <div class="col-12">
        <h5 class="menuTitle mt-1">{{menu.date}}</h5>
      </div>
    </div>

    <!-- Menu Comments -->
    <div class="row justify-content-center align-items-center">
      <div class="col-12">
        <h6 class="menuCommentsTitle ml-5">Menu Comments:<button class="btn shadow-none" type="button"
            data-target="#addCommentModal" data-toggle="modal"><img src="../assets/add-teal-25.png"
              title="Add Comment"></button></h6>
        <add-comment-modal />
        <button class="btn-sm collapseCommentsBtn shadow-none" data-toggle="collapse"
          data-target="#collapseComments">View/Close
          Comments</button>
      </div>
      <div class="col-12 collapse mt-1" id="collapseComments">
        <div class="card w-95" v-for="comment in comments" :key="comment._id">
          <div class="card-body">
            <h5 class="card-title"> {{comment.content}} </h5>
          </div>
          <div class="card-footer">
            <!-- TODO authorId.name is not working to get the author's name -->
            <p class="card-text float-right">{{comment.authorId}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- List of Days -->
    <div class="row justify-content-center">
      <menu-days-list />
    </div>

  </div>
</template>

<script>
  import AddCommentModal from '@/components/AddCommentModal.vue'
  import MenuDaysList from '@/components/MenuDaysList.vue'


  export default {
    name: "Menu",
    props: ['menuId'],
    mounted() {
      // this.$store.dispatch('setActiveMenu', this.$route.params.menuId)
      // return this.$store.state.activeMenu
      // this.$store.dispatch('setActiveMenu', this.activeMenu)
      this.$store.dispatch('getMenus', this.$route.params.id)
    },
    data() {
      return {
        activeMenu: {},
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      menu() {
        return this.$store.state.activeMenu
      },
      comments() {
        return this.$store.state.activeMenu.comments
      },
      days() {
        return this.$store.state.activeMenu.days
      }
    },
    methods: {
      // activeMenu() {
      //   this.$store.state.activeMenu = this.activeMenu
      // }
    },
    components: {
      AddCommentModal,
      MenuDaysList,
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

  .card {
    color: black;
    max-height: max-content;
    /* background-color: rgba(223, 223, 223, 0.801); */
  }

  .card-footer {
    border: none;
    /* background-color: rgba(223, 223, 223, 0.801); */
    background-color: #fff;
  }
</style>