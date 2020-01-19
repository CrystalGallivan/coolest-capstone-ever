import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


let _ingredientSchema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, enum: ['bakery', 'dairy', 'frozen', 'meat', 'produce', 'storeroom'] },
  brand: { type: String },
  productNumber: { type: String },
  quantity: { type: Number },
  unit: { type: String, enum: ['OZ', 'EA'] },
  itemCost: { type: Number },
  // packageSize: { type: String },
  // packageCost: { type: String },
  distributor: []
  // otherOrderList: { type: ObjectId, ref: 'Inventory', required: true },
  // mainOrderList: { type: ObjectId, ref: 'Inventory', required: true }
})

let _subRecipeSchema = new Schema({
  station: { type: String, enum: ['Global', 'Grill', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice', 'General'], required: true },
  // side: { type: String, enum: ['Yes', 'No'] },
  name: { type: String, required: true },
  portions: { type: Number, required: true },
  portionSize: { type: Number },
  portionUnit: { type: String, enum: ['OZ', 'EA'] },
  recipeIngredients: [_ingredientSchema],
  costPerRecipe: { type: Number, required: true },
  calories: { type: Number },
  allergens: [],
  siteId: { type: ObjectId, ref: 'Site', required: true },
  salesPrice: { type: Number, required: true },
  menuDescription: { type: String },
  instructions: { type: String }
  //costPerPortion
})

let _commentsSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
})

let _menuRecipeSchema = new Schema({
  station: { type: String, enum: ['Global', 'Grill', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice', 'General'], required: true },
  // side: { type: String, enum: ['Yes', 'No'] },
  name: { type: String, required: true },
  portions: { type: Number, required: true },
  portionSize: { type: Number },
  portionUnit: { type: String, enum: ['OZ', 'EA'] },
  recipeIngredients: [_ingredientSchema],
  costPerRecipe: { type: Number, required: true },
  calories: { type: Number },
  allergens: [],
  salesPrice: { type: Number, required: true },
  subRecipe: [_subRecipeSchema],
  comments: [_commentsSchema],
  siteId: { type: ObjectId, ref: 'Site', required: true },
  kitchenId: { type: ObjectId, ref: 'Site', required: true },
  menuId: { type: ObjectId, ref: 'Menu', required: true },
  categoryId: { type: ObjectId, ref: 'Category', required: true }
  //costPerPortion
})

let _categorySchema = new Schema({
  title: { type: String, enum: ['Global', 'Grill', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice', 'General'], required: true },
  menuRecipes: [_menuRecipeSchema],
  authorId: { type: ObjectId, ref: 'User', required: true },
  siteId: { type: ObjectId, ref: 'Site', required: true },
  kitchenId: { type: ObjectId, ref: 'User', required: true },
  menuId: { type: ObjectId, ref: 'Menu', required: true },
}, { timestamps: true })


let _menuSchema = new Schema({
  week: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  days: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true }],
  categories: [_categorySchema],
  comments: [_commentsSchema],
  authorId: { type: ObjectId, ref: 'User', required: true },
  siteId: { type: ObjectId, ref: 'Site', required: true },
  kitchenId: { type: ObjectId, ref: 'User', required: true }
  // monday: { type: Boolean, default: false },
  // tuesday: { type: Boolean, default: false },
  // wednesday: { type: Boolean, default: false },
  // thursday: { type: Boolean, default: false },
  // friday: { type: Boolean, default: false },
  // saturday: { type: Boolean, default: false },
  // sunday: { type: Boolean, default: false },
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