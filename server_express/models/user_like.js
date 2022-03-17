const { Schema, model } = require("mongoose");

const UserLikeSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: "Game",
    required: [true, "Game is required"],
  }
});

module.exports = model("UserLike", UserLikeSchema);
