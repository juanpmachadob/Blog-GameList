const { Router } = require("express");
const { check } = require("express-validator");

const {
  gamesGet,
  gamesGetById,
  gamesPost,
  gamesPut,
  gamesDelete,
} = require("../controllers/games");

const { validateJWT, fieldValidation, hasRole } = require("../middlewares");
const {
  categoryExistsById,
  gameExistsById,
  isAdminOrPropietary,
} = require("../helpers/database-validators");

const router = Router();

router.get("/", gamesGet);

router.get(
  "/:id",
  [
    check("id", "Invalid game ID.").isMongoId(),
    check("id").custom(gameExistsById),
    fieldValidation,
  ],
  gamesGetById
);

router.post(
  "/",
  [
    validateJWT,
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("category", "Invalid category ID").isMongoId(),
    fieldValidation,
    check("category").custom(categoryExistsById),
    fieldValidation,
  ],
  gamesPost
);

router.put(
  "/:id",
  [
    validateJWT,
    isAdminOrPropietary,
    check("id", "Invalid game ID.").isMongoId(),
    fieldValidation,
    check("id").custom(gameExistsById),
    fieldValidation,
  ],
  gamesPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminOrPropietary,
    check("id", "Invalid game ID.").isMongoId(),
    fieldValidation,
    check("id").custom(gameExistsById),
    fieldValidation,
  ],
  gamesDelete
);

module.exports = router;
