import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _ingredientSchema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, enum: ['bakery', 'dairy', 'frozen', 'meat', 'produce', 'storeroom'], required: true },
  brand: { type: String, required: true },
  productNumber: { type: Number, required: true },
  quantity: { type: Number },
  unit: { type: String, required: true },
  newItemCost: { type: Number },
  packageSize: { type: String },
  packageCost: { type: String }
  // otherOrderList: { type: ObjectId, ref: 'Inventory', required: true },
  // mainOrderList: { type: ObjectId, ref: 'Inventory', required: true }
})

let _schema = new Schema({
  station: { type: String, enum: ['Global', 'Grill', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice'], required: true },
  name: { type: String, required: true },
  portions: { type: Number, required: true },
  portionSize: { type: Number },
  ingredients: [_ingredientSchema],
  costPerRecipe: { type: Number, required: true },
  siteId: { type: ObjectId, ref: 'Site', required: true }
})




export default class RecipeService {
  get repository() {
    return mongoose.model('Recipe', _schema)
  }
}