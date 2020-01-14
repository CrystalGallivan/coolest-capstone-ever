import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

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
  authoreId: { type: ObjectId, ref: 'User', required: true }
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
  siteId: { type: ObjectId, ref: 'Site', required: true },
  salesPrice: { type: Number, required: true },
  subRecipe: [_subRecipeSchema],
  comments: [_commentsSchema],
  //costPerPortion
})

let _categorySchema = new Schema({
  title: { type: String, enum: ['Global', 'Grill', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice', 'General'], required: true },
  menuRecipes: [_menuRecipeSchema],
  authorId: { type: ObjectId, ref: 'User', required: true },
  kitchenId: { type: ObjectId, ref: 'User', required: true },
  menuId: { type: ObjectId, ref: 'Menu', required: true },
}, { timestamps: true })

// //CASCADE ON DELETE FOR CATEGORIES
// _categorySchema.pre('findOneAndRemove', function (next) {
//   // @ts-ignore
//   let categoryId = this._conditions._id //THIS IS THE CATEGORY
//   Promise.all([
//     _menuRecipeRepo.deleteMany({ categoryId })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default class CategoryService {
  get repository() {
    return mongoose.model('Category', _categorySchema)
  }
}