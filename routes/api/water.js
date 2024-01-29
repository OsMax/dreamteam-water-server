const express = require("express");
const isValidToken = require("../../middlewares/isValidToken");
const validateBody = require("../../middlewares/validateBody");

// const { schemas } = require("../../models/water");

const {
  addDrink,
  currentDay,
  getMonth,
  editUserNorm,
  editDrink,
  deleteDrink,
  getDayInfo,
} = require("../../controllers/water");

const router = express.Router();

router.post(
  "/",
  isValidToken,
  // validateBody(schemas.getDateSchema),
  currentDay
);
router.post("/drinks", isValidToken, addDrink);
router.patch("/drinks", isValidToken, editDrink);
router.delete("/drinks", isValidToken, deleteDrink);
router.post(
  "/month",
  isValidToken,
  // validateBody(schemas.getDateSchema),
  getMonth
);
router.patch("/norm", isValidToken, editUserNorm);
router.post("/days", isValidToken, getDayInfo);

module.exports = router;
