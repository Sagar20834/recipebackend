const mongoose = require("mongoose");
const Recipe = require("../../models/recipe/Recipe");

const appError = require("../../utils/appError");
const User = require("../../models/users/User");

const recipeCreateController = async (req, res, next) => {
  //   console.log(req);

  try {
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(appError("User not found", 404));
    }
    const newRecipe = await Recipe.create({
      ...req.body,
      createdBy: req.user,
    });

    userFound.recipes.push(newRecipe._id);

    await userFound.save();

    res.json({
      status: "success",
      data: newRecipe,
    });
  } catch (error) {
    return next(appError(error.message, 400));
  }
};

module.exports = {
  recipeCreateController,
};
