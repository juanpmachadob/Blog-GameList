const User = require("../models/user");
const Category = require("../models/category");
const Game = require("../models/game");

const emailExists = async (email = "") => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error(`Email already exists.`);
  }
};

const userExistsById = async (id = "") => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`User ID ${id} doesn't exists.`);
  }
  if (!user.status) {
    throw new Error("User is deleted.");
  }
};

const categoryExistsById = async (id = "") => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error(`Category ${id} doesn't exists.`);
  }
};

const gameExistsById = async (id = "") => {
  const game = await Game.findById(id);
  if (!game) {
    throw new Error(`Game ${id} doesn't exists.`);
  }
};

const isPropietary = async (req, res, next) => {
  const game = await Game.findById(req.params.id).populate("user");
  if (game.user.id !== req.user.id) {
    return res.status(400).json({
      msg: "You are not the user who registered this game.",
    });
  }
  next();
};

module.exports = {
  emailExists,
  userExistsById,
  categoryExistsById,
  gameExistsById,
  isPropietary,
};
