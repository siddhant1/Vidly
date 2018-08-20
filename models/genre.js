const mongoose = require("mongoose");
const Joi = require("joi");
const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});
const Genre = mongoose.model("Genre", GenreSchema);

function validateGenres(genre) {
  const Schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, Schema);
}
exports.GenreSchema = GenreSchema;
exports.Genre = Genre;
exports.validateGenres = validateGenres;
