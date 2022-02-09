const User = require("../models/user");

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
  if (!user.status){
    throw new Error("User is deleted.")
  }
};

module.exports = {
  emailExists,
  userExistsById
};
