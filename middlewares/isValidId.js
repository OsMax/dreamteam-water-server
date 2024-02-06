const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, _, next) => {
  console.log("day");
  if (req.params.id)
    if (!isValidObjectId(req.params.id)) {
      next(HttpError(400, `${req.params.id} is not valid id.`));
    }
  if (req.params.dayId)
    if (!isValidObjectId(req.params.dayId)) {
      next(HttpError(400, `${req.params.dayId} is not valid id.`));
    }
  next();
};

module.exports = { isValidId };
