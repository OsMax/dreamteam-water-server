const { Schema, model } = require("mongoose");
const Joi = require("joi");

const MongooseError = require("../helpers/MongoosError");

const GENDERS = ["woman", "man"];

const EMAILREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: EMAILREGEX,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: GENDERS,
      default: "woman",
    },
    norm: {
      type: Number,
      default: 2000,
    },
    token: String,
    avatarURL: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    startDay: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const authSchema = Joi.object({
  email: Joi.string().pattern(EMAILREGEX).required().empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
  password: Joi.string().min(8).max(64).required(),
}).messages({ "any.required": "missing required {#key} field" });

const emailSchema = Joi.object({
  email: Joi.string().pattern(EMAILREGEX).required().empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
});

const editUserInfo = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(EMAILREGEX).empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
  gender: Joi.string().valid(...GENDERS),
  password: Joi.string().min(8).max(64),
  newPassword: Joi.string().min(8).max(64),
}).messages({
  "any.required": "missing required {#key} field",
});

const passwordSchema = Joi.object({
  password: Joi.string().min(8).max(64).required(),
});

const schema = {
  authSchema,
  emailSchema,
  editUserInfo,
  passwordSchema,
};

userSchema.post("save", MongooseError);

const User = model("user", userSchema);

module.exports = { User, schema };
