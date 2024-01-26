const express = require("express");

const {
  register,
  login,
  logout,
  getCurrent,
  changeSubscription,
  changeAvatar,
  verification,
  reVerification,
} = require("../../controllers/users");

const { validateBody } = require("../../middlewares/validateBody");
const isValidToken = require("../../middlewares/isValidToken");
const upload = require("../../middlewares/upload");

const { schema } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schema.authSchema), register);

router.post("/login", validateBody(schema.authSchema), login);

router.post("/logout", isValidToken, logout);

router.get("/current", isValidToken, getCurrent);

router.patch("/avatars", isValidToken, upload.single("avatar"), changeAvatar);

router.get("/verify/:verificationToken", verification);
router.post("/verify", validateBody(schema.reVerifShema), reVerification);

router.patch(
  "/",
  isValidToken,
  validateBody(schema.subscriptionSchema),
  changeSubscription
);

module.exports = router;
