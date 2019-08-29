let xlsxj = require("xlsx-to-json");
xlsxj({
  input: "final-recipes.xlsx",
  output: "recipe.json"
}, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});