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

// const addDrinkSchema = Joi.object({
//   date: {
//     year: Joi.number().required(),
//     month: Joi.string().required(),
//     day: Joi.number(),
//   },
//   drink: {
//     ml: Joi.number().required(),
//     time: Joi.string().required(),
//   },
// }).messages({ "any.required": "missing required {#key} field" });

const dateSchema = Joi.object({
  date: {
    year: Joi.number().required(),
    month: Joi.string().required(),
    day: Joi.number(),
  },
}).messages({
  "any.required": "missing required {#key} field",
});

const drinkSchema = Joi.object({
  drink: {
    ml: Joi.number().required(),
    time: Joi.string().required(),
  },
}).messages({
  "any.required": "missing required {#key} field",
});

const schemas = {
  // addDrinkSchema,
  dateSchema,
  drinkSchema,
};

waterSchema.post("save", MongooseError);

const Water = model("waterDays", waterSchema);

module.exports = { Water, schemas };
