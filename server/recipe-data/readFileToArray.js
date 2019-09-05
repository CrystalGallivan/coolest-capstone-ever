var connection = require('../db/dbconfig')
var RecipeService = require('../Services/RecipeService')

let fs = require('fs')

let data = fs.readFileSync("ingredient.json")
var ingredient = JSON.parse(data.toString());


class Ingredient {
  constructor(data) {
    try {
      if (data.Name == ) { }
      this.name = data.Name
      if (data.itemName == "" || data.itemName.includes("()")) {
        this.itemName = data.itemName

      }
    } catch (e) {
      console.error(e)
    }
  }
}

var foodData = ingredient.map(f => new Ingredient(f))

var service = new RecipeService()

connection.once('open', () => {
  console.log("Connected to DB");

  createFood()
})

async function createFood() {
  try {
    console.log("STARTING DB WRITES");

    var docs = foodData.map(f => {
      return service.repository.create(f)
    })
    var foodDocs = await Promise.all(docs)
    console.log(foodDocs)
    console.log("IT IS DONE");
  } catch (e) {
    console.error(e)
  }
}
