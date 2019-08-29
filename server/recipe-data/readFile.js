var connection = require('../db/dbconfig')
var RecipeService = require('../Services/RecipeService')

let fs = require('fs')

let data = fs.readFileSync("recipe.json")
var recipe = JSON.parse(data.toString());


class Recipe {
  constructor(data) {
    try {
      if (!data.name || !data.station) {
        throw new Error("MISSING NAME or STATION")
      }
      this.name = data.name
      if (data.station == "Salad") {
        data.station = "Salad Bar"
      }
      this.station = data.station
      this.portions = data.portions || 0
      if (data.portionUnit == "Grams") {
        this.portionUnit = "OZ"
        this.portionSize = data.portionSize * 0.035274
      } else {
        this.portionUnit = data.portionUnit || "OZ"
        this.portionSize = data.portionSize || 0
      }
      this.side = data.side || 'No'
      // let ingredient = []
      // this.recipeIngredients = ingredient.forEach(i => {
      //   let itemName = data.itemName
      //   let quantity = data.quantity
      //   let unit = data.unit
      //   ingredient.push({ itemName, quantity, unit })
      // });

      this.costPerRecipe = data.costPerRecipe || 0
      this.calories = data.calories || 0
      this.allergens = data.allergens || []
      this.siteId = "5d63f5351b746556dc60cce6"
      this.salesPrice = data.salesPrice || 0
      // if (!data.item || !data.category) {
      //   throw new Error("STOP EVERYTHING")
      // }
      // this.recipeIngredients.itemName = data.item
      // if (data.recipeIngredients.category == "bread") {
      //   data.recipeIngredients.category = "bakery"
      // }
      // if (data.recipeIngredients.category == "freezer") {
      //   data.recipeIngredients.category = "frozen"
      // }
      // this.recipeIngredients.category = data.recipeIngredients.category
      // this.brand = data.recipeIngredients.brand || "Unknown"
      // this.recipeIngredients.productNumber = data.recipeIngredients.productId || "#N/A"
      // this.recipeIngredients.unit = data.unit || ""
      // this.recipeIngredients.packageSize = data.recipeIngredients['pack-size'] || ""
      // this.recipeIngredients.packageCost = data.recipeIngredients['full-price'] || ""
    } catch (e) {
      console.error(e)
    }
  }
}

var recipeData = recipe.map(f => new Recipe(f))

var service = new RecipeService()

connection.once('open', () => {
  console.log("Connected to DB");

  createFood()
})

async function createFood() {
  try {
    console.log("STARTING DB WRITES");

    var docs = recipeData.map(f => {
      return service.repository.create(f)
    })
    var recipeDocs = await Promise.all(docs)
    console.log(recipeDocs)
    console.log("IT IS DONE");
  } catch (e) {
    console.error(e)
  }
}

