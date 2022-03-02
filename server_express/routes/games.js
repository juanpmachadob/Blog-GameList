const { Router } = require("express");
const { check } = require("express-validator");

const {
  gamesGet,
  gamesGetPopular,
  gamesGetOwned,
  gamesGetById,
  gamesPost,
  gamesPut,
  gamesDelete,
} = require("../controllers/games");

const { validateJWT, fieldValidation } = require("../middlewares");
const {
  categoryExistsById,
  titleExists,
  gameExistsById,
  isAdminOrOwner,
} = require("../helpers/database-validators");

const router = Router();

router.get("/", gamesGet);

router.get("/popular", gamesGetPopular);

router.get("/owned", [validateJWT], gamesGetOwned);

router.get(
  "/:id",
  [
    check("id", "Invalid game ID.").isMongoId(),
    fieldValidation,
    check("id").custom(gameExistsById),
    fieldValidation,
  ],
  gamesGetById
);

router.post(
  "/",
  [
    validateJWT,
    check("title", "Title is required.").not().isEmpty(),
    check("title", "Title must be between 3 to 16 characters.").isLength({
      min: 2,
      max: 40,
    }),
    check("title").custom(titleExists),
    check("description", "Description is required.").not().isEmpty(),
    check(
      "description",
      "Description must be between 50 to 800 characters."
    ).isLength({
      min: 50,
      max: 800,
    }),
    check("category", "Invalid category ID.").isMongoId(),
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
    isAdminOrOwner,
    check("id", "Invalid game ID.").isMongoId(),
    fieldValidation,
    check("id").custom(gameExistsById),
    check("title", "Title must be between 3 to 16 characters.")
      .optional()
      .isLength({
        min: 2,
        max: 40,
      }),
    check("title").optional().custom(titleExists),
    check("description", "Description must be between 50 to 800 characters.")
      .optional()
      .isLength({
        min: 50,
        max: 800,
      }),
    check("category", "Invalid category ID.").optional().isMongoId(),
    fieldValidation,
    check("category").optional().custom(categoryExistsById),
    fieldValidation,
  ],
  gamesPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminOrOwner,
    check("id", "Invalid game ID.").isMongoId(),
    fieldValidation,
    check("id").custom(gameExistsById),
    fieldValidation,
  ],
  gamesDelete
);

module.exports = router;
