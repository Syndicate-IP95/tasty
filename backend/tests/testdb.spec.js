const { pool } = require("../db/database");
const Recipe = require("../models/recipe");

const fakeRecipe = {
  author: {
    userId: 1,
    name: "Petro",
    surname: "Petruk",
  },
  title: "some recipe",
  ings: JSON.stringify([{ label: "Творог", id: "gr", weight: "100" }]),
  steps:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  file: null,
};

const fakeRecipe1 = {
  author: {
    userId: 1,
    name: "Petro",
    surname: "Petruk",
  },
  title: "some recipe",
  ings: JSON.stringify([{ label: "Творог123", id: "gr", weight: "200" }]),
  steps:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  file:
    "https://image-storing-bucket.s3.amazonaws.com/182a6e50-acc9-11eb-ac3c-294310cbed9a.jpeg",
};

// testing creating new recipe and check length before & after
test("length increases by 1, when we add new recipe", async () => {
  await pool.query(`DELETE FROM recipes;`);

  let firstLength = await pool.query("SELECT * FROM recipes");
  firstLength = firstLength.rows.length;

  const newRecipe = new Recipe(fakeRecipe);

  await newRecipe.save();

  let secondLength = await pool.query("SELECT * FROM recipes");
  secondLength = secondLength.rows.length;

  expect(secondLength - firstLength).toBe(1);
});

// tesing if db saving image url if we pass it through save method
test("tesing if db saving image url if we pass it through save method", async () => {
  await pool.query(`DELETE FROM recipes;`);

  const newRecipe = new Recipe(fakeRecipe1);

  await newRecipe.save();

  let select = await pool.query(
    `SELECT * FROM recipes WHERE photo_url = 'https://image-storing-bucket.s3.amazonaws.com/182a6e50-acc9-11eb-ac3c-294310cbed9a.jpeg'`
  );

  expect(select.rows).not.toBe(0);
});
