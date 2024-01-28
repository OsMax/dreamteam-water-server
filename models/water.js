const { Schema, model } = require("mongoose");
const Joi = require("joi");

const MongooseError = require("../helpers/MongoosError");

const waterSchema = new Schema(
  {
    date: {
      year: { type: Number },
      month: { type: String },
      day: { type: Number },
    },
    norm: { type: Number },
    percent: { type: Number, default: 0 },
    drinks: [
      {
        ml: { type: Number },
        time: { type: String },
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

// const addWaterSchema = Joi.object({
//   ml: Joi.number().required(),
//   time: Joi.string().required(),
// }).messages({ "any.required": "missing required {#key} field" });

// const addDaySchema = Joi.object({
//   date: Joi.date().required(),
//   norm: Joi.number(),
//   drinks: Joi.array().items(),
// }).messages({
//   "any.required": "missing required {#key} field",
// });

const schemas = {
  // addWaterSchema,
  // addDaySchema,
};

waterSchema.post("save", MongooseError);

const Water = model("waterDays", waterSchema);

module.exports = { Water, schemas };
