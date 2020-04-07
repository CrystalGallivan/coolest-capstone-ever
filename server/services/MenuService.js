import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
var moment = require('moment');
// moment().format('MM Do YYYY');

let _commentsSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
})

let _categorySchema = new Schema({
  title: { type: String, enum: ['Global', 'Grill', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice', 'General'], required: true },
  menuRecipes: [],
  dayId: { type: ObjectId, ref: 'Menu.days', required: true },
})

let _daysSchema = new Schema({
  name: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
  breakfast: [_categorySchema],
  lunch: [_categorySchema],
})

let _menuSchema = new Schema({
  week: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  days: [_daysSchema],
  comments: [_commentsSchema],
  authorId: { type: ObjectId, ref: 'User', required: true },
  kitchenId: { type: ObjectId, ref: 'Site[kitchens]', required: true }
}, { timestamps: true })


export default class MenuService {
  get repository() {
    return mongoose.model('Menu', _menuSchema)
  }
}