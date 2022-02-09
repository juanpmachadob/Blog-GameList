const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers");
const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        msg: "Email is not registered.",
      });
    }

    // User status is true
    if (!user.status) {
      return res.status(400).json({
        msg: "User is deleted.",
      });
    }

    // Verify if passwords match
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: "Invalid password.",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Authentication error. Please, contact an Administrator!",
      error,
    });
  }
};

module.exports = {
  login,
};
