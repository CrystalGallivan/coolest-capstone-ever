import CategoryService from "../services/CategoryService"
import RecipeService from '../services/RecipeService'
import express from 'express'
import { Authorize } from "../middlewear/authorize"
import MenuService from "../services/MenuService";

let _service = new CategoryService()
let _categoryRepo = _service.repository
let _recipeRepo = new RecipeService().repository
let _menuRepo = new MenuService().repository


//PUBLIC 

export default class CategoryController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('/:id/recipes', this.getCategoryRecipes)
      .post('', this.createCategory)
      .put('/:id', this.editCategory)
      .delete('/:id', this.deleteCategory)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getCategoryRecipes(req, res, next) {
    try {
      let data = await _recipeRepo.find({ categoryId: req.params.id }).populate('comments.authorId')
      return res.send(data)
    } catch (error) { console.error(error) }
  }

  async createCategory(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _categoryRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async editCategory(req, res, next) {
    try {
      let data = await _categoryRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async deleteCategory(req, res, next) {
    try {
      await _categoryRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

}