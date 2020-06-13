import SignTemplateService from "../services/SignTemplateService";
import express from "express";
import mongodb from "mongodb";
import { Authorize } from "../middlewear/authorize";

let _service = new SignTemplateService();
let _signTemplateRepo = _service.repository;

//PUBLIC
export default class SignTemplateController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:category", this.getByCategory)
      .get("/:id", this.getById)
      .use(Authorize.authenticated)
      // .get('/:kitchenId', this.getByKitchen)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getAll(req, res, next) {
    try {
      // req.siteId = mongodb.ObjectID(req.query.siteId)
      let data = await _signTemplateRepo.find();
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      // req.siteId = mongodb.ObjectID(req.query.siteId);
      let data = await _signTemplateRepo.findOne({ _id: req.params.id });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getByCategory(req, res, next) {
    try {
      // req.siteId = mongodb.ObjectID(req.query.siteId);
      let data = await _signTemplateRepo.find({
        category: req.params.category,
      });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.siteId = mongodb.ObjectID(req.query.siteId);
      req.body.siteId = mongodb.ObjectID(req.query.siteId);
      req.body.authorId = req.session.uid;
      let data = await _signTemplateRepo.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      req.siteId = mongodb.ObjectID(req.query.siteId);
      let data = await _signTemplateRepo.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (data) {
        return res.send(data);
      }
      throw new Error("Invalid Id");
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      req.siteId = mongodb.ObjectID(req.query.siteId);
      await _signTemplateRepo.findOneAndRemove({
        _id: req.params.id,
      });
      return res.send("Successfully Deleted");
    } catch (error) {
      next(error);
    }
  }
}
