const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");

const {
  ctrlWrapper,
  HttpError,
  emailSend,
  emailLetter,
} = require("../helpers");

const { SECRET_KEY } = process.env;

// REGISTER
// ================================================================================================
const register = async (req, res, next) => {
  const { email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  // const avatarURL = path.join("avatars", "avatarDefault.png");
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const emailToVetification = emailLetter(email, verificationToken);

  await emailSend(emailToVetification);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

// LOGIN
// ================================================================================================
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Need to email verification");
  }
  const { id, subscription } = user;

  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: "3d" });

  await User.findByIdAndUpdate(id, { token });

  res.status(200).json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

// LOGOUT
// ================================================================================================
const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).send();
};

// CURRENT_USER
// ================================================================================================
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

// SUBSCRIPTION
// ================================================================================================
const changeSubscription = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400);
  }
  const { email } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(email, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({ email, subscription });
};

// AVATAR
// ================================================================================================
const avatarDir = path.join(__dirname, "..", "public", "avatars");

const changeAvatar = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) throw HttpError(400);

  const { path: tempUpload, originalname } = req.file;
  const newFileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, newFileName);

  await Jimp.read(tempUpload).then((ava) =>
    ava.resize(250, 250).write(`${resultUpload}`)
  );

  await fs.unlink(tempUpload);

  const avatarURL = path.join("avatars", newFileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

// VERIFICATION
// ================================================================================================
const verification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user.id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: "Verification successful",
  });
};

// REVERIFICATION
// ================================================================================================
const reVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const emailToVetification = emailLetter(email, user.verificationToken);
  await emailSend(emailToVetification);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent,
  logout,
  changeSubscription: ctrlWrapper(changeSubscription),
  changeAvatar: ctrlWrapper(changeAvatar),
  verification,
  reVerification,
};
//
