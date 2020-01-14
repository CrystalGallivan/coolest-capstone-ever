import MenuService from '../services/MenuService'
import CategoryService from '../services/CategoryService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

//import service and create an instance
let _service = new MenuService()
let _menuRepo = _service.repository
let _categoryRepo = new CategoryService().repository


//PUBLIC
export default class MenuController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/categories', this.getMenuCategories)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      // NOTE Not sure if this populate will work
      let data = await _menuRepo.find({ kitchenId: req.params.id }).populate('comments.authorId')
      return res.send(data)
    } catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await _menuRepo.findOne({ _id: req.params.id, kitchenId: req.params.id })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getMenuCategories(req, res, next) {
    try {
      let data = await _categoryRepo.find({ menuId: req.params.id })
      return res.send(data)
    } catch (err) { next(err) }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _menuRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _menuRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("Invalid Id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await _menuRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully Deleted")
    } catch (error) { next(error) }
  }
}


