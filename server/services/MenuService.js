import mongoose from 'mongoose'
import CategoryService from './CategoryService'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _categoryRepo = new CategoryService().repository

let _commentsSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authoreId: { type: ObjectId, ref: 'User', required: true }
})

let _menuSchema = new Schema({
  week: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  monday: { type: Boolean, default: false },
  tuesday: { type: Boolean, default: false },
  wednesday: { type: Boolean, default: false },
  thursday: { type: Boolean, default: false },
  friday: { type: Boolean, default: false },
  saturday: { type: Boolean, default: false },
  sunday: { type: Boolean, default: false },
  comments: [_commentsSchema],
  authorId: { type: ObjectId, ref: 'User', required: true },
  kitchenId: { type: ObjectId, ref: 'User', required: true }
  // NOTE I don't know if this will give the right kitchenId
}, { timestamps: true })

//CASCADE ON DELETE FOR MENUS
_menuSchema.pre('findOneAndRemove', function (next) {
  // @ts-ignore
  let menuId = this._conditions._id //THIS IS THE MENU
  Promise.all([
    _categoryRepo.deleteMany({ menuId })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class MenuService {
  get repository() {
    return mongoose.model('Menu', _menuSchema)
  }
}