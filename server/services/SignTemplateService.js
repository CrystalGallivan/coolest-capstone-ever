import mongoose from 'mongoose'
import { Timestamp } from 'mongodb'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _daysSchema = new Schema({
  monday: { type: String },
  tuesday: { type: String },
  wednesday: { type: String },
  thursday: { type: String },
  friday: { type: String },
  saturday: { type: String },
  sunday: { type: String }
})
let _allergensSchema = new Schema({
  egg: { type: String },
  wheat: { type: String },
  dairy: { type: String },
  milk: { type: String },
  soy: { type: String },
  nuts: { type: String },
  treeNuts: { type: String },
  shellfish: { type: String },
  fish: { type: String },
  corn: { type: String },
  vegan: { type: String },
  vegetarian: { type: String },
  glutenFree: { type: String }
})
let _menuItemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  calories: { type: String },
  price: { type: String },
  protein: { type: String },
  portionSize: { type: String },
  allergens: { _allergensSchema },
  days: { _daysSchema },
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