const { Water } = require("../models/water");
const { User } = require("../models/user");

// const { HttpError, ctrlWrapper } = require("../helpers");

// GET CURRENT DAY
// ========================================================================================
const currentDay = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.body;
  const { norm } = req.user;
  let result = await Water.findOne({ date, owner: _id });
  if (!result) {
    result = await Water.create({ date, norm, drinks: [], owner: req.user.id });
  }
  res.status(200).json(result);
};

// ADD NEW DRINK TO CURRENT DAY
// ========================================================================================
const addDrink = async (req, res) => {
  const { _id } = req.user;
  const { drink } = req.body;
  const { year, month, day } = req.body.date;
  let result = await Water.findOneAndUpdate(
    {
      owner: _id,
      "date.year": `${year}`,
      "date.month": `${month}`,
      "date.day": `${day}`,
    },
    { $push: { drinks: drink } },
    {
      new: true,
    }
  );
  const percent = Math.round(
    (result.drinks.reduce(function (p, c) {
      return p + c.ml;
    }, 0) /
      result.norm) *
      100
  );
  result = await Water.findByIdAndUpdate(
    result._id,
    { percent: percent },
    {
      new: true,
    }
  );
  res.json(result);
};

// GET MONTH INFORMATION
// ========================================================================================
const getMonth = async (req, res) => {
  const { _id } = req.user;
  const { year, month } = req.body.date;

  const result = await Water.find({
    owner: _id,
    "date.year": year,
    "date.month": `${month}`,
  });

  // const result = temp.map((e) => {
  //   return { date: e.date, percent: e.percent };
  // });

  res.status(200).json(result);
};

// EDIT NORM
// ====================================================================================================
const editUserNorm = async (req, res) => {
  const { date } = req.body;
  const { _id } = req.user;
  const { norm } = req.body;

  const result = Water.findOne({ date, owner: _id });

  const percent = Math.round(
    (result.drinks.reduce(function (p, c) {
      return p + c.ml;
    }, 0) /
      result.norm) *
      100
  );

  await User.findByIdAndUpdate(_id, { ...norm });
  await Water.findOneAndUpdate({ date, owner: _id }, { norm, percent });

  res.status(200).json({ norm });
};

// EDIT DRINK
// ====================================================================================================
const editDrink = async (req, res) => {
  const { _dayId, _drinkId, drink } = req.body;
  const result = await Water.findOneAndUpdate(
    {
      _id: _dayId,
      "drinks._id": _drinkId,
    },
    { $set: { "drinks.$": drink } },
    {
      new: true,
    }
  );
  res.json(result);
};

// DELET DRINK
// ====================================================================================================
const deleteDrink = async (req, res) => {
  const { _dayId, _drinkId } = req.body;
  await Water.findOneAndUpdate(
    {
      _id: _dayId,
    },
    { $pull: { drinks: { _id: _drinkId } } }
  );
  res.json({ message: "Drink has been delet" });
};

const getDayInfo = async (req, res) => {
  const { _id } = req.user;
  const { year, month, day } = req.body.date;
  const result = await Water.findOne({
    owner: _id,
    "date.year": `${year}`,
    "date.month": `${month}`,
    "date.day": `${day}`,
  });

  res.status(200).json({
    day: result.date.day,
    month: result.date.month,
    percent: result.percent,
    drinks: result.drinks.length,
  });
};

module.exports = {
  addDrink,
  currentDay,
  getMonth,
  editUserNorm,
  editDrink,
  deleteDrink,
  getDayInfo,
};
