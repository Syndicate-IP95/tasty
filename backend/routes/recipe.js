const { getAll } = require("../controllers/recipe/recipe");

const recipeRouter = {
  "/recipe/all": {
    GET: (req, res) => getAll(req, res),
  },
};

module.exports = recipeRouter;
