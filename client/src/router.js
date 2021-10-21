import Vue from "vue";
import Router from "vue-router";

// @ts-ignore
import Login from "./views/Login.vue";
// @ts-ignore
import Home from "./views/Home.vue";
import Communication from "./views/Communication.vue";
import Costing from "./views/Costing.vue";
import Menus from "./views/Menus.vue";
import Menu from "./views/Menu.vue";
import Recipes from "./views/Recipes.vue";
import AddNewIng from "./views/AddNewIng.vue";
// @ts-ignore
import EditScreens from "./views/screens/EditScreens.vue";
import ScreenSelection from "./views/screens/ScreenSelection.vue";
// @ts-ignore
import Menu1 from "./views/screens/menu1.vue";
// @ts-ignore
import Menu2 from "./views/screens/menu2.vue";
// @ts-ignore
import Menu3 from "./views/screens/menu3.vue";
// @ts-ignore
import Menu4 from "./views/screens/menu4.vue";
// @ts-ignore
import Menu5 from "./views/screens/menu5.vue";
// @ts-ignore
import Menu6 from "./views/screens/menu6.vue";
// @ts-ignore
import Menu7 from "./views/screens/menu7.vue";
// @ts-ignore
import Menu8 from "./views/screens/menu8.vue";
// @ts-ignore
import Menu9 from "./views/screens/menu9.vue";
// @ts-ignore
import Menu10 from "./views/screens/menu10.vue";
// @ts-ignore
import Menu11 from "./views/screens/menu11.vue";
// @ts-ignore
import Menu12 from "./views/screens/menu12.vue";
// @ts-ignore
import Menu13 from "./views/screens/menu13.vue";
// @ts-ignore
import Menu14 from "./views/screens/menu14.vue";
// @ts-ignore
import Menu15 from "./views/screens/menu15.vue";
// @ts-ignore
import Menu16 from "./views/screens/menu16.vue";
// @ts-ignore
import Menu17 from "./views/screens/menu17.vue";
// @ts-ignore
import Menu18 from "./views/screens/menu18.vue";
// @ts-ignore
import Menu19 from "./views/screens/menu19.vue";


