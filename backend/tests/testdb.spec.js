const { pool } = require("../db/database");
const Recipe = require("../models/recipe");

//creating recipes
const borshch = {
	user_id: 1,
	title: "Borshch",
	photo_url: "https://s1.1zoom.ru/b5251/832/Soups_Borscht_Plate_537691_1920x1080.jpg",
	rating: 4.21,
	category: "soup",
	tag: "ukrainian_cookery",
	ingredients: "ingredients",
	steps: "recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe "
};

const sushi = {
	user_id: 2,
	title: "Sushi",
	photo_url: "https://s1.1zoom.me/b5153/775/Seafoods_Sushi_Black_background_522771_2560x1440.jpg",
	rating: 4.25,
	category: "sushi",
	tag: "japanese_cookery",
	ingredients: "ingredients ingredients  ingredients  ingredients  ingredients ",
	steps: "recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe "
};

const pizza = {
	user_id: 2,
	title: "Sushi",
	photo_url:
		"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/f93e10588691489118b6e6ad70a8c538_screen.jpg?ts=1561460155",
	rating: 4.5,
	category: "sushi",
	tag: "italian_cookery",
	ingredients: "ingredients ingredients  ingredients  ingredients  ingredients ",
	steps: "recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe "
};

beforeEach(() => {
	await pool.query(`DELETE FROM recipes;`);
});

//test adding new recipes
test("adding new recipe works", async () => {
	let firstLength = await pool.query("SELECT * FROM recipes");
	firstLength = firstLength.rows.length;
	const newRecipe = new Recipe(borshch);
	await newRecipe.save();
	let secondLength = await pool.query("SELECT * FROM recipes");
	secondLength = secondLength.rows.length;
	expect(secondLength - firstLength).toBe(1);
});

//test getting all recipes from db
test("get all works", async () => {
	const Borshch = new Recipe(borshch);
	await Borshch.save();
	const Sushi = new Recipe(sushi);
	await Sushi.save();
	const recipes = await Recipe.getAll();
	expect(recipes.rows.length).toBe(2);
});

//test getting recipes from db by catagory
test("getByCategory works", async () => {
	const Borshch = new Recipe(borshch);
	await Borshch.save();
	const Sushi = new Recipe(sushi);
	await Sushi.save();
	const recipes = await Recipe.getByCategory("soup");
	expect(recipes.rows.length).toBe(1);
});

//test getting recipes from db by tag
test("getByTag works", async () => {
	const Borshch = new Recipe(borshch);
	await Borshch.save();
	const Sushi = new Recipe(sushi);
	await Sushi.save();
	const recipes = await Recipe.getByTag("japanese_cookery");
	expect(recipes.rows.length).not.toBe(0);
});

//test getting recipes from db by user ID
test("getByUserId works", async () => {
	const Borshch = new Recipe(borshch);
	await Borshch.save();
	const Sushi = new Recipe(sushi);
	await Sushi.save();
	const recipes = await Recipe.getByUserId(1);
	expect(recipes.rows.length).toBe(1);
});

//test getting recipes from db by ID
test("getById works", async () => {
	const Borshch = new Recipe(borshch);
	await Borshch.save();
	let id = await pool.query(`SELECT * FROM recipes`);
	id = id.rows[0]["id"];
	const recipes = await Recipe.getById(id);
	expect(recipes.rows.length).toBe(1);
});

//test sorting recipes by rating from db
test("sortByRating works", async () => {
	const Borshch = new Recipe(borshch);
	await Borshch.save();
	const Sushi = new Recipe(sushi);
	await Sushi.save();
	const Pizza = new Recipe(pizza);
	await Pizza.save();
	let recipes = await Recipe.sortByRating();
	recipes = recipes.rows.map(rec => Number(rec["rating"]));
	const result = recipes.slice(1).every((item, i) => recipes[i] >= item);
	expect(result).toBe(true);
});
