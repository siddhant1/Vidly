const router = require("express").Router();
const { validate, Movie } = require("../models/movie");
const { Genre } = require("../models/genre");

//! *************GET CODE BLOCK ****************
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort({ name: 1 });
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404).send("The movie with the given id is not found");
    return;
  }
  res.send(movie);
});
//! *************POST CODE BLOCK ****************
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    res.status(400).send("Invalid Genre");
    return;
  }
  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);
});
//! *************PUT CODE BLOCK ****************
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404).send("The movie with the given id is not found");
    return;
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    res.status(400).send("Invalid Genre");
    return;
  }

  movie.title = req.body.title;
  movie.genre = {
    _id: genre._id,
    name: genre.name
  };
  movie.numberInStock = req.body.numberInStock;
  movie.dailyRentalRate = req.body.dailyRentalRate;
  movie = await movie.save();
  res.send(movie);
});
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

module.exports = router;
