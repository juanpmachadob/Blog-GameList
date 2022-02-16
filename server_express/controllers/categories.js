const Category = require("../models/category");

const categoriesGet = async (req, res) => {
  const [total, categories] = await Promise.all([
    Category.countDocuments(),
    Category.find(),
  ]);

  res.json({ total, categories });
};

module.exports = {
  categoriesGet,
};
