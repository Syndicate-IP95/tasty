const fetch = require("node-fetch");

const { getAll, getByCategory } = require("../models/recipe");

//test getting all recipes from back
test("get all recipes", async () => {
	const response = await fetch("http://localhost:5001/recipes/", {
		method: "GET"
	});
	const data = await response.json();
	expect(data[0]["user_id"]).toBe(1);
});

//test getting recipes by user ID from back
test("get recipe by user_id works", async () => {
	const response = await fetch("http://localhost:5001/recipes/?user_id=1", {
		method: "GET"
	});
	const data = await response.json();
	expect(data[0]["user_id"]).toBe(1);
});

//test getting recipes by recipe ID from back
test("get recipe by id works", async () => {
	const recipes = await getAll();
	const id = recipes.rows[0].id;
	const response = await fetch(`http://localhost:5001/recipes/?id=${id}`, {
		method: "GET"
	});
	const data = await response.json();
	expect(data[0].id).toBe(id);
});

//test getting recipes by category from back
test("get recipe by category works", async () => {
	const response = await fetch("http://localhost:5001/recipes/?category=soup", {
		method: "GET"
	});
	const data = await response.json();
	expect(data[0].category).toBe("soup");
});

//test getting recipes by tag from back
test("get recipe by tag works", async () => {
	const response = await fetch("http://localhost:5001/recipes/?tag=japanese_cookery", {
		method: "GET"
	});
	const data = await response.json();
	expect(data[0].tag).toBe("japanese_cookery");
});
