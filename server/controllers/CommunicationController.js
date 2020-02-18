import CommunicationService from '../services/CommunicationService'
import express from 'express'
import mongodb from 'mongodb'
import { Authorize } from '../middlewear/authorize'

let _service = new CommunicationService()
let _communicationRepo = _service.repository

export default class CommunicationController {

    constructor() {
        this.router = express.Router()
            .use(Authorize.authenticated) //move back to top after functioning
            .get('', this.getAll)
            // .get('/:id', this.getById)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
            .use(this.defaultRoute)
    }

    defaultRoute(req, res, next) {
        next({ status: 404, message: 'no such route' })
    }

    async getAll(req, res, next) {
        try {
            req.siteId = mongodb.ObjectID(req.query.siteId)
            // let siteId = req.query.siteId
            let data = await _communicationRepo.find({ siteId: req.query.siteId })
            return res.send(data)
        } catch (err) { next(err) }
    }

    // async getById(req, res, next) {
    //     try {
    //         let siteId = req.query.siteId
    //         let data = await _communicationRepo.findOne({ siteId, _id: req.params.id, authorId: req.session.uid })
    //         return res.send(data)
    //     } catch (error) { next(error) }
    // }

    async create(req, res, next) {
        try {
            req.body.siteId = mongodb.ObjectID(req.query.siteId)
            req.body.authorId = req.session.uid
            let data = await _communicationRepo.create(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            req.body.siteId = mongodb.ObjectID(req.query.siteId)
            req.body.authorId = req.session.uid
            let data = await _communicationRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            return res.send(data)
        } catch (err) { next(err) }
    }

    async delete(req, res, next) {
        try {
            req.siteId = mongodb.ObjectID(req.query.siteId)
            req.body.authorId = req.session.uid
            await _communicationRepo.findOneAndRemove({ _id: req.params.id })
            return res.send("Successfully Deleted")
        } catch (err) { next(err) }
    }
}