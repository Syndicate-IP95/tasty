const { getAll, saveRecipe } = require("../controllers/recipe/recipe");

const recipeRouter = {
  "/recipe/all": {
    GET: (req, res) => getAll(req, res),
  },
  "/recipe/save": {
    POST: (req, res) => saveRecipe(req, res),
  },
};

module.exports = recipeRouter;
