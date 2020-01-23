import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _commentsSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
})

let _categorySchema = new Schema({
  title: { type: String, enum: ['Global', 'Grill', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice', 'General'], required: true },
  menuRecipes: [],
  menuId: { type: ObjectId, ref: 'Menu', required: true },
})

let _menuSchema = new Schema({
  week: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  days: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true }],
  categories: [_categorySchema],
  comments: [_commentsSchema],
  authorId: { type: ObjectId, ref: 'User', required: true },
  kitchenId: { type: ObjectId, ref: 'Site', required: true }
}, { timestamps: true })

// //CASCADE ON DELETE FOR MENUS
// _menuSchema.pre('findOneAndRemove', function (next) {
//   // @ts-ignore
//   let menuId = this._conditions._id //THIS IS THE MENU
//   Promise.all([
//     _categoryRepo.deleteMany({ menuId })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default class MenuService {
  get repository() {
    return mongoose.model('Menu', _menuSchema)
  }
}