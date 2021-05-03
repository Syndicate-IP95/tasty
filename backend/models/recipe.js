"use strict";

const { pool } = require("../db/database");

class Recipe {
  constructor(data) {}

  static getAll() {
    const command = "SELECT * FROM recipes";

    return pool.query(command);
  }
}

module.exports = Recipe;
