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
  const percent = calcPercent(result.norm, result.drinks);
  result.percent = percent;

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
  const { ml, time } = req.body;
  const { dayId } = req.params;
  const result = await Water.findOneAndUpdate(
    {
      _id: dayId,
    },
    { $push: { drinks: { ml, time } } },
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "The day not found");
  }

  const percent = calcPercent(result.norm, result.drinks);
  result.percent = percent;

  res.json(result);
};

// EDIT DRINK
// ====================================================================================================
const editDrink = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const { ml, time } = req.body;
  if (ml > 5000 || ml < 0) {
    throw HttpError(401, "Incorrect amount of drink (need<=5000)");
  }
  const { id } = req.params;
  const result = await Water.findOneAndUpdate(
    {
      "drinks._id": id,
    },
    { $set: { "drinks.$.ml": ml, "drinks.$.time": time } },
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "The drink not found");
  }

  const percent = calcPercent(result.norm, result.drinks);
  result.percent = percent;

  res.json(result);
};

// DELET DRINK
// ====================================================================================================
const deleteDrink = async (req, res) => {
  const { id } = req.params;

  const result = await Water.findOneAndUpdate(
    {
      "drinks._id": id,
    },
    { $pull: { drinks: { _id: id } } },
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "The drink not found");
  }

  const percent = calcPercent(result.norm, result.drinks);
  result.percent = percent;

  res.json(result);
};

// GET MONTH INFORMATION
// ========================================================================================
const getMonth = async (req, res) => {
  const { _id } = req.user;

  const { year, month } = req.body;

  const temp = await Water.find({
    owner: _id,
    date: {
      $gte: `${year}-${month}-01`,
      $lte: `${year}-${month}-31`,
    },
  });

  if (!temp || temp.length === 0) {
    throw HttpError(404, "The month not found");
  }

  const result = temp.map((e) => {
    const percent = calcPercent(e.norm, e.drinks);
    return {
      day: e.date,
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
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const { date, norm } = req.body;
  if (norm > 15000 || norm < 0) {
    throw HttpError(401, "Incorrect norm (need <=15000)");
  }
  const { _id } = req.user;
  const newDate = new Date(date.split("T")[0]);

  await User.findByIdAndUpdate(_id, { norm });
  const result = await Water.findOneAndUpdate(
    {
      owner: _id,
      date: newDate,
    },
    { norm },
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "The day not found");
  }

  const percent = calcPercent(result.norm, result.drinks);
  result.percent = percent;

  res.status(200).json(result);
};

module.exports = {
  getDay: ctrlWrapper(getDay),
  addDrink: ctrlWrapper(addDrink),
  getMonth: ctrlWrapper(getMonth),
  editUserNorm: ctrlWrapper(editUserNorm),
  editDrink: ctrlWrapper(editDrink),
  deleteDrink: ctrlWrapper(deleteDrink),
};
