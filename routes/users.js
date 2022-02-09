const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidation, hasRole } = require("../middlewares");
const {
  emailExists,
  userExistsById,
  userAlreadyDeleted,
} = require("../helpers");

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
    check("firstname", "First name is required.").not().isEmpty(),
    check("lastname", "Last name is required.").not().isEmpty(),
    check(
      "password",
      "Password must be at least 8 characters long and must contain letters in mixed case, numbers and special characters."
    ).isStrongPassword(),
    check("email", "Invalid email.").isEmail(),
    check("email").custom(emailExists),
    check("role", `Role must be: admin | editor | user`).isIn([
      "admin",
      "editor",
      "user",
    ]),
    fieldValidation,
  ],
  usersPost
);

// TODO: Validate individual fields if are included
router.put(
  "/:id",
  [
    //validateJWT,
    // hasRole("admin", "editor"),
    check("id", "Invalid user ID.").isMongoId(),
    fieldValidation,
    check("id").custom(userExistsById),
    fieldValidation,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    //validateJWT,
    // hasRole("admin", "editor"),
    check("id", "Invalid user ID.").isMongoId(),
    fieldValidation,
    check("id").custom(userExistsById),
    fieldValidation,
  ],
  usersDelete
);

module.exports = router;
