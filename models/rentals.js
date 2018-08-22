const mongoose = require("mongoose");
const Joi = require("joi");

const RentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dataReturned: { type: Date },
  rentalFee: { type: Number, min: 0 }
});
const Rental = mongoose.model("rentals", RentalSchema);
function validateRental(rental) {
  const schema = {
    movieId: Joi.objectId().required(),
    customerId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
}

exports.validate = validateRental;
exports.Rental = Rental;
exports.RentalSchema = RentalSchema;
