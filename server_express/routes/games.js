const { Router } = require("express");
const { check } = require("express-validator");
const { gamesGet } = require("../controllers/games");
const { validateJWT, fieldValidation } = require("../middlewares");

const router = Router();

router.get("/", gamesGet);

module.exports = router;
