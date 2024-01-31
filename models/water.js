const { Schema, model } = require("mongoose");
const Joi = require("joi");

const MongooseError = require("../helpers/MongoosError");

const waterSchema = new Schema(
  {
    date: { type: Date },
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

const dateSchema = Joi.object({
  date: Joi.date(),
  drink: {
    ml: Joi.number().required(),
    time: Joi.string().required(),
  },
}).messages({
  "any.required": "missing required {#key} field",
});

const schemas = {
  dateSchema,
};

waterSchema.post("save", MongooseError);

const Water = model("waterDays", waterSchema);

module.exports = { Water, schemas };
