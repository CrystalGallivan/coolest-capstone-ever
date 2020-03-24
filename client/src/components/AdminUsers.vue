<template>
  <div admin-users id="admin-users-component">
    <div class="row" id="admin-user-title">
      <h5>User - {{user.name}}</h5>
    </div>
    <div class="row" id="admin-user-information">
      <div class="col-4">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="user-name">Name</span>
          </div>
          <input type="text" v-model="user.name" class="form-control" placeholder="Username" aria-label="Username"
            aria-describedby="user-name" required>
        </div>
      </div>
      <div class="col-5">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="user-email">Email</span>
          </div>
          <input type="text" v-model="user.email" class="form-control" placeholder="Email" aria-label="Email"
            aria-describedby="user-email" required>
        </div>
      </div>
      <div class="col-3">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="custom-role-select">Role</label>
          </div>
          <!-- FIXME  Check SiteUser Role -->
          <select v-model="user.role" class="custom-select" id="custom-role-select">
            <option selected>Choose...</option>
            <option value="Admin">Admin</option>
            <option value="Chef">Chef</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row" id="admin-user-password">
      <div class="col">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="user-password">Password</span>
          </div>
          <input type="text" v-model="user.password" class="form-control" placeholder="Password" aria-label="Password"
            aria-describedby="user-password" required>
        </div>
      </div>
      <div class="col">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="user-confirm-password">Confirm Password</span>
          </div>
          <input type="text" class="form-control" placeholder="Confirm Password" aria-label="Confirm Password"
            aria-describedby="user-confirm-password" required>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button type="submit" class="btn" on-click="saveUser(siteUser)" id="admin-save-btn">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminUserModal from '@/components/AdminUserModal.vue'

  export default {
    name: "AdminUsers",
    mounted() {
      this.$store.dispatch('getAllSites')
      // this.$store.dispatch('getAllUsersBySite')
    },
    data() {
      return {
        siteUser: {
          role: '',
          name: '',
          email: '',
          siteId: ''
        },
        role: this.role || '',
        name: this.name || '',
        email: this.email || '',
        siteId: this.siteId || ''
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      // selectUser() {
      //   this.$store.dispatch('selectAdminUser', this.newSite)
      // },
      // editUser(siteUser) {
      //   this.$store.dispatch("editUser", siteUser)
      // }

      saveUser(siteUser) {
        if (!this.user) {
          this.$store.dispatch("editUser", siteUser)
        } else {
          this.$store.dispatch("createUser", siteUser)
        }
      }
    },
    components: {
      AdminUserModal
    }
  }
</script>

<style scoped>
  #admin-users-component {
    background-color: whitesmoke;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 20px;
  }

  #admin-user-title {
    background-color: rgb(109, 197, 154);
    box-shadow: 3px 3px rgba(109, 197, 155, 0.39);
    padding-left: 25px;
    padding-top: 5px;
    margin-bottom: 30px;
    font-family: Arial, Helvetica, sans-serif;
  }

  #admin-save-btn {
    margin: 30px;
    background-color: rgb(109, 197, 154);
    color: whitesmoke;
  }
</style>