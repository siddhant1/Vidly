const mongoose = require("mongoose");
const Joi = require("joi");

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.string()
      .min(10)
      .required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
}
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true
    },
    phone: {
      type: String,
      required: true,
      minlength: 10
    },
    isGold: {
      type: Boolean,
      default: false
    }
  })
);
exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
