const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidation, matchingPasswords } = require("../middlewares");
const { emailExists } = require("../helpers");

const { register, login } = require("../controllers/auth");

const router = Router();

router.post(
  "/register",
  [
    check("name", "Name is required.").not().isEmpty(),
    check(
      "password",
      "Password must be at least 8 characters long and must contain letters in mixed case, numbers and special characters."
    ).isStrongPassword(),
    // matchingPasswords,
    check("email", "Invalid email.").isEmail(),
    check("email").custom(emailExists),
    fieldValidation,
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "Email is required.").isEmail(),
    check("password", "Password is required.").not().isEmpty(),
    fieldValidation,
  ],
  login
);

module.exports = router;
