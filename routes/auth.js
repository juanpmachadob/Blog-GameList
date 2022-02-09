const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidation } = require("../middlewares");

const { login } = require("../controllers/auth");

const router = Router();

// Routes
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
