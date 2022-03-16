const Game = require("../models/game");
const UserLike = require("../models/user_like");

const gamesGet = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skipIndex = (Number(page) - 1) * limit;
  const query = { status: true };

  const [total, games] = await Promise.all([
    Game.countDocuments(query),
    Game.find(query).limit(Number(limit)).skip(skipIndex),
  ]);

  res.json({ total, games });
};

const gamesGetPopular = async (req, res) => {
  const { limit = 10 } = req.query;
  const query = { status: true };

  const games = await Game.find(query).sort({ likes: -1 }).limit(Number(limit));

  res.json({ games });
};

const gamesGetOwned = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skipIndex = (Number(page) - 1) * limit;
  const query = { status: true, user: req.user.id };

  const [total, games] = await Promise.all([
    Game.countDocuments(query),
    Game.find(query).sort({ likes: -1 }).limit(Number(limit)).skip(skipIndex),
  ]);

  res.json({ total, games });
};

const gamesGetById = async (req, res) => {
  const { id } = req.params;
  const game = await Game.findById(id)
    .populate("category", "name")
    .populate("user", "name");
  res.json({ game, canManage: req.canManage });
};

const gamesPost = async (req, res) => {
  const user = req.user;
  const { title, description, category } = req.body;

  const game = new Game({
    title: title.toLowerCase(),
    description,
    category,
    user: user._id,
  });

  await game.save();
  res.status(201).json({ game });
};

const gamesPut = async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  const newGame = await Game.findByIdAndUpdate(
    id,
    {
      title,
      description,
      category,
    },
    { new: true }
  );
  res.status(201).json({ newGame });
};

const gamesDelete = async (req, res) => {
  const { id } = req.params;
  const game = await Game.findByIdAndUpdate(
    id,
    {
      status: false,
    },
    { new: true }
  );
  res.json({ game });
};

const gamesLike = async (req, res) => {
  const { id } = req.params;
  
  const userLike = new UserLike({
    user: req.user.id,
    game: id,
  });

  await userLike.save();
  res.status(201).json({ userLike });
};

module.exports = {
  gamesGet,
  gamesGetPopular,
  gamesGetOwned,
  gamesGetById,
  gamesPost,
  gamesPut,
  gamesDelete,
  gamesLike,
};
