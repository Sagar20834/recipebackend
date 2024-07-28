const express = require("express");
const {
  userRegisterController,
  userLoginController,
} = require("../../controllers/users/usersController");

const usersRoute = express.Router();

userRegisterController;

usersRoute.post("/register", userRegisterController);
usersRoute.post("/login", userLoginController);

module.exports = usersRoute;
