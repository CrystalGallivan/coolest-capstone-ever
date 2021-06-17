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
    day: '',
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
    activeSign2: {},
    activeItem: {},
    activeOption: {},
    signIsScheduled: false,
    signIsScheduled2: false,
    menuItemsOfTheDay: [],
    menuItemsOfTheDay2: [],
    mode: 'cafe17c',
    loading: false,
    rerender: false,
    isLogged: false,
    wrongCreds: false,
    currentTime: {
      currentDate: new Date(),
      currentHour: new Date().getHours(),
      currentMinute: new Date().getMinutes()
    }
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
    setSignIsScheduled2(state, signIsScheduled2) {
      state.signIsScheduled2 = signIsScheduled2;
    },
    setMenuItemsOfTheDay(state, menuItemsOfTheDay) {
      state.menuItemsOfTheDay = menuItemsOfTheDay;
    },
    setMenuItemsOfTheDay2(state, menuItemsOfTheDay2) {
      state.menuItemsOfTheDay2 = menuItemsOfTheDay2;
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
      //TODO  change to Vue.set()
      state.activeRecipe.recipeIngredients[payload.i] = payload.ing;
    },
    editActiveSubRecipe(state, payload) {
      //TODO  change to Vue.set()

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
    setActiveSign2(state, activeSign2) {
      state.activeSign2 = activeSign2;
    },
    setActiveItem(state, activeItem) {
      state.activeItem = activeItem;
    },
    setActiveOption(state, activeOption) {
      state.activeOption = activeOption;
    },
    setStationRecipes(state, stationRecipes) {
      state.stationRecipes = stationRecipes;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setRerender(state, rerender) {
      state.rerender = rerender;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setIsLogged(state, isLogged) {
      state.isLogged = isLogged;
    },
    setWrongCreds(state, wrongCreds) {
      state.wrongCreds = wrongCreds
    },
    setCurrentTime(state, currentTime) {
      state.currentTime = currentTime;
    }
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
          commit("setIsLogged", true);
          dispatch("getAllSites");
          dispatch("getUserSites", user._id);
          dispatch("loadLastSite");
        })
        .catch((res) => {
          if (this.state.isLogged == false) {
            router.push({ name: "Login" });
          }
        });
    },
    login({ commit, dispatch }, creds) {
      auth.post("login", creds).then((res) => {
        commit("setUser", res.data);
        commit("setIsLogged", true);
        commit("setWrongCreds", false);
        dispatch("getUserSites", res.data._id);
      })
        .catch((res) => {
          commit("setWrongCreds", true)
        });
    },
    logout({ commit, dispatch }, creds) {
      commit("setIsLogged", false);
      localStorage.removeItem("KM__lastsite");
      localStorage.removeItem("KM__lastkitchen");
      auth.delete("logout", creds).then((res) => {
        commit("setUser", {});
        window.location.reload();
        router.push({ name: "Login" });
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
        // console.log(res);
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
        let cSiteRoute = router.currentRoute.name
        localStorage.setItem("KM__lastsite", siteId);
        commit("setSite", siteId);
        commit("setSiteSelectorStatus", false);
        dispatch("getSiteById", siteId);
        // dispatch("getBlogs");
        // dispatch("getCostedIngredients");
        dispatch("getRecipes");
        // dispatch("getMenus");
        router.push({ name: cSiteRoute })
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
    loadLastKitchen({ dispatch, commit, getters }) {
      let kitchen = getters.getActiveKitchen;
      let kitchenId = localStorage.getItem("KM__lastkitchen");
      if (kitchenId) {
        commit("setKitchenId", kitchenId);
      }
      if (kitchen) {
        dispatch("setActiveKitchen", kitchen);
      }
    },
    setActiveKitchen({ commit, dispatch }, kitchen) {
      try {
        localStorage.setItem("KM__lastkitchen", kitchen._id);
        commit("setActiveKitchen", kitchen);
        if (router.currentRoute.path == "/login" && this.state.isLogged == true) {
          router.push({ name: "Communication" });
        }
      } catch (err) {
        console.error(err);
      }
    },
    changeKitchen({ commit, dispatch }) {
      commit("setKitchenSelectorStatus", true);
    },
    async selectKitchen({ commit, dispatch, getters }, kitchenId) {
      try {
        let cKitchenRoute = router.currentRoute.name
        let kitchen = getters.getActiveKitchen(kitchenId);
        localStorage.setItem("KM__lastkitchen", kitchenId);
        let siteId = localStorage.getItem("KM__lastsite");
        commit("setKitchenSelectorStatus", false);
        commit("setKitchenId", kitchenId);
        dispatch("getSiteById", siteId);
        dispatch("setActiveKitchen", kitchen);
        if (kitchen.name == "Cafe 17C") {
          commit("setMode", "cafe17c")
        } else if (kitchen.name == "Cafe 36") {
          commit("setMode", "cafe36")
        }
        router.push({ name: cKitchenRoute })
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
        commit("setLoading", true)
        let res = await api.get("menus");
        commit("setMenus", res.data);
      }
      catch (err) {
        console.error(err);
      } finally {
        commit("setLoading", false)
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
        let menuId = menu._id
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
        if (error.message == "timeout of 30000ms exceeded") {
          // dispatch("getRecipes");
        } else {
          console.error(error);
        }
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
        if (recipes.length >= 0) {
          let res = await api.get("recipes/id/" + Recipe.id + SID);
          commit("setActiveRecipe", res.data);
        } else {
          let res = {};
          for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            if (recipe._id == Recipe.id) {
              res = recipe;
            }
          }
          commit("setActiveRecipe", res);
        }
        // dispatch("getRecipes");
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
    async getAllSigns({ commit, getters }) {
      try {
        commit("setLoading", true)
        let res = await api.get("signs");
        res.data.sort((a, b) => {
          if (a.order > b.order) {
            return 1;
          } else {
            return -1;
          }
        })
        commit("setSigns", res.data)
        commit("setLoading", false)
      } catch (error) {
        console.error(error);
      }
    },
    setActiveSign({ commit, dispatch }, sign) {
      commit("setActiveSign", sign);
    },

    async getSignsByCategory({ commit, getters }, payload) {
      try {
        commit("setLoading", true)
        let sign = getters.getSignTemplate(
          payload.category,
          payload.kitchenName
        );
        let kitchenId = getters.currentKitchen;
        let signs = [];
        if (sign) {
          if (sign.category == "Pizza" || sign.category == "Grill") {
            commit("setActiveSign2", sign);

          } else {
            if (sign.category != "Grill Breakfast") {
              commit("setActiveSign2", '');
            }
            commit("setActiveSign", sign);
          }
        } else {
          let res = await api.get("signs/" + payload.category);
          signs = res.data;
          for (let i = 0; i < signs.length; i++) {
            const sign = signs[i];
            if (sign.kitchenName == payload.kitchenName) {
              if (sign.category == "Pizza" || sign.category == "Grill") {
                commit("setActiveSign2", sign)

              } else {
                if (sign.category != "Grill Breakfast") {
                  commit("setActiveSign2", '');
                }
                commit("setActiveSign", sign);
              }
            }
          }
        }
        commit("setLoading", false)
      } catch (error) {
        console.error(error);
      }
    },
    async checkForUpdatedSign({ commit, getters }, category) {
      try {
        let signs = [];
        let kitchenId = getters.currentKitchen;
        let res = await api.get("signs/" + category);
        signs = res.data;
        for (let i = 0; i < signs.length; i++) {
          const sign = signs[i];
          if (sign.kitchenId == kitchenId) {
            if (sign.category == "Pizza" || sign.category == "Grill") {
              commit("setActiveSign2", sign)

            } else {
              if (sign.category != "Grill Breakfast") {
                commit("setActiveSign2", '');
              }
              commit("setActiveSign", sign);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async setSign({ commit, getters }, sign) {
      try {
        // let sign = getters.getSignTemplate(signId);
        if (sign) {
          commit("setActiveSign", sign);
        }
        // else {
        //   let res = await api.get("signs/id/" + signId + SID);
        //   commit("setActiveSign", res.data);
        // }
      } catch (error) {
        console.error(error);
      }
    },
    async editSign({ commit, dispatch }, sign) {
      try {
        await api.put("signs/" + sign._id + SID, sign);
        commit("setActiveSign", sign);
        commit("setRerender", true);
        commit("setActiveItem", sign.menuItem[0] ? sign.menuItem[0] : sign.menuOption[0]);
        dispatch("getAllSigns");
      } catch (error) {
        console.error(error);
      }
    },
    setMenuItem({ commit, dispatch }, item) {
      commit("setActiveItem", item);
    },
    setMenuOption({ commit, dispatch }, option) {
      commit("setActiveOption", option);
    },
    getDay({ commit, getters }) {
      let day = getters.setDay;
      commit("setDay", day)
    },
    checkIfScheduled({ commit, dispatch, getters }) {
      let scheduled = getters.scheduled;
      let scheduled2 = getters.scheduled2;
      commit("setSignIsScheduled", scheduled)
      commit("setSignIsScheduled2", scheduled2)
    },
    getMenuItemsOfTheDay({ commit, dispatch, getters }) {
      let day = getters.setDay;
      commit("setDay", day)
      let menuItemsOfTheDay = getters.scheduledMenuItems;
      let menuItemsOfTheDay2 = getters.scheduledMenuItems2;
      commit("setMenuItemsOfTheDay", menuItemsOfTheDay)
      commit("setMenuItemsOfTheDay2", menuItemsOfTheDay2)
    },
    resetSignState({ commit }) {
      commit("setActiveSign", undefined)
      commit("setActiveSign2", undefined)
    }

    //#endregion
  },
  getters: {
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
      return day;
    },
    currentMenuItems: (state) => {
      if (state.activeSign._id) {
        return state.activeSign.menuItem;
      }
    },
    currentMenuItems2: (state) => {
      if (state.activeSign2._id) {
        return state.activeSign2.menuItem;
      }
    },
    scheduledMenuItems: (state, getters) => {
      if (state.activeSign._id && state.day.length > 0) {
        let menuItems = getters.currentMenuItems;
        let currentDay = state.day;
        if (menuItems) {
          let scheduledMenuItems = [];
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
          scheduledMenuItems.sort((a, b) => {
            if (a.order > b.order) {
              return 1;
            } else {
              return -1;
            }
          })
          return scheduledMenuItems
        }
        // TODO SORT ON ORDER
        // return scheduledMenuItems.sort(function (a, b) { return a - b })
      }
    },
    scheduledMenuItems2: (state, getters) => {
      if (state.activeSign2._id && state.day.length > 0) {
        let menuItems2 = getters.currentMenuItems2;
        let currentDay = state.day;
        if (menuItems2) {
          let scheduledMenuItems = [];
          for (let i = 0; i < menuItems2.length; i++) {
            let menuItem = menuItems2[i];
            let days = menuItem.days;
            for (let j = 0; j < days.length; j++) {
              let d = days[j];
              let day = d.day;
              if (day == currentDay && d.checked == true) {
                scheduledMenuItems.push(menuItem);
              }
            }
          }
          scheduledMenuItems.sort((a, b) => {
            if (a.order > b.order) {
              return 1;
            } else {
              return -1;
            }
          })
          return scheduledMenuItems;
        }
        // TODO SORT ON ORDER
        // return scheduledMenuItems.sort(function (a, b) { return a - b })
      }
    },
    getSignTemplate: (state) => (category, kitchenName) => {
      if (state.signs.length > 0) {
        let sign = state.signs.find(
          (sign) =>
            (sign._id == category && state.kitchenId == sign.kitchenId) ||
            (sign.category == category && sign.kitchenName == kitchenName)
        );
        return sign;
      }
    },
    currentTime: (state) => {
      state.currentTime.currentDate = new Date();
      state.currentTime.currentHour = new Date().getHours();
      state.currentTime.currentMinute = new Date().getMinutes();
      return;
    },
    scheduledTime: (state) => {
      let scheduledTime = {
        startHour: state.activeSign.startHour,
        startMinute: state.activeSign.startMinute,
        endHour: state.activeSign.endHour,
        endMinute: state.activeSign.endMinute,
        startHour2: state.activeSign2.startHour,
        startMinute2: state.activeSign2.startMinute,
        endHour2: state.activeSign2.endHour,
        endMinute2: state.activeSign2.endMinute
      }
      return scheduledTime;

    },
    scheduled: (state, getters) => {
      var currentDate = state.currentTime;
      let scheduledTime = getters.scheduledTime;
      let currentHour = state.currentTime.currentHour;
      let currentMinute = state.currentTime.currentMinute;
      let scheduled = state.signIsScheduled;
      if (state.activeSign._id) {
        let startHour = scheduledTime.startHour
        let startMinute = scheduledTime.startMinute
        let endHour = scheduledTime.endHour
        let endMinute = scheduledTime.endMinute
        if (currentHour == startHour && currentMinute >= startMinute) {
          // state.loading = true;
          (scheduled = true);
        } else if (currentHour == endHour && currentMinute == endMinute) {
          // state.loading = true;
          (scheduled = true);
        } else if (currentHour > startHour && currentMinute > startMinute && currentHour < endHour) {
          // state.loading = true;
          (scheduled = true);
        } else {
          // state.loading = false;
          (scheduled = false);
        }
      }
      return scheduled
    },
    scheduled2: (state, getters) => {
      var currentDate = state.currentTime;
      let scheduledTime = getters.scheduledTime;
      let currentHour = state.currentTime.currentHour;
      let currentMinute = state.currentTime.currentMinute;
      let scheduled = state.signIsScheduled;
      if (state.activeSign2._id) {
        let startHour = scheduledTime.startHour2
        let startMinute = scheduledTime.startMinute2
        let endHour = scheduledTime.endHour2
        let endMinute = scheduledTime.endMinute2
        if (currentHour == startHour && currentMinute >= startMinute) {
          // state.loading = true;
          (scheduled = true);
        } else if (currentHour == endHour && currentMinute == endMinute) {
          // state.loading = true;
          (scheduled = true);
        } else if (currentHour > startHour && currentMinute > startMinute && currentHour < endHour) {
          // state.loading = true;
          (scheduled = true);
        } else {
          // state.loading = false;
          (scheduled = false);
        }
      }
      return scheduled
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
    menuOptions: (state) => {
      let menuOptions = state.activeSign.menuOption;
      return menuOptions;
    },
    generalMenuItems: (state, getters) => {
      let generalMenuItems = [];
      let menuItems = [];

      if (state.activeSign2.menuItem) {
        menuItems = getters.scheduledMenuItems2;
        if (menuItems) {
          for (let i = 0; i < menuItems.length; i++) {
            const menuItem = menuItems[i];
            if (menuItem.category == "General") {
              generalMenuItems.push(menuItem);
            }
          }
        }
      } else {
        let menuItems = getters.scheduledMenuItems;
        if (menuItems) {
          for (let i = 0; i < menuItems.length; i++) {
            const menuItem = menuItems[i];
            if (menuItem.category == "General") {
              generalMenuItems.push(menuItem);
            }
          }
        }
      }
      generalMenuItems.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else {
          return -1;
        }
      })
      return generalMenuItems;
    },
    specialMenuItems: (state, getters) => {
      let specialMenuItems = []; let menuItems = []
      if (state.activeSign.category == "Chef's Choice" || state.activeSign.category == "Grill Breakfast") {
        let menuItems = getters.scheduledMenuItems2;
        if (menuItems) {
          for (let i = 0; i < menuItems.length; i++) {
            const menuItem = menuItems[i];
            if (menuItem.category == "Special") {
              specialMenuItems.push(menuItem);
            }
          }
        }
      } else {
        let menuItems = getters.scheduledMenuItems;
        if (menuItems) {
          for (let i = 0; i < menuItems.length; i++) {
            const menuItem = menuItems[i];
            if (menuItem.category == "Special") {
              specialMenuItems.push(menuItem);
            }
          }
        }
      }
      specialMenuItems.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else {
          return -1;
        }
      })
      return specialMenuItems;
    },
    baseMenuItems: (state, getters) => {
      let baseMenuItems = [];
      let menuItems = getters.scheduledMenuItems;
      if (menuItems) {
        for (let i = 0; i < menuItems.length; i++) {
          const menuItem = menuItems[i];
          if (menuItem.category == "Base") {
            baseMenuItems.push(menuItem);
          }
        }
      }
      if (state.activeSign.category == "Southwest") {
        if (baseMenuItems.length > 0) {
          let baseSectionMenuItems = {
            baseSection1: [],
            baseSection2: [],
            baseSection3: []
          }
          for (let i = 0; i < baseMenuItems.length; i++) {
            const menuItem = baseMenuItems[i];
            if (menuItem.order === 1 || menuItem.order === 2 || menuItem.order === 3) {
              baseSectionMenuItems.baseSection1.push(menuItem);
            } else if (menuItem.order === 4 || menuItem.order === 5) {
              baseSectionMenuItems.baseSection2.push(menuItem);
            } else {
              baseSectionMenuItems.baseSection3.push(menuItem);
            }

          }
          baseSectionMenuItems.sort((a, b) => {
            if (a.order > b.order) {
              return 1;
            } else {
              return -1;
            }
          })
          return baseSectionMenuItems;
        }
      }
      baseMenuItems.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else {
          return -1;
        }
      })
      return baseMenuItems;
    },
    sauceMenuItems: (state, getters) => {
      let sauceMenuItems = [];
      let menuItems = getters.scheduledMenuItems;;
      if (menuItems) {
        for (let i = 0; i < menuItems.length; i++) {
          const menuItem = menuItems[i];
          if (menuItem.category == "Sauce") {
            sauceMenuItems.push(menuItem);
          }
        }
      }
      sauceMenuItems.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else {
          return -1;
        }
      })
      return sauceMenuItems;
    },
    proteinMenuItems: (state, getters) => {
      let proteinMenuItems = [];
      let menuItems = getters.scheduledMenuItems;
      if (menuItems) {
        for (let i = 0; i < menuItems.length; i++) {
          const menuItem = menuItems[i];
          if (menuItem.category == "Protein") {
            proteinMenuItems.push(menuItem);
          }
        }
      }
      proteinMenuItems.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else {
          return -1;
        }
      })
      return proteinMenuItems;
    },
    toppingsMenuItems: (state, getters) => {
      let toppingsMenuItems = [];
      let menuItems = getters.scheduledMenuItems;
      if (menuItems) {
        for (let i = 0; i < menuItems.length; i++) {
          const menuItem = menuItems[i];
          if (menuItem.category == "Toppings") {
            toppingsMenuItems.push(menuItem);
          }
        }
      }
      toppingsMenuItems.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else {
          return -1;
        }
      })
      return toppingsMenuItems;
    },
    addOnMenuItems: (state, getters) => {
      let addOnMenuItems = [];
      let menuItems = getters.scheduledMenuItems;
      if (menuItems) {
        for (let i = 0; i < menuItems.length; i++) {
          const menuItem = menuItems[i];
          if (menuItem.category == "Add On") {
            addOnMenuItems.push(menuItem);
          }
        }
      }
      addOnMenuItems.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else {
          return -1;
        }
      })
      return addOnMenuItems;
    },
    getActiveKitchen: (state) => (kitchenId) => {
      let activeKitchen = "";
      let kitchens = state.kitchens;
      if (kitchens) {
        for (let i = 0; i < kitchens.length; i++) {
          const kitchen = kitchens[i];
          if (kitchen._id == kitchenId) {
            return kitchen;
          }
        }
      }
    },
    kitchen: (state) => {
      let kitchens = state.kitchens
      let kitchen = state.mode
      let kitchenName = ''
      if (kitchen == "cafe17c") {
        kitchenName = "Cafe 17C"
      } else if (kitchen == "cafe36") {
        kitchenName = "Cafe 36"
      }
      if (kitchens.length > 0) {
        for (let i = 0; i < kitchens.length; i++) {
          const k = kitchens[i];
          if (k.name == kitchenName) {
            return k
          }
        }
      }
    },
    // getFirstTrue: (state, getters) => {
    //   debugger
    //   let firstTrue = []
    //   let menuItems = []
    //   switch (getters) {
    //     case getters.baseMenuItems:
    //       if (getters.baseMenuItems > 0) { menuItems = getters.baseMenuItems }
    //       break;
    //     case getters.proteinMenuItems:
    //       if (getters.proteinMenuItems > 0) { menuItems = getters.proteinMenuItems }
    //       break;
    //     case getters.generalMenuItems:
    //       if (getters.generalMenuItems > 0) { menuItems = getters.generalMenuItems }
    //       break;
    //     case getters.specialMenuItems:
    //       if (getters.specialMenuItems > 0) { menuItems = getters.specialMenuItems }
    //       break;
    //     case getters.sauceMenuItems:
    //       if (getters.sauceMenuItems > 0) { menuItems = getters.sauceMenuItems }
    //       break;
    //     case getters.toppingsMenuItems:
    //       if (getters.toppingsMenuItems > 0) { menuItems = getters.toppingsMenuItems }
    //       break;
    //     case getters.addOnMenuItems:
    //       if (getters.addOnMenuItems > 0) { menuItems = getters.addOnMenuItems }
    //       break;
    //   }
    //   menuItems.forEach(item => {
    //     let allergens = item.allergens;
    //     let first = false;
    //     if (item.category == "Special" || "General") {
    //       for (let i = 0; i < allergens.length; i++) {
    //         const allergen = allergens[i];
    //         if (allergen.checked == true && first == false) {
    //           first = true;
    //           firstTrue.push(allergen.allergen)
    //         }
    //       }
    //     }
    //   });
    // if (state.menuItemsOfTheDay2.length > 0) {
    //   let menuItems = state.menuItemsOfTheDay2
    //   menuItems.forEach(item => {
    //     let allergens = item.allergens;
    //     let first = false;
    //     if (item.category == "Special" || "General") {
    //       for (let i = 0; i < allergens.length; i++) {
    //         const allergen = allergens[i];
    //         if (allergen.checked == true && first == false) {
    //           first = true;
    //           firstTrue.push(allergen.allergen)
    //         }
    //       }
    //     }
    //   });
    // } else if (state.menuItemsOfTheDay.length > 0) {
    //   let menuItems = state.menuItemsOfTheDay
    //   menuItems.forEach(item => {
    //     let allergens = item.allergens;
    //     let first = false;
    //     if (item.category == "Special" || "General") {
    //       for (let i = 0; i < allergens.length; i++) {
    //         const allergen = allergens[i];
    //         if (allergen.checked == true && first == false) {
    //           first = true;
    //           firstTrue.push(allergen.allergen)
    //         }
    //       }
    //     }
    //   });
    // }
    //   return firstTrue;
    // },

  },
});
