const mongoose = require("mongoose");
const express = require("express");
const usersRoute = require("./routes/users/usersRoute");
const recipesRoute = require("./routes/recipes/recipesRoute");

require("dotenv").config();
require("./config/dbConnect");
const app = express();
const cors = require("cors");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const PORT = process.env.PORT || 8000;
//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/recipes", recipesRoute);

//error handlers middleware
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port:${PORT} `);
});