//NOTE route and child routes below. add menu child when complete
// @ts-ignore
import Admin from "./views/Admin.vue";
// @ts-ignore
import AdminUsers from "./components/AdminUsers.vue";
// @ts-ignore
import AdminSites from "./components/AdminSites.vue";
// @ts-ignore
import AdminKitchens from "./components/AdminKitchens.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "",
      redirect: "/login",
    },
    {
      path: "/screen-selection",
      name: "ScreenSelection",
      component: ScreenSelection
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "screen-selection" */ "./views/screens/ScreenSelection.vue"
      //   ),
    },
    {
      path: "/menu1/:kitchenName",
      name: "Menu1",
      component: Menu1
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu1" */ "./views/screens/menu1.vue"
      //   ),
    },
    {
      path: "/menu2/:kitchenName",
      name: "Menu2",
      component: Menu2
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu2" */ "./views/screens/menu2.vue"
      //   ),
    },
    {
      path: "/menu3/:kitchenName",
      name: "Menu3",
      component: Menu3
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu3" */ "./views/screens/menu3.vue"
      //   ),
    },
    {
      path: "/menu4/:kitchenName",
      name: "Menu4",
      component: Menu4
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu4" */ "./views/screens/menu4.vue"
      //   ),
    },
    {
      path: "/menu5/:kitchenName",
      name: "Menu5",
      component: Menu5
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu5" */ "./views/screens/menu5.vue"
      //   ),
    },
    {
      path: "/menu6/:kitchenName",
      name: "Menu6",
      component: Menu6
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu6" */ "./views/screens/menu6.vue"
      //   ),
    },
    {
      path: "/menu7/:kitchenName",
      name: "Menu7",
      component: Menu7
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu7" */ "./views/screens/menu7.vue"
      //   ),
    },
    {
      path: "/menu8/:kitchenName",
      name: "Menu8",
      component: Menu8
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu8" */ "./views/screens/menu8.vue"
      //   ),
    },
    {
      path: "/menu9/:kitchenName",
      name: "Menu9",
      component: Menu9
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu9" */ "./views/screens/menu9.vue"
      //   ),
    },
    {
      path: "/menu10/:kitchenName",
      name: "Menu10",
      component: Menu10,

      // component: () =>
      //   // @ts-ignore
      //   import("./views/screens/menu10.vue"),
      // props: {id}
    },
    {
      path: "/menu11/:kitchenName",
      name: "Menu11",
      component: Menu11
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu11" */ "./views/screens/menu11.vue"
      //   ),
    },
    {
      path: "/menu12/:kitchenName",
      name: "Menu12",
      component: Menu12
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu12" */ "./views/screens/menu12.vue"
      //   ),
    },
    {
      path: "/menu13/:kitchenName",
      name: "Menu13",
      component: Menu13
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu13" */ "./views/screens/menu13.vue"
      //   ),
    },
    {
      path: "/menu14/:kitchenName",
      name: "Menu14",
      component: Menu14
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu14" */ "./views/screens/menu14.vue"
      //   ),
    },
    {
      path: "/menu15/:kitchenName",
      name: "Menu15",
      component: Menu15
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu15" */ "./views/screens/menu15.vue"
      //   ),
    },
    {
      path: "/menu16/:kitchenName",
      name: "Menu16",
      component: Menu16
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu16" */ "./views/screens/menu16.vue"
      //   ),
    },
    {
      path: "/menu17/:kitchenName",
      name: "Menu17",
      component: Menu17
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu17" */ "./views/screens/menu17.vue"
      //   ),
    },
    {
      path: "/menu18/:kitchenName",
      name: "Menu18",
      component: Menu18
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu18" */ "./views/screens/menu18.vue"
      //   ),
    },
    {
      path: "/menu19/:kitchenName",
      name: "Menu19",
      component: Menu19
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "menu19" */ "./views/screens/menu19.vue"
      //   ),
    },
    {
      path: "",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "login" */ "./views/Login.vue"
      //   ),
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      // component: () =>
      //   import(
      //     // @ts-ignore
      //     /* webpackChunkName: "home" */ "./views/Home.vue"
      //   ),
      children: [
        {
          path: "/communication",
          name: "Communication",
          component: Communication
          // component: () =>
          //   import(
          //     // @ts-ignore
          //     /* webpackChunkName: "communication" */ "./views/Communication.vue"
          //   ),
        },
        {
          path: "/menus",
          name: "Menus",
          component: Menus
          // component: () =>
          //   import(
          //     // @ts-ignore
          //     /* webpackChunkName: "menus" */ "./views/Menus.vue"
          //   ),
        },
        {
          path: "/menu/:menuId",
          name: "Menu",
          component: Menu
          // component: () =>
          //   import(
          //     // @ts-ignore
          //     /* webpackChunkName: "menu" */ "./views/Menu.vue"
          //   ),
        },
        {
          path: "/recipes",
          name: "Recipes",
          component: Recipes
          // component: () =>
          //   import(
          //     // @ts-ignore
          //     /* webpackChunkName: "recipes" */ "./views/Recipes.vue"
          //   ),
        },
        {
          path: "/costing",
          name: "Costing",
          component: Costing
          // component: () =>
          //   import(
          //     // @ts-ignore
          //     /* webpackChunkName: "costing" */ "./views/Costing.vue"
          //   ),
        },
        {
          path: "/ingredient",
          name: "AddNewIng",
          component: AddNewIng
          // component: () =>
          //   import(
          //     // @ts-ignore
          //     /* webpackChunkName: "new-ingredient" */ "./views/AddNewIng.vue"
          //   ),
        },
        {
          path: "/edit-screens",
          name: "EditScreens",
          component: EditScreens
          // component: () =>
          //   import(
          //     // @ts-ignore
          //     /* webpackChunkName: "edit-screens" */ "./views/screens/EditScreens.vue"
          //   ),
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
      ],
    },
  ],
});
