const mongoose = require("mongoose");
const Joi = require("joi");
const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    }
  })
);

function validateGenres(genre) {
  const Schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, Schema);
}
exports.Genre = Genre;
exports.validateGenres = validateGenres;
