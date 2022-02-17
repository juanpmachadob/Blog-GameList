const Game = require("../models/game");

const gamesGet = async (req, res) => {
  const { limit = 10 } = req.query;
  const query = { status: true };

  const [total, games] = await Promise.all([
    Game.countDocuments(query),
    Game.find(query).limit(Number(limit)),
  ]);

  res.json({ total, games });
};

const gamesGetById = async (req, res) => {
  const { id } = req.params;
  const game = await Game.findById(id)
    .populate("category", "name")
    .populate("user", "name");
  res.json({ game });
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
      title: title.toLowerCase(),
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

module.exports = {
  gamesGet,
  gamesGetById,
  gamesPost,
  gamesPut,
  gamesDelete
};
