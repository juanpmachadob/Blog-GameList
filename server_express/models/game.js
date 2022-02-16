const { Schema, model } = require("mongoose");

const GameSchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  img: {
    type: String,
    required: [true, "Image is required"]
  },
  likes: {
    type: Number,
    default: 0
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
});

module.exports = model("Games", GameSchema);
