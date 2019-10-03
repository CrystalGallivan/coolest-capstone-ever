var connection = require('../db/dbconfig')
var MasterIngredientService = require('../Services/MasterIngredientService')
var CostedIngredientService = require('../Services/CostedIngService')

let fs = require('fs')

let data = fs.readFileSync("food.json")
var food = JSON.parse(data.toString());


class Food {
  constructor(data) {
    try {

      // if (!data.item || !data.category) {
      //   throw new Error("STOP EVERYTHING")
      // }
      // this.itemName = data.item
      // if (data.category == "bread") {
      //   data.category = "bakery"
      // }
      // if (data.category == "freezer") {
      //   data.category = "frozen"
      // }
      // this.category = data.category
      // this.brand = data.brand || "Unkown"
      // this.productNumber = data.productId || "#N/A"
      // this.unit = data.unit || ""
      // this.packageSize = data['pack-size'] || ""
      // this.packageCost = data['full-price'] || ""
      if (!data.itemName || !data.category) {
        throw new Error("STOP EVERYTHING")
      }
      this.itemName = data.itemName
      if (data.category == "bread") {
        data.category = "bakery"
      }
      if (data.category == "freezer") {
        data.category = "frozen"
      }
      this.category = data.category
      this.brand = data.brand || "Unkown"
      this.productNumber = data.productId || "#N/A"
      this.unit = data.unit || ""
      this.itemCost = data.itemCost || 0
      // this.packageSize = data['pack-size'] || ""
      // this.packageCost = data['full-price'] || ""
    } catch (e) {
      console.error(e)
    }
  }
}

var foodData = food.map(f => new Food(f))
function seperatePackage(string) {
  // console.log(string)
  //TODO Needs futher evaluation for various cases
  let dict = {}
  if (string.includes('/') && string.includes(' ')) {
    //string coming in looks like "12/12 EA"
    let array = string.split('/').join(" ").split(" ")
    dict["fullCase"] = array[0]
    dict["fullPackage"] = array[1]
    dict["unit"] = array[2]
  } else if (!string.includes(' ') && string.includes('/')) {
    // strings that look like 12/12EA
    let arr = string.split('/').join(" ").split(" ")
    dict["fullCase"] = arr[0]
    dict["fullPackage"] = arr[1].split(/[a-z]/gi).shift()
    dict["unit"] = arr[1].split(/[0-9]/gi).pop()
  } else if (!string.includes(' ')) {
    let arr = string.split(/[a-z]/gi)
    dict["fullCase"] = arr[0]
    dict["unit"] = arr[2]
  }
  else {
    // strings that look like 12 EA
    let array = string.split(" ")
    dict["fullCase"] = array[0]
    dict["unit"] = array[1]
  }
  return dict
}

function totalCost(str) {
  // console.log(str)
  let pkgCost = str.split("$").join('')
  return pkgCost
}

function costPer(fullPackage, fullPrice) {
  // console.log(fullPackage, fullPrice)
  let costEA = 0
  let sPDict = seperatePackage(fullPackage)
  let pCost = totalCost(fullPrice)
  if (sPDict.fullPackage) {
    let fullPkg = +sPDict.fullCase * +sPDict.fullPackage
    costEA = +pCost / fullPkg
  } else {
    let Pkg = +sPDict.fullCase * 16
    let costOZ = +pCost / Pkg
    return costOZ.toFixed(2)
  }

  return costEA.toFixed(2)
  // console.log(costEA)
}

function calculateCost(size, cost) {
  if (size && cost) {
    return costPer(size, cost)
  }
  return 0
}

// var service = new MasterIngredientService()
var serviceCosted = new CostedIngredientService()
connection.once('open', () => {
  console.log("Connected to DB");
  // createCostedFood()
  createFood()
})

async function createFood() {
  try {
    console.log("STARTING DB WRITES");
    foodData.sort(function (a, b) { return (a.itemName).localeCompare(b.itemName) })

    var docs = foodData.map(f => {
      return serviceCosted.repository.create(f)
    })
    // sort(function (a, b) {
    //   return (a.station).localeCompare(b.station);
    // });

    var foodDocs = await Promise.all(docs)
    console.log(foodDocs)
    console.log("IT IS DONE");
  } catch (e) {
    console.error(e)
  }
}
async function createCostedFood() {
  try {
    var excpetions = []
    console.log("STARTING DB WRITES");
    foodData.forEach(i => {
      var size = i.packageSize
      var cost = i.packageCost
      i.itemCost = calculateCost(size, cost) || 0
      // if (i.itemCost == NaN) {
      //   foodData.splice(i, 1)
      //   excpetions.push(i)
      // }
    })
    foodData.sort(function (a, b) { return (a.itemName).localeCompare(b.itemName) });
    var docs = foodData.map(f => {
      return serviceCosted.repository.create(f)
    })
    var foodDocs = await Promise.all(docs)
    console.log(foodDocs)
    // console.log(excpetions)
    console.log("IT IS DONE");
  } catch (e) {
    console.error(e)
  }
}





