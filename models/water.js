const { Schema, model } = require("mongoose");
const Joi = require("joi");

const MongooseError = require("../helpers/MongoosError");

const waterSchema = new Schema(
  {
    date: { type: Date },
    norm: { type: Number },
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

const dateSchema = Joi.object({
  date: Joi.date().required(),
}).messages({
  "any.required": "missing required {#key} field",
});

const drinkSchema = Joi.object({
  ml: Joi.number().required(),
  time: Joi.string().required(),
}).messages({
  "any.required": "missing required {#key} field",
});

const monthSchema = Joi.object({
  year: Joi.number().required(),
  month: Joi.number().required(),
}).messages({
  "any.required": "missing required {#key} field",
});

const normSchema = Joi.object({
  date: Joi.date().required(),
  norm: Joi.number().required(),
}).messages({
  "any.required": "missing required {#key} field",
});

const schemas = {
  dateSchema,
  drinkSchema,
  monthSchema,
  normSchema,
};

waterSchema.post("save", MongooseError);

const Water = model("waterDays", waterSchema);

module.exports = { Water, schemas };
