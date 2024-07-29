const express = require("express");
const upload = require("../../config/multer");

const {
  recipeCreateController,
} = require("../../controllers/recipe/recipesController");
const isLogin = require("../../middlewares/isLogin");

const recipesRoute = express.Router();

recipesRoute.post(
  "/create",
  isLogin,
  upload.single("recipeimage"),
  // upload.array("instructions.instructionsimage"),
  // upload.fields({recipeimage instructions.instructionsimage}),

  recipeCreateController
);

module.exports = recipesRoute;
