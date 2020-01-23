import express from 'express'
import { Authorize } from '../middlewear/authorize'
import mongodb from 'mongodb'
import SiteService from '../services/SiteService'

//import service and create an instance
let _service = new SiteService()
let _serviceRepo = _service.repository


//PUBLIC
export default class SiteController {

  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated) //move back to top after admin
      .get('', this.getAllSites)
      .post('', this.create)
      .put('/:id', this.edit)
      .get('/:id/users', this.getSiteUsers)
      .get('/:id', this.getSitesForUser)
      .post('/:id/users', this.addSiteUser)
      // .get('/:id/kitchens', this.getUsersKitchensBySite)
      // .get('/:id/kitchens/:id/menus', this.getMenusByKitchen)
      // TODO Setup up admin functionality of add a user to a kitchen & get users by kitchen
      // .put('/:id/kitchens', this.addKitchenUser)
      // .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAllSites(req, res, next) {
    try {
      let data = await _serviceRepo.find()
      return res.send(data)
    } catch (err) { next(err) }
  }

  // async getMenusByKitchen(req, res, next) {
  //   try {
  //     // NOTE Not sure if this populate will work
  //     let data = await _menuRepo.find({ kitchenId: req.params.kitchenId }).populate('comments.authorId')
  //     return res.send(data)
  //   } catch (err) { next(err) }
  // }


  async create(req, res, next) {
    try {
      req.body.userId = req.session.uid
      let data = await _serviceRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let siteReq = await _service._findUserSite(req.params.id, req.session.uid)

      let data = await _serviceRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("Invalid Id")
    } catch (error) { next(error) }
  }

  // TODO Setup admin functionality to cascade delete if they delete a site
  // async delete(req, res, next) {
  //   try {
  //     TODO Make is so that only admins can delete kitchens w/cascade delete
  //     if (await _serviceRepo.find({ $or: [{ _userId: req.params.id }] })) {
  //       await _serviceRepo.findOneAndRemove({ _id: req.params.id })
  //       return res.send("Successfully Deleted")
  //     }
  //   } catch (error) { next(error) }
  // }

  async getSiteUsers(req, res, next) {
    try {
      req.body.siteId = new mongodb.ObjectID(req.query.siteId)
      let siteReq = await _service._findUserSite(req.session.uid)
      // req.params.id,
      // @ts-ignore
      if (siteReq.siteUser.role != "admin") { throw new Error("Invalid Access") }
      let users = await _service.findAllSiteUsers(req.params.id)
      res.send(users)
    } catch (err) { next(err) }
  }

  async getSitesForUser(req, res, next) {
    try {
      // req.body.siteId = mongodb.ObjectID(req.query.siteId)
      let sites = await _service.findUserSites(req.session.uid)
      // if (user) { throw new Error("Invalid Access") }
      // let siteReq = await _service._findUserSite(req.params.id, req.session.uid)
      res.send(sites)
    } catch (err) { next(err) }
  }

  async addSiteUser(req, res, next) {
    try {
      let siteUser = await _service.addSiteUser(req.params.id, req.session.uid, req.body)
      res.send(siteUser)
    } catch (err) { next(err) }
  }




}

