const mongoose = require("mongoose");
const instructionStepSchema = new mongoose.Schema();

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    recipeimage: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: [
      {
        instructionstitle: {
          type: String,
          // required: true,
        },
        instructionsimage: {
          type: String,
          // required: false,
        },
      },
    ],

    servings: {
      type: Number,
      required: true,
    },

    cookingtimehours: {
      type: Number,
      required: true,
    },
    cookingtimemins: {
      type: Number,
      required: true,
    },
    preptimehours: {
      type: Number,
      required: true,
    },
    preptimemins: {
      type: Number,
      required: true,
    },
    cuisine: {
      type: String,
      enum: [
        "Nepali",
        "Indian",
        "Mexican",
        "American",
        "Chinese",
        "Italian",
        "Thai",
        "Japanese",
      ],
      required: true,
    },
    collections: {
      type: String,
      enum: [
        "1 collection Selected",
        "2 collection Selected",
        "3 collection Selected",
        "4 collection Selected",
      ],
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
