import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Login from './views/Login.vue'
// @ts-ignore
// import Dashboard from './views/Dashboard.vue'
// @ts-ignore
import Communication from './views/Communication.vue'
// @ts-ignore
import Menus from './views/Menus.vue'
// @ts-ignore
import Menu from './views/Menu.vue'
// @ts-ignore
import Recipes from './views/Recipes.vue'
// @ts-ignore
import Costing from './views/Costing.vue'
//@ts-ignore
import AddNewIng from './views/AddNewIng.vue'
// @ts-ignore
import EditScreens from './views/screens/EditScreens.vue'
// @ts-ignore
import Home from './views/Home.vue'
// @ts-ignore
import Menu1 from './views/screens/menu1.vue'
// @ts-ignore
import Menu2 from './views/screens/menu2.vue'
// @ts-ignore
import Menu3 from './views/screens/menu3.vue'
// @ts-ignore
import Menu4 from './views/screens/menu4.vue'
// @ts-ignore
import Menu5 from './views/screens/menu5.vue'
// @ts-ignore
import Menu6 from './views/screens/menu6.vue'
// @ts-ignore
import Menu7 from './views/screens/menu7.vue'
// @ts-ignore
import Menu8 from './views/screens/menu8.vue'
// @ts-ignore
import Menu9 from './views/screens/menu9.vue'
// @ts-ignore
import Menu10 from './views/screens/menu10.vue'
// @ts-ignore
import Menu11 from './views/screens/menu11.vue'
// @ts-ignore
import Menu12 from './views/screens/menu12.vue'
// @ts-ignore
import Menu13 from './views/screens/menu13.vue'
// @ts-ignore
import Menu14 from './views/screens/menu14.vue'
// @ts-ignore
import ScreenSelection from './views/screens/ScreenSelection.vue'
//NOTE route and child routes below. add menu child when complete
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
      path: '/screen-selection',
      name: 'ScreenSelection',
      component: ScreenSelection
    },
    {
      path: '/menu1',
      name: 'Menu1',
      component: Menu1
    },
    {
      path: '/menu2',
      name: 'Menu2',
      component: Menu2
    },
    {
      path: '/menu3',
      name: 'Menu3',
      component: Menu3
    },
    {
      path: '/menu4',
      name: 'Menu4',
      component: Menu4
    },
    {
      path: '/menu5',
      name: 'Menu5',
      component: Menu5
    },
    {
      path: '/menu6',
      name: 'Menu6',
      component: Menu6
    },
    {
      path: '/menu7',
      name: 'Menu7',
      component: Menu7
    },
    {
      path: '/menu8',
      name: 'Menu8',
      component: Menu8
    },
    {
      path: '/menu9',
      name: 'Menu9',
      component: Menu9
    },
    {
      path: '/menu10',
      name: 'Menu10',
      component: Menu10
    },
    {
      path: '/menu11',
      name: 'Menu11',
      component: Menu11
    },
    {
      path: '/menu12',
      name: 'Menu12',
      component: Menu12
    },
    {
      path: '/menu13',
      name: 'Menu13',
      component: Menu13
    },
    {
      path: '/menu14',
      name: 'Menu14',
      component: Menu14
    },
    {
      path: "",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/dashboard',
    //   name: 'Dashboard',
    //   component: Dashboard
    // },
    // {
    //   path: '/communication',
    //   name: 'Communication',
    //   component: Communication
    // },
    // {
    //   path: '/menus',
    //   name: 'Menus',
    //   component: Menus
    // },
    // {
    //   path: '/menu/:menuId',
    //   name: 'Menu',
    //   component: Menu
    // },
    // {
    //   path: '/recipes',
    //   name: 'Recipes',
    //   component: Recipes
    // },
    // {
    //   path: '/costing',
    //   name: 'Costing',
    //   component: Costing
    // },
    // {
    //   path: '/ingredient',
    //   name: 'AddNewIng',
    //   component: AddNewIng
    // },
    // {
    //   path: '/edit-screens',
    //   name: 'EditScreens',
    //   component: EditScreens
    // },
    // {
    //   path: '/menu-2',
    //   name: 'Menu2',
    //   component: Menu2
    // },
    // {
    //   path: '/edit-screens',
    //   name: 'EditScreens',
    //   component: EditScreens
    // },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/communication',
          name: 'Communication',
          component: Communication
        },
        {
          path: '/menus',
          name: 'Menus',
          component: Menus
        },
        {
          path: '/menu/:menuId',
          name: 'Menu',
          component: Menu
        },
        {
          path: '/recipes',
          name: 'Recipes',
          component: Recipes
        },
        {
          path: '/costing',
          name: 'Costing',
          component: Costing
        },
        {
          path: '/ingredient',
          name: 'AddNewIng',
          component: AddNewIng
        },
        {
          path: '/edit-screens',
          name: 'EditScreens',
          component: EditScreens
        },


        // {
        //   path: 'users',
        //   name: 'AdminUsers',
        //   component: AdminUsers
        // },
        // {
        //   path: 'sites',
        //   name: 'AdminSites',
        //   component: AdminSites
        // },
        // {
        //   path: 'kitchens',
        //   name: 'AdminKitchens',
        //   component: AdminKitchens
        // },
      ]
    }
  ]
})
