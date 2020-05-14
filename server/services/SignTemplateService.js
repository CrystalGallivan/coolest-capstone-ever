import mongoose from 'mongoose'
import { Timestamp } from 'mongodb'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _daysSchema = new Schema({
  monday: { type: Boolean, default: false },
  tuesday: { type: Boolean, default: false },
  wednesday: { type: Boolean, default: false },
  thursday: { type: Boolean, default: false },
  friday: { type: Boolean, default: false },
  saturday: { type: Boolean, default: false },
  sunday: { type: Boolean, default: false }
})
let _allergensSchema = new Schema({
  egg: { type: Boolean, default: false },
  wheat: { type: Boolean, default: false },
  dairy: { type: Boolean, default: false },
  milk: { type: Boolean, default: false },
  soy: { type: Boolean, default: false },
  nuts: { type: Boolean, default: false },
  treeNuts: { type: Boolean, default: false },
  shellfish: { type: Boolean, default: false },
  corn: { type: Boolean, default: false },
  vegan: { type: Boolean, default: false },
  vegetarian: { type: Boolean, default: false },
  glutenFree: { type: Boolean, default: false }
})
let _menuItemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  calories: { type: String },
  price: { type: String },
  protein: { type: String },
  portionSize: { type: String },
  allergens: [_allergensSchema],
  category: { type: String, enum: ["Base", "Protein", "Toppings", "Add On"] },
  order: { type: Number },
  hide: { type: Boolean, default: false },
})
let _menuOptionSchema = new Schema({
  title: { type: String },
  description: { type: String }
})
let _signTemplateSchema = new Schema({
  title: { type: String },
  subTitle: { type: String },
  icon: { data: Buffer, contentType: String },
  menuItem: [_menuItemSchema],
  menuOption: [_menuOptionSchema],
  scheduledHours: { type: Date, default: Date.now },
  category: { type: String, enum: ['Global1', 'Global2', 'Global3', 'Grill', 'Grill Breakfast', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice',], required: true },
  screen: { type: String, required: true },
  order: { type: Number, required: true },
  kitchenId: { type: ObjectId, ref: 'Site[kitchens]', required: true }
}, { timestamps: true })


export default class SignTemplateService {
  get repository() {
    return mongoose.model('SignTemplate', _signTemplateSchema)
  }
}