const express = require("express");
const {
  recipeCreateController,
} = require("../../controllers/recipe/recipesController");
const isLogin = require("../../middlewares/isLogin");

const recipesRoute = express.Router();

recipesRoute.post("/create", isLogin, recipeCreateController);

module.exports = recipesRoute;
