const { Router } = require("express");
const { check } = require("express-validator");

const { usersGet, usersGetByID, usersPost, usersPut, usersDelete } = require("../controllers/users");

const router = Router();

// Routes
router.get("/", usersGet);

router.get("/:id", usersGetByID);

router.post("/", usersPost);

router.put("/:id", usersPut);

router.delete("/:id", usersDelete);

module.exports = router;
