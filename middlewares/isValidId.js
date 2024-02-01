const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, _, next) => {
  console.log(req.params.id);
  if (!isValidObjectId(req.params.id)) {
    next(HttpError(400, `${req.params.drinkId} is not valid id.`));
  }
  next();
};

module.exports = { isValidId };
