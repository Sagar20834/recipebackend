const Recipe = require("../../models/recipe/Recipe");

const appError = require("../../utils/appError");
const User = require("../../models/users/User");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");

const recipeCreateController = async (req, res, next) => {
  //   console.log(req);

  try {
    const userFound = await User.findById(req.user);
    if (!req.file) {
      return res.status(400).json({ message: "No file to uploaded" });
    }
    const result = await uploadToCloudinary(req.file.buffer);

    if (!userFound) {
      return next(appError("User not found", 404));
    }
    const newRecipe = await Recipe.create({
      ...req.body,
      createdBy: req.user,
      recipeimage: result.url,
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
