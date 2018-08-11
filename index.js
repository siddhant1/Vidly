const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json());
const genres = [
  { id: 1, name: "horror" },
  { id: 2, name: "comedy" },
  { id: 3, name: "romance" }
];

function validateGenres(genre) {
  const Schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, Schema);
}
// ******************************GET CODE BLOCKK*******************************
app.get("/api/genres", (req, res) => {
  //Return all the genres
  res.status(202).send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  //Lookup the genre with the given id
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The Genre with the given ID is not found");
    return;
  }
  //Return the required Genre
  res.status(202).send(genre);
});

// ******************************POST CODE BLOCK*********************
app.post("/api/genres", (req, res) => {
  //Validate the Request Body
  const { error } = validateGenres(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //Add the genre
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.status(200).send(genre);
});
// ******************************PUT CODE BLOCK*********************
app.put("/api/genres/:id", (req, res) => {
  //Lookup the genre
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The Genre With the given Id is not found");
    return;
  }
  //Validate the put request body
  const { error } = validateGenres(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  //Update the Genre
  genre.name = req.body.name;
  res.send(genre);
});
// ******************************Delete CODE BLOCK*********************
app.delete("/api/genres/:id", (req, res) => {
  //Lookup the course
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The Genre with the given id is not found");
    return;
  }
  //Delete the Genre
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

// **********************************BASIC SETUP***************************
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
  console.log("Listening on port" + Port);
});
