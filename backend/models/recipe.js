"use strict";

const { pool } = require("../db/database");

class Recipe {
  constructor(data) {
    this.data = data;
  }

  static getAll() {
    const command = "SELECT * FROM recipes";

    return pool.query(command);
  }

  save() {
    const { author, ings, title, content, file } = this.data;
    const savedFile = file;
    const command =
      "INSERT INTO recipes( user_id, photo_url, rating, author, ingredients, steps, title ) VALUES($1, $2, $3, $4, $5, $6, $7)";
    const insertValues = [
      author.userId,
      savedFile,
      0,
      JSON.stringify(author),
      JSON.stringify(ings),
      content,
      title,
    ];
    return pool.query(command, insertValues);
  }
}

module.exports = Recipe;
