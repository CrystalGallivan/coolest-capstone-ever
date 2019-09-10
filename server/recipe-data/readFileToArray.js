var connection = require('../db/dbconfig')
var RecipeService = require('../Services/RecipeService')
var Recipe = require('../recipe-data/readFile')

let fs = require('fs')
let recipe = Recipe
let data = fs.readFileSync("ingredient.json")
var ingredient = JSON.parse(data.toString());


class Ingredient {
  constructor(data) {
    try {

      this.name = data.name
      if (data.quantity >= 0) {
        this.itemName = data.itemName
        this.quantity = data.quantity
      }

      // if (data.Name ==  ) { }
      // this.name = data.Name
      // if (data.itemName == "" || data.itemName.includes("()")) {
      //   this.itemName = data.itemName

      // }
    } catch (e) {
      console.error(e)
    }
  }
}
function mapToArray(data) {
  for (let i = 0; i < data.length; i++) {
    let ing = data[i]
    if (ing.quantity > 0) {

    }
  }
}
var foodData = ingredient.map(f => new Ingredient(f){})
var service = new RecipeService()

connection.once('open', () => {
  console.log("Connected to DB");

  createFood()
})
// console.log()
async function createFood() {
  try {
    console.log("STARTING DB WRITES");

    var docs = foodData.map(f => {
      // return service.repository.findOneAndUpdate(name, f)
      return service.repository.findOneAndUpdate(f.name, f)
    })
    var foodDocs = await Promise.all(docs)
    console.log(foodData)
    console.log("IT IS DONE");
  } catch (e) {
    console.error(e)
  }
}
