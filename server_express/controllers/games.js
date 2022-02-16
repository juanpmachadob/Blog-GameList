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

module.exports = {
  gamesGet,
};
