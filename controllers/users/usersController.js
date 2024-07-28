const User = require("../../models/users/User");
const appError = require("../../utils/appError");
const bcrypt = require("bcryptjs");
generateToken = require("../../utils/generateToken");

const userRegisterController = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  try {
    //check if user is already registered
    const userFound = await User.findOne({ email });
    if (userFound) return next(appError("User already exists", 400));

    //check if fields are empty

    if (!fullname || !email || !password) {
      return next(appError("All fields are required", 502));
    }

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userAdded = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      message: "User registered successfully",
      data: userAdded,
    });
  } catch (error) {
    return next(appError(error.message, error.statusCode));
  }
};

const userLoginController = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appError("Invalid Login Credentials", 401));
    }

    //match password

    //mathch the password
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return next(appError("Invalid Login Credentials", 401));
    }
    res.json({
      status: "success",
      message: "Login Successfull",
      data: userFound,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    return next(appError(error.message, error.statusCode));
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
};
