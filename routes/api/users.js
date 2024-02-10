const express = require("express");

const {
  register,
  login,
  logout,
  getCurrent,
  changeAvatar,
  verification,
  reVerification,
  editUserInfo,
  restorePassword,
  restoreMail,
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

router.post("/verify", validateBody(schema.emailSchema), reVerification);

router.patch(
  "/info",
  isValidToken,
  validateBody(schema.editUserInfo),
  editUserInfo
);

router.post("/restore", validateBody(schema.emailSchema), restoreMail);

router.patch(
  "/restore/:verificationToken",
  validateBody(schema.passwordSchema),
  restorePassword
);

module.exports = router;
