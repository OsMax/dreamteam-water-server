const express = require("express");
const isValidToken = require("../../middlewares/isValidToken");
const { isValidId } = require("../../middlewares/isValidId");
const { validateBody } = require("../../middlewares/validateBody");

const { schemas } = require("../../models/water");

const {
  getDay,
  addDrink,
  getMonth,
  editUserNorm,
  editDrink,
  deleteDrink,
  getDayInfo,
} = require("../../controllers/water");

const router = express.Router();

// !!!
router.post("/", isValidToken, validateBody(schemas.dateSchema), getDay);

// !!!
router.post(
  "/drinks",
  isValidToken,
  validateBody(schemas.dateSchema),
  validateBody(schemas.drinkSchema),
  addDrink
);

router.patch(
  "/drinks/:drinkId",
  isValidToken,
  isValidId,
  validateBody(schemas.drinkSchema),
  editDrink
);

// !!!
router.delete("/drinks/:drinkId", isValidToken, isValidId, deleteDrink);

// !!!
router.post("/month", isValidToken, validateBody(schemas.dateSchema), getMonth);

router.patch("/norm", isValidToken, editUserNorm);

// !!!
router.post(
  "/days",
  isValidToken,
  validateBody(schemas.dateSchema),
  getDayInfo
);

module.exports = router;
