import mongoose from 'mongoose'
const Schema = mongoose.Schema
// const ObjectId = Schema.Types.ObjectId


let _schema = new Schema({
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: []
})



export default class MenuService {
  get repository() {
    return mongoose.model('Menu', _schema)
  }
}