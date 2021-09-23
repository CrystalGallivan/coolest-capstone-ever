import BugReportingService from '../services/BugReportingService'
import express from 'express'
import mongodb from 'mongodb'
import { Authorize } from '../middlewear/authorize'
import SiteService from "../services/SiteService";

let _service = new BugReportingService()
let _siteService = new SiteService()
let _bugReportingRepo = _service.repository

export default class BugReportingController {

  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated) //move back to top after functioning
      .get('', this.getAll)
      // .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      // .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'no such route' })
  }

  async getAll(req, res, next) {
    try {
      req.siteId = mongodb.ObjectID(req.query.siteId)
      // let siteId = req.query.siteId
      let siteReq = await _siteService._findUserSite(req.session.uid);
      let data = await _bugReportingRepo.find({ siteId: req.query.siteId })
      if (siteReq.siteUser.role = "admin" || "site_admin") {
        return res.send(data)
      } else { throw new Error("Invalid Access") }
    } catch (err) { next(err) }
  }

  // async getById(req, res, next) {
  //     try {
  //         let siteId = req.query.siteId
  //         let data = await _bugReportingRepo.findOne({ siteId, _id: req.params.id, authorId: req.session.uid })
  //         return res.send(data)
  //     } catch (error) { next(error) }
  // }

  async create(req, res, next) {
    try {
      req.body.siteId = mongodb.ObjectID(req.query.siteId)
      req.body.createdBy = req.session.uid
      let data = await _bugReportingRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      req.body.siteId = mongodb.ObjectID(req.query.siteId)
      req.body.updatedBy = req.session.uid
      let siteReq = await _siteService._findUserSite(req.session.uid);
      let data = await _bugReportingRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      // NOTE Sending the right data to edit it but it is not changing/editing the data
      if (siteReq.siteUser.role == "admin" || "site_admin" || data.createdBy == req.session.uid) {
        return res.send(data)
      }
    } catch (err) { next(err) }
  }

  // async delete(req, res, next) {
  //   try {
  //     req.siteId = mongodb.ObjectID(req.query.siteId)
  //     req.body.authorId = req.session.uid
  //     await _bugReportingRepo.findOneAndRemove({ _id: req.params.id })
  //     return res.send("Successfully Deleted")
  //   } catch (err) { next(err) }
  // }
}