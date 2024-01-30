const { Schema, model } = require("mongoose");
const Joi = require("joi");

const MongooseError = require("../helpers/MongoosError");

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
  },
  { versionKey: false, timestamps: true }
);

const authSchema = Joi.object({
  email: Joi.string().pattern(EMAILREGEX).required(),
  password: Joi.string().min(8).max(64).required(),
}).messages({ "any.required": "missing required {#key} field" });

const reVerifShema = Joi.object({
  email: Joi.string().pattern(EMAILREGEX).required(),
}).messages({ "any.required": "missing required field {#key}" });

const editUserInfo = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(EMAILREGEX).required(),
  gender: Joi.boolean().required(),
  password: Joi.string().min(8).max(64).required(),
  newPassword: Joi.string().min(8).max(64),
}).messages({
  "any.required": "missing required {#key} field",
});

const schema = {
  authSchema,
  reVerifShema,
  editUserInfo,
};

userSchema.post("save", MongooseError);

const User = model("user", userSchema);

module.exports = { User, schema };
