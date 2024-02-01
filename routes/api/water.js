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
} = require("../../controllers/water");

const router = express.Router();

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post("/", isValidToken, validateBody(schemas.dateSchema), getDay);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post(
  "/drinks/:id",
  isValidToken,
  isValidId,
  validateBody(schemas.drinkSchema),
  addDrink
);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.patch(
  "/drinks/:id",
  isValidToken,
  isValidId,
  validateBody(schemas.drinkSchema),
  editDrink
);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.delete("/drinks/:id", isValidToken, isValidId, deleteDrink);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post(
  "/month",
  isValidToken,
  validateBody(schemas.monthSchema),
  getMonth
);

router.patch(
  "/norm",
  isValidToken,
  validateBody(schemas.normSchema),
  editUserNorm
);

module.exports = router;
