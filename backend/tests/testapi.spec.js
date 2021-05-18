const fetch = require("node-fetch");

const { getAll, getByCategory } = require("../models/recipe");
test("get recipe by user_id works", async () => {
  const response = await fetch("http://localhost:5001/recipes/?user_id=1", {
    method: "GET",
  });
  const data = await response.json();
  expect(data[0]["user_id"]).toBe(1);
});

test("get recipe by id works", async () => {
  const recipes = await getAll();
  const id = recipes.rows[0].id;
  const response = await fetch(`http://localhost:5001/recipes/?id=${id}`, {
    method: "GET",
  });
  const data = await response.json();
  expect(data[0].id).toBe(id);
});

test("get recipe by category works", async () => {
  const response = await fetch("http://localhost:5001/recipes/?category=soup", {
    method: "GET",
  });
  const data = await response.json();
  expect(data[0].category).toBe("soup");
});

test("get recipe by tag works", async () => {
  const response = await fetch(
    "http://localhost:5001/recipes/?tag=japanese_cookery",
    {
      method: "GET",
    }
  );
  const data = await response.json();
  expect(data[0].tag).toBe("japanese_cookery");
});
