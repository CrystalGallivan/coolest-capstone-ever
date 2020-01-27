import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import { ECONNABORTED } from 'constants'

Vue.use(Vuex)
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 10000,
  withCredentials: true
})

let SID = "?siteId="

export default new Vuex.Store({
  state: {
    users: [],
    user: {},
    allSites: [],
    userSites: {},
    site: {},
    siteId: "",
    open: false,
    blogs: [],
    menus: [],
    activeMenu: {},
    recipes: [],
    activeRecipe: {},
    costedIngredients: [],
    masterIngredients: [],
    // kitchens: [],
    activeKitchen: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setUsers(state, users) {
      state.users = users
    },
    setAllSites(state, allSites) {
      state.allSites = allSites
    },
    setUserSites(state, userSites) {
      state.userSites = userSites
      if (state.siteId) {
        state.site = state.userSites.memberSites.find(s => s._id == state.siteId) || state.userSites.mySites.find(s => s._id == state.siteId)
      }
    },
    setSite(state, siteId) {
      SID = "?siteId=" + siteId
      state.siteId = siteId
      if (state.userSites.memberSites) {
        state.site = state.userSites.memberSites.find(s => s._id == siteId) || state.userSites.mySites.find(s => s._id == siteId)
      }
    },
    setSiteSelectorStatus(state, status) {
      state.open = status
    },
    setActiveKitchen(state, activeKitchen) {
      state.activeKitchen = activeKitchen
    },
    setRecipes(state, recipes) {
      state.recipes = recipes.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
    },
    setActiveRecipe(state, activeRecipe) {
      state.activeRecipe = activeRecipe
    },
    setActiveRecipeIngredient(state, newIngredient) {
      state.activeRecipe.recipeIngredients.push(newIngredient)
    },
    setActiveSubRecipe(state, subRecipe) {
      state.activeRecipe.subRecipe.push(subRecipe)
    },
    editActiveRecipeIngredient(state, payload) {
      state.activeRecipe.recipeIngredients[payload.i] = payload.ing
    },
    editActiveSubRecipe(state, payload) {
      state.activeRecipe.subRecipe[payload.r] = payload.sr
    },
    resetRecipe(state) {
      state.activeRecipe = {}
    },
    setCostedIngredients(state, costedIngredients) {
      state.costedIngredients = costedIngredients
    },
    setBlogs(state, blogs) {
      state.blogs = blogs
    },
    setMenus(state, menus) {
      state.menus = menus
    },
    setActiveMenu(state, activeMenu) {
      state.activeMenu = activeMenu
    },
    setMasterIngredients(state, masterIngredients) {
      state.masterIngredients = masterIngredients
    },
  },
  actions: {

    //#region -- Auth Stuff --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Login' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          let user = res.data
          commit('setUser', user)
          dispatch('getAllSites')
          dispatch('getUserSites', user._id)
          dispatch('loadLastSite')
          // dispatch('loadLastMenu')
          if (router.currentRoute.path == '/login') {
            router.push({ name: "Communication" })
          }
        })
        .catch(res => { router.push({ name: 'Login' }) })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          dispatch('getUserSites', res.data._id)
        })
    },
    logout({ commit, dispatch }, creds) {
      localStorage.removeItem("KM__lastsite")
      auth.delete('logout', creds)
        .then(res => {
          commit('setUser', {})
          window.location.reload()
        })
    },
    //#endregion

    //#region -- Admin/Users --
    async selectAdminUser({ commit, dispatch }, siteId) {
      try {
        commit('setSite', siteId._id)
        dispatch('getAllUsersBySite', siteId._id)
      } catch (error) { console.error(error) }
    },
    async getAllUsersBySite({ commit, dispatch }, siteId) {
      try {
        let res = await api.get('sites/' + siteId + '/users')
        console.log(res)
        commit('setUsers', res.data)
      } catch (error) { console.error(error) }
    },
    async editUser({ commit, dispatch }, payload) {
      try {
        await api.put('auth/' + SID + payload._id, payload)
        commit('setUser', payload.data)
        dispatch('getSiteUsers')
      } catch (error) { console.error(error) }
    },
    deleteUser({ commit, dispatch }, userId) {
      api.delete('auth/' + SID + userId)
        .then(res => {
          dispatch('getSiteUsers')
        })
    },
    //#endregion

    //#region -- Site --
    async getAllSites({ commit, dispatch }) {
      try {
        let res = await api.get('sites')
        commit('setAllSites', res.data)
      } catch (error) { console.error(error) }
    },
    async getUserSites({ commit, dispatch }, userId) {
      try {
        let res = await api.get('sites/' + userId)
        commit('setUserSites', res.data)
      } catch (error) { console.error(error) }
    },
    changeSite({ commit, dispatch }) {
      commit('setSiteSelectorStatus', true)
    },
    async selectSite({ commit, dispatch }, siteId) {
      try {
        localStorage.setItem("KM__lastsite", siteId)
        commit('setSite', siteId)
        commit('setSiteSelectorStatus', false)
        dispatch("getBlogs")
        dispatch("getCostedIngredients")
        dispatch("getRecipes")
        if (router.currentRoute.path == '/login') {
          router.push({ name: 'Communication' })
        }
      } catch (error) { console.error(error) }
    },
    loadLastSite({ dispatch, commit }) {
      let siteId = localStorage.getItem("KM__lastsite")
      if (siteId) {
        dispatch('selectSite', siteId)
      }
    },
    async selectAdminSite({ commit, dispatch }, siteId) {
      try {
        commit('setSite', siteId)
      } catch (error) { console.error(error) }
    },
    //#endregion

    //#region -- Kitchens --
    setActiveKitchen({ commit, dispatch }, kitchen) {
      try {
        // localStorage.setItem("KM__lastkitchen", kitchen)
        commit('setActiveKitchen', kitchen)
      } catch (err) { console.error(err) }
    },
    //#endregion

    //#region --  Communication Stuff --
    async getBlogs({ commit, dispatch }) {
      try {
        let res = await api.get('blogs' + SID)
        commit('setBlogs', res.data)
      } catch (error) { console.error(error) }
    },
    async createBlog({ commit, dispatch }, newBlog) {
      try {
        await api.post('blogs' + SID, newBlog)
        dispatch('getBlogs', newBlog)
      } catch (error) { console.error(error) }
    },
    async editBlog({ commit, dispatch }, blogData) {
      try {
        await api.put('blogs/' + blogData.id + SID, blogData)
        dispatch('getBlogs')
      } catch (err) { console.error(err) }
    },
    deleteBlog({ commit, dispatch }, blogId) {
      api.delete('blogs/' + blogId + SID)
        .then(res => { dispatch('getBlogs') })
    },
    //#endregion

    //#region -- Menus Stuff -- 
    async getMenus({ commit, dispatch }) {
      try {
        let res = await api.get('menus')
        commit('setMenus', res.data)
      } catch (err) { console.error(err) }
    },
    async createMenu({ commit, dispatch }, newMenu) {
      try {
        debugger
        await api.post('menus' + SID, newMenu)
        dispatch('getMenus', newMenu)
      } catch (err) { console.error(err) }
    },
    setActiveMenu({ commit, dispatch }, menu) {
      try {
        localStorage.setItem("KM__lastmenu", menu)
        commit('setActiveMenu', menu)
      } catch (err) { console.error(err) }
    },
    // loadLastMenu({ dispatch, commit }) {
    //   let menu = localStorage.getItem("KM__lastmenu")
    //   dispatch('setActiveMenu')
    // },
    async editMenu({ commit, dispatch }, menu) {
      try {
        debugger
        await api.put('menus/' + menu._id + SID, menu)
        dispatch('getMenus')
      } catch (err) { console.error(err) }
    },
    async deleteMenu({ commit, dispatch }, menuId) {
      try {
        await api.delete('menus/' + menuId + SID)
        dispatch('getMenus')
      } catch (err) { console.error(err) }
    },
    //#endregion

    //#region --  Recipes Stuff --
    async getRecipes({ commit, dispatch }) {
      try {
        let res = await api.get('recipes' + SID)
        commit('setRecipes', res.data)
      } catch (error) { console.error(error) }
    },
    async getRecipesByStation({ commit, dispatch }, station) {
      try {
        let res = await api.get('recipes/' + station + SID)
        commit('setRecipes', res.data)
      } catch (error) { console.error(error) }
    },
    async saveRecipe({ commit, dispatch }, newRecipe) {
      try {
        let res = await api.post('recipes' + SID, newRecipe)
        commit('setActiveRecipe', res.data)
        // router.push({ name: 'Recipes' })
        // dispatch('setRecipes')
      } catch (err) { console.error(err) }
    },
    async editRecipe({ commit, dispatch }, payload) {
      try {
        await api.put('recipes/' + payload._id + SID, payload)
        commit("resetRecipe")
        router.push({ name: 'Recipes' })
      } catch (error) { console.error(error) }
    },
    async editRecipeInCosting({ commit, dispatch }, payload) {
      try {
        await api.put('recipes/' + payload._id + SID, payload)
        commit('setActiveRecipe', payload)
      } catch (error) { console.error(error) }
    },
    createActiveRecipe({ commit, dispatch }) {
      commit('resetRecipe')
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
        salesPrice: ""
      }
      commit('setActiveRecipe', newRecipe)
      if (router.currentRoute.path == '/recipes') {
        router.push({ name: "Costing" })
      }
    },
    // async ActiveRecipe({ commit, dispatch }, Recipe) {
    //   try {
    //     let res = await api.put('recipes/' + Recipe.id + SID, Recipe)
    //     commit('setActiveRecipe', res.data)
    //     dispatch('getRecipes')
    //     router.push({ name: 'Costing' })
    //   } catch (error) { console.error(error) }
    // },
    async ActiveRecipe({ commit, dispatch }, Recipe) {
      try {
        let recipes = this.state.recipes;
        let res = {};
        for (let i = 0; i < recipes.length; i++) {
          let recipe = recipes[i];
          if (recipe._id == Recipe.id) {
            res = recipe
          }
        }
        commit('setActiveRecipe', res)
        dispatch('getRecipes')
        router.push({ name: 'Costing' })
      } catch (error) { console.error(error) }
    },
    addSubRecipe({ commit, dispatch }, subRecipe) {
      commit('setActiveSubRecipe', subRecipe)
    },
    editSubRecipe({ commit, dispatch }, payload) {
      commit('editActiveSubRecipe', payload)
    },
    deleteRecipe({ commit, dispatch }, recipeId) {
      api.delete('recipes/' + recipeId + SID)
        .then(res => { dispatch('getRecipes') })
    },
    //#endregion

    //#region -- CostedIngredient Stuff --
    async getCostedIngredients({ commit, dispatch }) {
      try {
        let res = await api.get("costed")
        commit('setCostedIngredients', res.data)
      } catch (error) { console.error(error) }
    },
    async addCostedIngredient({ commit, dispatch }, newIngredient) {
      try {
        let res = await api.post('costed' + SID, newIngredient)
        dispatch('getCostedIngredients', newIngredient)
      } catch (error) { console.error(error) }
    },
    //#endregion

    //#region -- Ingredient Stuff --
    addIngredient({ commit, dispatch }, newIngredient) {
      commit('setActiveRecipeIngredient', newIngredient)
    },
    editIngredient({ commit, dispatch }, payload) {
      commit('editActiveRecipeIngredient', payload)
    },
    //#endregion

    //#region -- MasterIngredient Stuff --
    async getMasterIngredients({ commit, dispatch }) {
      try {
        let res = await api.get("ingredients")
        commit('setMasterIngredients', res.data)
      } catch (error) { console.error(error) }
    },
    async addMasterIngredient({ commit, dispatch }, newIngredient) {
      try {
        let res = await api.post('ingredients' + SID, newIngredient)
        dispatch('getMasterIngredients', newIngredient)
      } catch (error) { console.error(error) }
    },
    //#endregion
  }
})
