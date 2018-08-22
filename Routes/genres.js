const router = require("express").Router();
const { validateGenres, Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// ******************************GET CODE BLOCKK*******************************
router.get("/", async (req, res) => {
  //Return all the genres
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  //Lookup the genre with the given id
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send("The genre with the given id is not found");
    return;
  }
  res.send(genre);
});

// ******************************POST CODE BLOCK*********************
router.post("/", auth, async (req, res) => {
  //Validate the Request Body
  const { error } = validateGenres(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //Add the genre
  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.status(200).send(genre);
});
// ******************************PUT CODE BLOCK*********************
router.put("/:id", async (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  //Lookup the genre and update
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name } },
    { new: true }
  );
  if (!genre) {
    res.status(404).send("The genre with the given id is not found");
    return;
  }
  res.send(genre);
});
// ******************************Delete CODE BLOCK*********************
router.delete("/:id", [auth, admin], async (req, res) => {
  //Lookup the course and delte
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    res.status(404).send("The course with the given id is not found");
    return;
  }
  res.send(genre);
});
module.exports = router;
