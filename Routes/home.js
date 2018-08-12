const router = require("express").Router()  ;
router.get("/", (req, res) => {
  res.render("index", {
    title: "express-app",
    message: "hello",
    message2: "world"
  });
});
module.exports = router;
