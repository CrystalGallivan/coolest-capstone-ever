import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Communication from './views/Communication.vue'
// @ts-ignore
import Costing from './views/Costing.vue'
// @ts-ignore
import Login from './views/Login.vue'
// @ts-ignore
import Recipes from './views/Recipes.vue'
//@ts-ignore
import AddNewIng from './views/AddNewIng.vue'

//admin route and child routes below. add menu child when complete
// @ts-ignore
import Admin from './views/Admin.vue'
// @ts-ignore
import AdminUsers from './components/AdminUsers.vue'
// @ts-ignore
import AdminSites from './components/AdminSites.vue'
// @ts-ignore
import AdminKitchens from './components/AdminKitchens.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/communication',
      name: 'Communication',
      component: Communication
    },
    {
      path: '/costing',
      name: 'Costing',
      component: Costing
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes
    },
    {
      path: '/ingredient',
      name: 'AddNewIng',
      component: AddNewIng
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'users',
          name: 'AdminUsers',
          component: AdminUsers
        },
        {
          path: 'sites',
          name: 'AdminSites',
          component: AdminSites
        },
        {
          path: 'kitchens',
          name: 'AdminKitchens',
          component: AdminKitchens
        },
      ]
    }
  ]
})
