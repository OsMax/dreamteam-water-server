const { Water } = require("../models/water");
const { User } = require("../models/user");

const { HttpError, ctrlWrapper, calcPercent } = require("../helpers");

// GET DAY
// ========================================================================================
const getDay = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.body;
  const { norm } = req.user;
  const newDate = new Date(date.split("T")[0]);

  let result = await Water.findOne({
    owner: _id,
    date: newDate,
  });
  if (!result) {
    result = await Water.create({
      date: newDate,
      norm,
      drinks: [],
      owner: req.user.id,
    });
  }

  if (!req.user.startDay) {
    await User.findByIdAndUpdate(_id, { startDay: newDate });
    result = { dayInfo: result, startDay: newDate };
  } else {
    result = { dayInfo: result, startDay: req.user.startDay };
  }

  res.status(200).json(result);
};

// ADD NEW DRINK TO CURRENT DAY
// ========================================================================================
const addDrink = async (req, res) => {
  const { _id } = req.user;
  const { date, drink } = req.body;
  const result = await Water.findOneAndUpdate(
    {
      owner: _id,
      date,
    },
    { $push: { drinks: drink } },
    {
      new: true,
    }
  );

  res.json(result);
};

// EDIT DRINK
// ====================================================================================================
const editDrink = async (req, res) => {
  const { drink } = req.body;
  const id = req.params.drinkId;
  const result = await Water.findOneAndUpdate(
    {
      "drinks._id": id,
    },
    { $set: { "drinks.$.ml": drink.ml, "drinks.$.time": drink.time } },
    {
      new: true,
    }
  );
  res.json(result);
};

// DELET DRINK
// ====================================================================================================
const deleteDrink = async (req, res) => {
  const id = req.params.drinkId;
  await Water.findOneAndUpdate(
    {
      "drinks._id": id,
    },
    { $pull: { drinks: { _id: id } } }
  );
  res.json({ message: "Drink has been delet" });
};

// GET MONTH INFORMATION
// ========================================================================================
const getMonth = async (req, res) => {
  const { _id } = req.user;

  const { year, month } = req.body;
  // const str = year + "-" + month;
  const temp = await Water.find({
    owner: _id,
    date: {
      $gte: `${year}-${month}-01`,
      $lte: `${year}-${month}-31`,
    },
  });

  const result = temp.map((e) => {
    const percent = calcPercent(e.norm, e.drinks);
    return {
      day: new Date(e.date).getDay(),
      percent: percent,
      norm: e.norm,
      drinks: e.drinks.length,
    };
  });

  res.status(200).json(result);
};

// EDIT NORM
// ====================================================================================================
const editUserNorm = async (req, res) => {
  console.log("!!!");
  const { date, norm } = req.body;
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { norm });
  await Water.findOneAndUpdate(
    {
      owner: _id,
      "date.year": date.year,
      "date.month": `${date.month}`,
      "date.day": date.day,
    },
    { norm }
  );

  res.status(200).json({ norm });
};

// GET SHORT INFO ABOUT ANY DAY
// ====================================================================================================
const getDayInfo = async (req, res) => {
  const { _id } = req.user;
  const { year, month, day } = req.body.date;
  const result = await Water.findOne({
    owner: _id,
    "date.year": year,
    "date.month": `${month}`,
    "date.day": day,
  });

  const percent = calcPercent(result.norm, result.drinks);

  res.status(200).json({
    day: result.date.day,
    month: result.date.month,
    norm: result.norm,
    percent: percent,
    drinks: result.drinks.length,
  });
};

module.exports = {
  getDay,
  addDrink,
  getMonth,
  editUserNorm,
  editDrink,
  deleteDrink,
  getDayInfo,
};
