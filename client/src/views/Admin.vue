<template>
  <div class="container-fluid admin">
    <div class="row" id="admin-sub-nav-bar"></div>
    <div class="row" id="admin-title">
      <h1>Administrator Manager</h1>
    </div>
    <div class="row" id="admin-site-select">
      <div class="col">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="custom-site-select">Site</label>
          </div>
          <select v-model="siteId" @change="setKitchens($event)" class="custom-select" id="custom-site-select">
            <option selected>Choose...</option>
            <!-- :click="setKitchens(site)" -->
            <option v-for="site in sites" :value="site">{{site.name}}</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="custom-kitchen-select">Kitchen</label>
          </div>
          <!-- @change="setUsers(kitchen)" -->
          <select class="custom-select" id="custom-kitchen-select">
            <option selected>Choose...</option>
            <option v-for="kitchen in kitchens" v-model="kitchen.name" value="kitchen.name">{{kitchen.name}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row" id="admin-kitchen">
      <h5>Kitchen</h5>
    </div>
    <hr>
    <div class="row" id="admin-user-select">
      <div class="col-6">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="custom-user-select">Users</label>
          </div>
          <select class="custom-select" id="custom-user-select">
            <option selected>Choose...</option>
            <option value="1">Add New User</option>
            <option v-for="user in users" v-model="user.name" value="user.name">{{user.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row" id="admin-menu-select">
      <div class="col-6">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="custom-menu-select">Menus</label>
          </div>
          <select class="custom-select" id="custom-menu-select">
            <option selected>Choose...</option>
            <option value="1">Southwest</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row" id="admin-title-menu"></div>
    <div class="row" id="admin-menu-select"></div>
    <!-- <div class="row" id="admin-users"> -->
    <admin-users />
    <!-- </div> -->
    <div class="row" id="admin-menus"></div>
  </div>
</template>

<script>
  import AdminUsers from '@/components/AdminUsers.vue'
  export default {
    name: "admin",
    mounted() {
      // this.$store.dispatch('getUserSites')
      // this.$store.dispatch('getSiteUsers')
    },
    props: [],
    data() {
      return {}
    },
    computed: {
      sites() {
        return this.$store.state.userSites.mySites
      },
      kitchens() {
        return this.$store.state.kitchens
      },
      users() {
        return this.$store.state.users
      }
    },
    methods: {
      setKitchens(e) {
        debugger
        let siteId = e.target.value
        this.$store.dispatch('kitchens', siteId)
        this.$store.dispatch('getAllUsersBySite', siteId)
      },
      setUsers(kitchen) {
        debugger
        this.$store.dispatch('setKitchenUsers', kitchen.users)
      }
    },
    components: {
      AdminUsers
    }
  }
</script>

<style scoped>
  #admin-sub-nav-bar {
    background-color: rgba(109, 197, 155, 0.753);
    box-shadow: 2px 2px rgba(109, 197, 155, 0.39);
    height: 40px;
    width: 108%;
    margin-top: -20px;
    margin-left: -50px;
    margin-bottom: 20px;
  }

  #admin-kitchen {
    background-color: rgb(109, 197, 154);
    box-shadow: 3px 3px rgba(109, 197, 155, 0.39);
    padding-left: 25px;
    padding-top: 5px;
    font-family: Arial, Helvetica, sans-serif;

  }

  #admin-title {
    padding-left: 25px;
    padding-top: 5px;
    font-family: Pacifico;
    margin-bottom: 40px;

  }

  /* #btn-users {
    background-color: rgb(109, 197, 154);
    color: rgb(5, 38, 45)
  }

  #btn-sites {
    background-color: rgb(109, 197, 154);
    color: rgb(5, 38, 45)
  }

  #btn-kitchens {
    background-color: rgb(109, 197, 154);
    color: rgb(5, 38, 45)
  }

  #btn-menus {
    background-color: rgb(204, 153, 0);
    color: rgb(5, 38, 45)
  } */
</style>