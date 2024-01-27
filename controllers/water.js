const { Water } = require("../models/water");

// const { HttpError, ctrlWrapper } = require("../helpers");

const currentDay = async (req, res) => {
  const { date } = req.body;
  let result = await Water.findOne({ date });
  if (!result) {
    result = await Water.create({ date: date, drinks: [], owner: req.user.id });
  }
  res.status(200).json(result);
};

const addDrink = async (req, res) => {
  const { drink } = req.body;
  console.log(drink);
  const { year, month, day } = req.body.date;
  const result = await Water.findOneAndUpdate(
    {
      "date.year": `${year}`,
      "date.month": `${month}`,
      "date.day": `${day}`,
    },
    { $push: { drinks: drink } },
    {
      new: true,
    }
  );
  res.json(result);
};

const getMonth = async (req, res) => {
  const { year, month } = req.body.date;

  const result = await Water.find({
    "date.year": `${year}`,
    "date.month": `${month}`,
  });

  res.status(200).json(result);
};

module.exports = {
  addDrink,
  currentDay,
  getMonth,
};
