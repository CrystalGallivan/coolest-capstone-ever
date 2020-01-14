import MenuRecipeService from '../services/MenuRecipeService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

let _service = new MenuRecipeService()
let _menuRecipeRepo = _service.repository



export default class MenuRecipeController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .post('', this.createMenuRecipe)
      .put('/:id', this.editMenuRecipe)
      .delete('/:id', this.deleteMenuRecipe)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async createMenuRecipe(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _menuRecipeRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async editMenuRecipe(req, res, next) {
    try {
      let data = await _menuRecipeRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async deleteMenuRecipe(req, res, next) {
    try {
      await _menuRecipeRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

}
