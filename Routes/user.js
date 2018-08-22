const { User, validate } = require("../models/user");
const router = require("express").Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select({ password: -1 });
  res.send(user);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //FInd user who are already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("The email is already registered with us");
    return;
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});
module.exports = router;
