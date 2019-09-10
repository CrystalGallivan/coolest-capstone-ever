var mongoose = require('mongoose')
const Schema = mongoose.Schema

let _schema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, enum: ['bakery', 'dairy', 'frozen', 'meat', 'produce', 'storeroom'], required: true },
  brand: { type: String },
  productNumber: { type: String },
  unit: { type: String },
  itemCost: { type: String, required: true },
  distributor: []
})



// export default
class CostedIngredientService {
  get repository() {
    return mongoose.model('CostedIngredients', _schema)
  }
}
module.exports = CostedIngredientService