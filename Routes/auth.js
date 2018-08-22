const Joi = require("joi");
const router = require("express").Router();
const { User } = require("../models/user");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).send("Invalid Email ID or password");
    return;
  }
  const isValid = await bycrpt.compare(req.body.password, user.password);
  if (!isValid) {
    res.status(400).send("Invalid Email or password");
    return;
  }
  res.send(user.generateAuthToken());
});
function validate(user) {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  };
  return Joi.validate(user, schema);
}
module.exports = router;
