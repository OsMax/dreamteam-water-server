const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, _, next) => {
  if (!isValidObjectId(req.params.drinkId)) {
    next(HttpError(400, `${req.params.drinkId} is not valid id.`));
  }
  next();
};

module.exports = { isValidId };
