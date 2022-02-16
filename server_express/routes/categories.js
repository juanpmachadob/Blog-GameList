const { Router } = require("express");

const { categoriesGet } = require("../controllers/categories");

const router = Router();

// Routes
router.get("/", categoriesGet);

module.exports = router;