const { Water } = require("../models/water");
const { User } = require("../models/user");

// const { HttpError, ctrlWrapper } = require("../helpers");

// GET CURRENT DAY
// ========================================================================================
const currentDay = async (req, res) => {
  const { date } = req.body;
  const { norm } = req.user;
  let result = await Water.findOne({ date });
  if (!result) {
    result = await Water.create({ date, norm, drinks: [], owner: req.user.id });
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

// EDIT_NORM
// ====================================================================================================
const editUserNorm = async (req, res) => {
  const { date } = req.body;
  const { _id } = req.user;
  const { norm } = req.body;
  await User.findByIdAndUpdate(_id, { ...norm });
  await Water.findOneAndUpdate({ date }, { norm });
  res.status(200).json({ norm });
};

module.exports = {
  addDrink,
  currentDay,
  getMonth,
  editUserNorm,
};
