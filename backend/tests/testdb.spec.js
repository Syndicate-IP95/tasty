const { pool } = require("../db/database");
const Recipe = require("../models/recipe");

const borshch = {
  user_id: 1,
  title: "borshch",
  photo_url:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Borscht_served.jpg/330px-Borscht_served.jpg",
  rating: 4.21,
  category: "soup",
  tag: "ukrainian_cookery",
  ingredients: "ingredients",
  steps:
    "recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe ",
};

const sushi = {
  user_id: 2,
  title: "sushi",
  photo_url:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Borscht_served.jpg/330px-Borscht_served.jpg",
  rating: 4.25,
  category: "sushi",
  tag: "japanese_cookery",
  ingredients:
    "ingredients ingredients  ingredients  ingredients  ingredients ",
  steps:
    "recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe ",
};

const pizza = {
  user_id: 2,
  title: "sushi",
  photo_url:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Borscht_served.jpg/330px-Borscht_served.jpg",
  rating: 4.5,
  category: "sushi",
  tag: "italian_cookery",
  ingredients:
    "ingredients ingredients  ingredients  ingredients  ingredients ",
  steps:
    "recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe recipe ",
};

test("adding new recipe works", async () => {
  await pool.query(`DELETE FROM recipes;`);
  let firstLength = await pool.query("SELECT * FROM recipes");
  firstLength = firstLength.rows.length;
  const newRecipe = new Recipe(borshch);
  await newRecipe.save();
  let secondLength = await pool.query("SELECT * FROM recipes");
  secondLength = secondLength.rows.length;
  expect(secondLength - firstLength).toBe(1);
});

test("get all works", async () => {
  await pool.query(`DELETE FROM recipes;`);
  const Borshch = new Recipe(borshch);
  await Borshch.save();
  const Sushi = new Recipe(sushi);
  await Sushi.save();
  const recipes = await Recipe.getAll();
  expect(recipes.rows.length).toBe(2);
});

test("getByCategory works", async () => {
  await pool.query(`DELETE FROM recipes;`);
  const Borshch = new Recipe(borshch);
  await Borshch.save();
  const Sushi = new Recipe(sushi);
  await Sushi.save();
  const recipes = await Recipe.getByCategory("soup");
  expect(recipes.rows.length).toBe(1);
});

test("getByTag works", async () => {
  await pool.query(`DELETE FROM recipes;`);
  const Borshch = new Recipe(borshch);
  await Borshch.save();
  const Sushi = new Recipe(sushi);
  await Sushi.save();
  const recipes = await Recipe.getByTag("japanese_cookery");
  expect(recipes.rows.length).not.toBe(0);
});

test("getByUserId works", async () => {
  await pool.query(`DELETE FROM recipes;`);
  const Borshch = new Recipe(borshch);
  await Borshch.save();
  const Sushi = new Recipe(sushi);
  await Sushi.save();
  const recipes = await Recipe.getByUserId(1);
  expect(recipes.rows.length).toBe(1);
});

test("getById works", async () => {
  await pool.query(`DELETE FROM recipes;`);
  const Borshch = new Recipe(borshch);
  await Borshch.save();
  let id = await pool.query(`SELECT * FROM recipes`);
  id = id.rows[0]["id"];
  const recipes = await Recipe.getById(id);
  expect(recipes.rows.length).toBe(1);
});

test("sortByRating works", async () => {
  await pool.query(`DELETE FROM recipes;`);
  const Borshch = new Recipe(borshch);
  await Borshch.save();
  const Sushi = new Recipe(sushi);
  await Sushi.save();
  const Pizza = new Recipe(pizza);
  await Pizza.save();
  let recipes = await Recipe.sortByRating();
  recipes = recipes.rows.map((rec) => Number(rec["rating"]));
  const result = recipes.slice(1).every((item, i) => recipes[i] >= item);
  expect(result).toBe(true);
});
