const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidation, validateJWT, hasRole } = require("../middlewares");
const { emailExists, userExistsById } = require("../helpers");

const {
  usersGet,
  usersGetByID,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/users");

const router = Router();

// Routes
router.get("/", usersGet);

router.get(
  "/:id",
  [
    check("id", "Invalid user ID.").isMongoId(),
    fieldValidation,
    check("id").custom(userExistsById),
    fieldValidation,
  ],
  usersGetByID
);

router.post(
  "/",
  [
    check("name", "Name is required.").not().isEmpty(),
    check(
      "password",
      "Password must be at least 8 characters long and must contain letters in mixed case, numbers and special characters."
    ).isStrongPassword(),
    check("email", "Invalid email.").isEmail(),
    check("email").custom(emailExists),
    check("role", `Role must be: admin | editor | user`).isIn([
      "admin",
      "user",
    ]),
    fieldValidation,
  ],
  usersPost
);

// TODO: Validate individual fields if are included, validate if user to modify is current user (unless he is admin or editor)
router.put(
  "/:id",
  [
    validateJWT,
    hasRole("admin"),
    check("id", "Invalid user ID.").isMongoId(),
    fieldValidation,
    check("id").custom(userExistsById),
    fieldValidation,
  ],
  usersPut
);

//TODO: User to be deleted doesn't contain a superior role
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("admin"),
    check("id", "Invalid user ID.").isMongoId(),
    fieldValidation,
    check("id").custom(userExistsById),
    fieldValidation,
  ],
  usersDelete
);

module.exports = router;
