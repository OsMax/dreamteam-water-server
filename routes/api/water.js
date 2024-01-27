const express = require("express");
const isValidToken = require("../../middlewares/isValidToken");

const {
  addDrink,
  currentDay,
  getMonth,
  editUserNorm,
} = require("../../controllers/water");

const router = express.Router();

router.put("/", isValidToken, addDrink);
router.get("/", isValidToken, currentDay);
router.get("/month/", isValidToken, getMonth);
router.patch("/norm", isValidToken, editUserNorm);

module.exports = router;
