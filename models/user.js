const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, maxlength: 1024 },
  isAdmin: { type: Boolean, default: false }
});
UserSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this.id, isAdmin: this.isAdmin },
    process.env.jwtPrivateKey
  );
};
const User = mongoose.model("user", UserSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .max(255)
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
