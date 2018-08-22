const router = require("express").Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");
const { Rental, validate } = require("../models/rentals.js");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");

Fawn.init(mongoose);
//! ******************GET CODE BLOCK*****************
router.get("/", async (req, res) => {
  const rentals = await Rental.find()
    .populate("customer", "name isGold phone")
    .populate("movie", "title dailyRentalRate")
    .sort({ dateOut: -1 });
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

//! ******************POST CODE BLOCK*****************
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    res.status(404).send("The Customer with the given id is not found");
    return;
  }
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    res.status(404).send("Invalid Movie ID");
    return;
  }
  if (movie.numberInStock === 0) {
    res.status(400).send("Tht Movie is currently Out of stock");
    return;
  }
  let rental = new Rental({
    customer: customer._id,
    movie: movie._id
  });
  try {
     Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Internal Server Error");
    return;
  }
  //THIS IS A TRANSACTION
  // rental = await rental.save();
  // movie.numberInStock--;
  // movie.save();
  // THIS IS A TRANSACTION
  //So we have to make it atomic so we use a library
  res.send(rental);
});
module.exports = router;
