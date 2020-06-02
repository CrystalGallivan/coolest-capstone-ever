import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "./router";
import { STATES } from "mongoose";

Vue.use(Vuex);
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true,
});

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 30000,
  withCredentials: true,
});

let SID = "?siteId=";

export default new Vuex.Store({
  state: {
    users: [],
    kitchenUsers: [],
    user: {},
    allSites: [],
    userSites: {
      mySites: [],
      memberSites: [],
    },
    site: {},
    siteId: "",
    kitchenId: "",
    day: "",
    openSiteSelector: false,
    openKitchenSelector: false,
    blogs: [],
    menus: [],
    activeMenu: {},
    activeDay: {},
    activeCategory: {},
    activeSite: {},
    recipes: [],
    stationRecipes: [],
    activeRecipe: {},
    costedIngredients: [],
    masterIngredients: [],
    kitchens: [],
    activeKitchen: {},
    signs: [],
    activeSign: {},
    activeItem: {},
    signIsScheduled: false,
    menuItemsOfTheDay: [],
    loading: false,
    rerender: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setAllSites(state, allSites) {
      state.allSites = allSites;
    },
    setUserSites(state, userSites) {
      state.userSites = userSites;
      if (state.siteId) {
        state.site =
          state.userSites.memberSites.find((s) => s._id == state.siteId) ||
          state.userSites.mySites.find((s) => s._id == state.siteId);
      }
    },
    setActiveSite(state, activeSite, kitchenId) {
      state.activeSite = activeSite;
      if (activeSite.memberSites.length > 0 && activeSite.mySites.length > 0) {
        let kitchens = {
          memberKitchens: activeSite.memberSites[0].kitchens,
          myKitchens: activeSite.mySites[0].kitchens,
        };
        state.kitchens = kitchens;
      } else if (activeSite.memberSites.length > 0) {
        state.kitchens = activeSite.memberSites[0].kitchens;
      } else {
        state.kitchens = activeSite.mySites[0].kitchens;
      }
    },
    setSite(state, siteId) {
      SID = "?siteId=" + siteId;
      state.siteId = siteId;
      // if (state.userSites.memberSites || state.userSites.mySites) {
      //   state.site = state.userSites.memberSites.find(s => s._id == siteId) || state.userSites.mySites.find(s => s._id == siteId)
      // }
    },
    setDay(state, day) {
      state.day = day;
    },
    setSignIsScheduled(state, signIsScheduled) {
      state.signIsScheduled = signIsScheduled;
    },
    setMenuItemsOfTheDay(state, menuItemsOfTheDay) {
      state.menuItemsOfTheDay = menuItemsOfTheDay;
    },
    setSiteSelectorStatus(state, status) {
      state.openSiteSelector = status;
    },
    setKitchenSelectorStatus(state, status) {
      state.openKitchenSelector = status;
    },
    setKitchenId(state, kitchenId) {
      state.kitchenId = kitchenId;
    },
    setActiveKitchen(state, activeKitchen) {
      state.activeKitchen = activeKitchen;
    },
    setRecipes(state, recipes) {
      state.recipes = recipes.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      );
    },
    setActiveRecipe(state, activeRecipe) {
      state.activeRecipe = activeRecipe;
    },
    setActiveRecipeIngredient(state, newIngredient) {
      state.activeRecipe.recipeIngredients.push(newIngredient);
    },
    setActiveSubRecipe(state, subRecipe) {
      state.activeRecipe.subRecipe.push(subRecipe);
    },
    editActiveRecipeIngredient(state, payload) {
      state.activeRecipe.recipeIngredients[payload.i] = payload.ing;
    },
    editActiveSubRecipe(state, payload) {
      state.activeRecipe.subRecipe[payload.r] = payload.sr;
    },
    resetRecipe(state) {
      state.activeRecipe = {};
    },
    setCostedIngredients(state, costedIngredients) {
      state.costedIngredients = costedIngredients;
    },
    setBlogs(state, blogs) {
      state.blogs = blogs;
    },
    setMenus(state, menus) {
      state.menus = menus;
    },
    setActiveMenu(state, activeMenu) {
      state.activeMenu = activeMenu;
    },
    setActiveDay(state, activeDay) {
      state.activeDay = activeDay;
    },
    setActiveCategory(state, activeCategory) {
      state.activeCategory = activeCategory;
    },
    setMasterIngredients(state, masterIngredients) {
      state.masterIngredients = masterIngredients;
    },
    setKitchens(state, kitchens) {
      state.kitchens = kitchens;
    },
    setKitchenUsers(state, kitchenUsers) {
      state.kitchenUsers = kitchenUsers;
    },
    setSigns(state, signs) {
      state.signs = signs;
    },
    setActiveSign(state, activeSign) {
      state.activeSign = activeSign;
    },
    setActiveItem(state, activeItem) {
      state.activeItem = activeItem;
    },
    setStationRecipes(state, stationRecipes) {
      state.stationRecipes = stationRecipes;
    },
    setRerender(state, rerender) {
      state.rerender = rerender;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    //#region -- Auth Stuff --
    register({ commit, dispatch }, newUser) {
      auth.post("register", newUser).then((res) => {
        commit("setUser", res.data);
        router.push({ name: "Login" });
      });
    },
    authenticate({ commit, dispatch }) {
      auth
        .get("authenticate")
        .then((res) => {
          let user = res.data;
          commit("setUser", user);
          dispatch("getAllSites");
          dispatch("getUserSites", user._id);
          dispatch("loadLastSite");
          if (router.currentRoute.path == "/login") {
            router.push({ name: "Home" });
          }
        })
        .catch((res) => {
          router.push({ name: "Login" });
        });
    },
    login({ commit, dispatch }, creds) {
      auth.post("login", creds).then((res) => {
        commit("setUser", res.data);
        dispatch("getUserSites", res.data._id);
      });
    },
    logout({ commit, dispatch }, creds) {
      localStorage.removeItem("KM__lastsite");
      localStorage.removeItem("KM__lastkitchen");
      auth.delete("logout", creds).then((res) => {
        commit("setUser", {});
        window.location.reload();
      });
    },
    //#endregion

    //#region -- Admin/Users --
    async selectAdminUser({ commit, dispatch }, siteId) {
      try {
        commit("setSite", siteId._id);
        dispatch("getAllUsersBySite", siteId._id);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllUsersBySite({ commit, dispatch }, siteId) {
      try {
        let res = await api.get("sites/" + siteId + "/users");
        console.log(res);
        commit("setUsers", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editUser({ commit, dispatch }, payload) {
      try {
        await api.put("auth/" + SID + payload._id, payload);
        commit("setUser", payload.data);
        dispatch("getSiteUsers");
      } catch (error) {
        console.error(error);
      }
    },
    setKitchenUsers({ commit, dispatch }, users) {
      try {
        commit("setKitchenUsers", users);
      } catch (error) {
        console.error(error);
      }
    },
    deleteUser({ commit, dispatch }, userId) {
      api.delete("auth/" + SID + userId).then((res) => {
        dispatch("getSiteUsers");
      });
    },
    //#endregion

    //#region -- Site --
    async getAllSites({ commit, dispatch }) {
      try {
        let res = await api.get("sites");
        commit("setAllSites", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getUserSites({ commit, dispatch }, userId) {
      try {
        let res = await api.get("sites/" + userId);
        commit("setUserSites", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getSiteById({ commit, dispatch }, siteId) {
      try {
        let kitchenId = localStorage.getItem("KM__lastkitchen");
        let res = await api.get("sites/" + siteId);
        commit("setActiveSite", res.data);
        if (!this.state.activeKitchen._id) {
          let site = res.data;
          let kitchens = [];
          if (site.memberSites.length > 0 && site.mySites.length > 0) {
            let kitchens = {
              memberKitchens: site.memberSites[0].kitchens,
              myKitchens: site.mySites[0].kitchens,
            };
            kitchens = kitchens;
          } else if (site.memberSites.length > 0) {
            kitchens = site.memberSites[0].kitchens;
          } else {
            kitchens = site.mySites[0].kitchens;
          }
          if (kitchenId && kitchens.length > 0) {
            for (let i = 0; i < kitchens.length; i++) {
              let kitchen = kitchens[i];
              if (kitchen._id == kitchenId) {
                dispatch("setActiveKitchen", kitchen);
              }
            }
          }
        }
        // }
      } catch (error) {
        console.error(error);
      }
    },
    changeSite({ commit, dispatch }) {
      commit("setSiteSelectorStatus", true);
    },
    closeSiteSelector({ commit, dispatch }) {
      commit("setSiteSelectorStatus", false);
    },
    async selectSite({ commit, dispatch }, siteId) {
      try {
        localStorage.setItem("KM__lastsite", siteId);
        commit("setSite", siteId);
        commit("setSiteSelectorStatus", false);
        dispatch("getSiteById", siteId);
        // dispatch("getBlogs");
        // dispatch("getCostedIngredients");
        // dispatch("getRecipes");
        // dispatch("getMenus");
      } catch (error) {
        console.error(error);
      }
    },
    loadLastSite({ dispatch, commit }) {
      let siteId = localStorage.getItem("KM__lastsite");
      if (siteId && siteId != this.state.siteId) {
        dispatch("selectSite", siteId);
        dispatch("getSiteById", siteId);
      }
    },
    async selectAdminSite({ commit, dispatch }, siteId) {
      try {
        commit("setSite", siteId);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- Kitchens --
    async kitchens({ commit, dispatch }, kitchen) {
      try {
        localStorage.setItem("KM__lastkitchen", kitchen);

        commit("setKitchens", kitchen);
      } catch (error) {
        console.error(error);
      }
    },
    loadLastKitchen({ dispatch, commit }) {
      let kitchenId = localStorage.getItem("KM__lastkitchen");
      if (kitchenId) {
        commit("setKitchenId", kitchenId);
      }
    },
    setActiveKitchen({ commit, dispatch }, kitchen) {
      try {
        localStorage.setItem("KM__lastkitchen", kitchen._id);
        commit("setActiveKitchen", kitchen);
        if (router.currentRoute.path == "/login") {
          router.push({ name: "Communication" });
        }
      } catch (err) {
        console.error(err);
      }
    },
    changeKitchen({ commit, dispatch }) {
      commit("setKitchenSelectorStatus", true);
    },
    async selectKitchen({ commit, dispatch }, kitchenId) {
      try {
        localStorage.setItem("KM__lastkitchen", kitchenId);
        let siteId = localStorage.getItem("KM__lastsite");
        commit("setKitchenSelectorStatus", false);
        dispatch("getSiteById", siteId);
        // window.location.reload()
        // router.push({ name: 'EditScreens' })
        // TODO find a way to update signs on the edit screen after active kitchen has been switched

        // dispatch("getMenus")
      } catch (error) {
        console.error(error);
      }
    },
    closeKitchenSelector({ commit, dispatch }) {
      commit("setKitchenSelectorStatus", false);
    },
    //#endregion

    //#region --  Communication Stuff --
    async getBlogs({ commit, dispatch }) {
      try {
        let res = await api.get("blogs" + SID);
        commit("setBlogs", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async createBlog({ commit, dispatch }, newBlog) {
      try {
        await api.post("blogs" + SID, newBlog);
        dispatch("getBlogs", newBlog);
      } catch (error) {
        console.error(error);
      }
    },
    async editBlog({ commit, dispatch }, blogData) {
      try {
        await api.put("blogs/" + blogData.id + SID, blogData);
        dispatch("getBlogs");
      } catch (err) {
        console.error(err);
      }
    },
    deleteBlog({ commit, dispatch }, blogId) {
      api.delete("blogs/" + blogId + SID).then((res) => {
        dispatch("getBlogs");
      });
    },
    //#endregion

    //#region -- Menus Stuff --
    async getMenus({ commit, dispatch }) {
      try {
        let res = await api.get("menus");
        commit("setMenus", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    async getMenuById({ commit, dispatch }, menuId) {
      try {
        let res = await api.get("menus/" + menuId + SID);
        commit("setActiveMenu", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    async createMenu({ commit, dispatch }, newMenu) {
      try {
        let res = await api.post("menus" + SID, newMenu);
        dispatch("getMenus");
        commit("setActiveMenu", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    setActiveMenu({ commit, dispatch }, menu) {
      try {
        localStorage.setItem("KM__lastmenu", menu);
        commit("setActiveMenu", menu);
      } catch (err) {
        console.error(err);
      }
    },
    async editMenu({ commit, dispatch }, menu) {
      try {
        await api.put("menus/" + menu._id + SID, menu);
        dispatch("getMenus");
        dispatch("getMenuById", menu._id);
      } catch (err) {
        console.error(err);
      }
    },
    setActiveDay({ commit, dispatch }, day) {
      try {
        localStorage.setItem("KM__lastday", day);
        commit("setActiveDay", day);
      } catch (err) {
        console.error(err);
      }
    },
    setActiveCategory({ commit, dispatch }, category) {
      try {
        localStorage.setItem("KM__lastcategory", category);
        commit("setActiveCategory", category);
      } catch (err) {
        console.error(err);
      }
    },
    async deleteMenu({ commit, dispatch }, menuId) {
      try {
        await api.delete("menus/" + menuId + SID);
        dispatch("getMenus");
      } catch (err) {
        console.error(err);
      }
    },
    //#endregion

    //#region --  Recipes Stuff --
    async getRecipes({ commit, dispatch }) {
      try {
        let res = await api.get("recipes" + SID);
        commit("setRecipes", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getRecipesByStation({ commit, getters }, station) {
      try {
        let recipes = getters.recipesByStation(station);
        if (recipes.length > 0) {
          commit("setStationRecipes", recipes);
        } else {
          let res = await api.get("recipes/" + station + SID);
          commit("setStationRecipes", res.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async saveRecipe({ commit, dispatch }, newRecipe) {
      try {
        let res = await api.post("recipes" + SID, newRecipe);
        commit("setActiveRecipe", res.data);
        // router.push({ name: 'Recipes' })
        // dispatch('setRecipes')
      } catch (err) {
        console.error(err);
      }
    },
    async editRecipe({ commit, dispatch }, payload) {
      try {
        await api.put("recipes/" + payload._id + SID, payload);
        commit("resetRecipe");
        router.push({ name: "Recipes" });
      } catch (error) {
        console.error(error);
      }
    },
    async editRecipeInCosting({ commit, dispatch }, payload) {
      try {
        await api.put("recipes/" + payload._id + SID, payload);
        commit("setActiveRecipe", payload);
      } catch (error) {
        console.error(error);
      }
    },
    createActiveRecipe({ commit, dispatch }) {
      commit("resetRecipe");
      let newRecipe = {
        recipeIngredients: [],
        station: "",
        side: "",
        name: "",
        portions: "",
        portionSize: "",
        portionUnit: "",
        costPerRecipe: "",
        calories: "",
        allergens: [],
        salesPrice: "",
      };
      commit("setActiveRecipe", newRecipe);
      if (router.currentRoute.path == "/recipes") {
        router.push({ name: "Costing" });
      }
    },
    async ActiveRecipe({ commit, dispatch }, Recipe) {
      try {
        let recipes = this.state.recipes;
        let res = {};
        for (let i = 0; i < recipes.length; i++) {
          let recipe = recipes[i];
          if (recipe._id == Recipe.id) {
            res = recipe;
          }
        }
        commit("setActiveRecipe", res);
        dispatch("getRecipes");
        router.push({ name: "Costing" });
      } catch (error) {
        console.error(error);
      }
    },
    addSubRecipe({ commit, dispatch }, subRecipe) {
      commit("setActiveSubRecipe", subRecipe);
    },
    editSubRecipe({ commit, dispatch }, payload) {
      commit("editActiveSubRecipe", payload);
    },
    deleteRecipe({ commit, dispatch }, recipeId) {
      api.delete("recipes/" + recipeId + SID).then((res) => {
        dispatch("getRecipes");
      });
    },
    //#endregion

    //#region -- CostedIngredient Stuff --
    async getCostedIngredients({ commit, dispatch }) {
      try {
        let res = await api.get("costed");
        commit("setCostedIngredients", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addCostedIngredient({ commit, dispatch }, newIngredient) {
      try {
        let res = await api.post("costed" + SID, newIngredient);
        dispatch("getCostedIngredients", newIngredient);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- Ingredient Stuff --
    addIngredient({ commit, dispatch }, newIngredient) {
      commit("setActiveRecipeIngredient", newIngredient);
    },
    editIngredient({ commit, dispatch }, payload) {
      commit("editActiveRecipeIngredient", payload);
    },
    //#endregion

    //#region -- MasterIngredient Stuff --
    async getMasterIngredients({ commit, dispatch }) {
      try {
        let res = await api.get("ingredients");
        commit("setMasterIngredients", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addMasterIngredient({ commit, dispatch }, newIngredient) {
      try {
        let res = await api.post("ingredients" + SID, newIngredient);
        dispatch("getMasterIngredients", newIngredient);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
    //#region -- Signs --
    async getAllSigns({ commit, dispatch }) {
      try {
        let res = await api.get("signs");
        commit("setSigns", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    setActiveSign({ commit, dispatch }, sign) {
      commit("setActiveSign", sign);
    },
    async getSignsByCategory({ commit, getters }, category) {
      try {
        let sign = getters.getSignTemplate(category);
        let kitchenId = getters.currentKitchen;
        let signs = [];
        if (sign) {
          commit("setActiveSign", sign);
        } else {
          let res = await api.get("signs/" + category + SID);
          signs = res.data;
          for (let i = 0; i < signs.length; i++) {
            const sign = signs[i];
            if (sign.kitchenId == kitchenId) {
              commit("setActiveSign", sign);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getSignById({ commit, getters }, signId) {
      try {
        let sign = getters.getSignTemplate(signId);
        if (sign) {
          commit("setActiveSign", sign);
        } else {
          let res = await api.get("signs/" + signId + SID);
          commit("setActiveSign", res.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async editSign({ commit, dispatch }, sign) {
      try {
        await api.put("signs/" + sign._id + SID, sign);
        commit("setActiveSign", sign);
        commit("setRerender", true);
        commit("setActiveItem", sign.menuItem[0]);
        dispatch("getAllSigns");
      } catch (error) {
        console.error(error);
      }
    },
    setMenuItem({ commit, dispatch }, item) {
      commit("setActiveItem", item);
    },

    //#endregion
  },
  getters: {
    currentMenuItems: (state) => {
      if (state.activeSign._id) {
        return state.activeSign.menuItem;
      }
    },
    scheduledMenuItems: (state, getters) => {
      if (state.activeSign._id) {
        let menuItems = getters.currentMenuItems;
        let scheduledMenuItems = [];
        let currentDay = state.day;
        for (let i = 0; i < menuItems.length; i++) {
          let menuItem = menuItems[i];
          let days = menuItem.days;
          for (let j = 0; j < days.length; j++) {
            let d = days[j];
            let day = d.day;
            if (day == currentDay && d.checked == true) {
              scheduledMenuItems.push(menuItem);
            }
          }
        }
        return scheduledMenuItems;
        // TODO SORT ON ORDER
        // return scheduledMenuItems.sort(function (a, b) { return a - b })
      }
    },
    getSignTemplate: (state) => (category) => {
      if (state.signs.length > 0) {
        let sign = state.signs.find(
          (sign) =>
            sign.category == category ||
            (sign._id == category && state.kitchenId == sign.kitchenId)
        );
        return sign;
        // state.activeSign = sign
      }
    },
    scheduled: (state) => {
      var currentDate = new Date();
      let currentHour = currentDate.getHours();
      let currentMinute = currentDate.getMinutes();
      let scheduledStartTime = state.activeSign.beginningTime;
      let startTime = scheduledStartTime.split(new RegExp(":"));
      let startHour = Number(startTime[0]);
      let startMinute = Number(startTime[1]);
      let scheduledEndTime = state.activeSign.endingTime;
      let endTime = scheduledEndTime.split(new RegExp(":"));
      let endHour = Number(endTime[0]);
      let endMinute = Number(endTime[1]);
      if (currentHour == startHour && currentMinute >= startMinute) {
        state.loading = true;
        return (state.signIsScheduled = true);
      } else if (currentHour == endHour && currentMinute <= endMinute) {
        state.loading = true;
        return (state.signIsScheduled = true);
      } else if (
        currentHour > startHour &&
        currentMinute > startMinute &&
        currentHour < endHour
      ) {
        state.loading = true;
        return (state.signIsScheduled = true);
      } else {
        state.loading = true;
        return (state.signIsScheduled = false);
      }
    },
    setDay: (state) => {
      let day = "";
      switch (new Date().getDay()) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }
      return (state.day = day);
    },
    recipesByStation: (state) => (station) => {
      let recipes = state.recipes;
      let stationRecipes = [];
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (recipe.station == station) {
          stationRecipes.push(recipe);
        }
      }
      return stationRecipes;
    },
    signsLength: (state) => {
      let signsLength = state.signs.length;
      return signsLength;
    },
    currentKitchen: (state) => {
      let currentKitchen = state.kitchenId;
      return currentKitchen;
    },
  },
});
