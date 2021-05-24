//const { saveRecipe } = require("../controllers/recipe/recipe");
const { getAll, getByCategory, getByTag, getById, getByUserId } = require("../models/recipe");

const recipeRouter = {
	"^/recipes/$": {
		GET: () => getAll()
	},
	"^/recipes/\\?tag=\\w+": {
		GET: tag => getByTag(tag)
	},
	"^/recipes/\\?category=\\w+": {
		GET: category => getByCategory(category)
	},
	"^/recipes/\\?id=\\d+": {
		GET: id => getById(id)
	},
	"^/recipes/\\?user_id=\\d+": {
		GET: user_id => getByUserId(user_id)
	}
};

module.exports = recipeRouter;
