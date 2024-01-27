const express = require("express");
const isValidToken = require("../../middlewares/isValidToken");

const { addDrink, currentDay, getMonth } = require("../../controllers/water");

const router = express.Router();

router.put("/", isValidToken, addDrink);
router.get("/", isValidToken, currentDay);
router.get("/month/", isValidToken, getMonth);

module.exports = router;
