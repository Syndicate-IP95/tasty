"use strict";

const { pool } = require("../db/database");

class Recipe {
  constructor(data) {
    this.info = {
      ...data,
    };
  }

  static async getAll() {
    const command = "SELECT * FROM recipes";
    return await pool.query(command);
  }

  static async getByCategory(category) {
    const command = "SELECT * FROM recipes WHERE category = $1";
    return await pool.query(command, [category]);
  }

  static async getByTag(tag) {
    const command = "SELECT * FROM recipes WHERE tag = $1";
    return await pool.query(command, [tag]);
  }

  static async getByUserId(user_id) {
    const command = "SELECT * FROM recipes WHERE user_id = $1";
    return await pool.query(command, [user_id]);
  }

  static async getById(id) {
    const command = "SELECT * FROM recipes WHERE id = $1";
    return await pool.query(command, [id]);
  }

  static async sortByRating() {
    const command = "SELECT * FROM recipes ORDER BY rating DESC";
    return await pool.query(command);
  }

  async save() {
    const {
      user_id,
      title,
      photo_url,
      rating,
      category,
      tag,
      ingredients,
      steps,
    } = this.info;
    const insertValues = [
      user_id,
      title,
      photo_url,
      rating,
      category,
      tag,
      ingredients,
      steps,
    ];
    const command =
      "INSERT INTO recipes (user_id, title, photo_url, rating, category, tag, ingredients, steps) values ($1, $2, $3, $4, $5, $6, $7, $8)";
    return await pool.query(command, insertValues);
  }
}

module.exports = Recipe;
