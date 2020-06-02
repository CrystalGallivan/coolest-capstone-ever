import Vue from "vue";
import Router from "vue-router";

// @ts-ignore
import Menu10 from "./views/screens/menu10.vue";

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
      path: "/screen-selection",
      name: "ScreenSelection",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "screen-selection" */ "./views/screens/ScreenSelection.vue"
        ),
    },
    {
      path: "/menu1",
      name: "Menu1",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu1" */ "./views/screens/menu1.vue"
        ),
    },
    {
      path: "/menu2",
      name: "Menu2",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu2" */ "./views/screens/menu2.vue"
        ),
    },
    {
      path: "/menu3",
      name: "Menu3",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu3" */ "./views/screens/menu3.vue"
        ),
    },
    {
      path: "/menu4",
      name: "Menu4",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu4" */ "./views/screens/menu4.vue"
        ),
    },
    {
      path: "/menu5",
      name: "Menu5",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu5" */ "./views/screens/menu5.vue"
        ),
    },
    {
      path: "/menu6",
      name: "Menu6",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu6" */ "./views/screens/menu6.vue"
        ),
    },
    {
      path: "/menu7",
      name: "Menu7",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu7" */ "./views/screens/menu7.vue"
        ),
    },
    {
      path: "/menu8",
      name: "Menu8",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu8" */ "./views/screens/menu8.vue"
        ),
    },
    {
      path: "/menu9",
      name: "Menu9",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu9" */ "./views/screens/menu9.vue"
        ),
    },
    {
      path: "/soup",
      name: "Menu10",
      component: Menu10,

      // component: () =>
      //   // @ts-ignore
      //   import("./views/screens/menu10.vue"),
      // props: {id}
    },
    {
      path: "/menu11",
      name: "Menu11",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu11" */ "./views/screens/menu11.vue"
        ),
    },
    {
      path: "/menu12",
      name: "Menu12",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu12" */ "./views/screens/menu12.vue"
        ),
    },
    {
      path: "/menu13",
      name: "Menu13",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu13" */ "./views/screens/menu13.vue"
        ),
    },
    {
      path: "/menu14",
      name: "Menu14",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "menu14" */ "./views/screens/menu14.vue"
        ),
    },
    {
      path: "",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "login" */ "./views/Login.vue"
        ),
    },
    {
      path: "/home",
      name: "Home",
      component: () =>
        import(
          // @ts-ignore
          /* webpackChunkName: "home" */ "./views/Home.vue"
        ),
      children: [
        {
          path: "/communication",
          name: "Communication",
          component: () =>
            import(
              // @ts-ignore
              /* webpackChunkName: "communication" */ "./views/Communication.vue"
            ),
        },
        {
          path: "/menus",
          name: "Menus",
          component: () =>
            import(
              // @ts-ignore
              /* webpackChunkName: "menus" */ "./views/Menus.vue"
            ),
        },
        {
          path: "/menu/:menuId",
          name: "Menu",
          component: () =>
            import(
              // @ts-ignore
              /* webpackChunkName: "menu" */ "./views/Menu.vue"
            ),
        },
        {
          path: "/recipes",
          name: "Recipes",
          component: () =>
            import(
              // @ts-ignore
              /* webpackChunkName: "recipes" */ "./views/Recipes.vue"
            ),
        },
        {
          path: "/costing",
          name: "Costing",
          component: () =>
            import(
              // @ts-ignore
              /* webpackChunkName: "costing" */ "./views/Costing.vue"
            ),
        },
        {
          path: "/ingredient",
          name: "AddNewIng",
          component: () =>
            import(
              // @ts-ignore
              /* webpackChunkName: "new-ingredient" */ "./views/AddNewIng.vue"
            ),
        },
        {
          path: "/edit-screens",
          name: "EditScreens",
          component: () =>
            import(
              // @ts-ignore
              /* webpackChunkName: "edit-screens" */ "./views/screens/EditScreens.vue"
            ),
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
