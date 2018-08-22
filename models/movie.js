const mongoose = require("mongoose");
const { GenreSchema } = require("./genre");
const Joi = require("joi");
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  genre: {
    type: GenreSchema,
    required: true
  },
  numberInStock: { type: Number, required: true, min: 0 },
  dailyRentalRate: { type: Number, required: true, min: 0 }
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .required()
      .max(255),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
  };
  return Joi.validate(movie, schema);
}

exports.validate = validateMovie;
exports.Movie = Movie;
