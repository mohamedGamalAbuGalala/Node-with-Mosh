const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const { getErrorMessages } = require("../utilities/ErrorHandlers/utility");

/* GET movies listing. */
router.get("/", async (req, res, next) => {
  // getting movies
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

router.get("/:id", async (req, res, next) => {
  // getting single movie
  const movie = await Movie.findById(req.params.id);
  // check existence
  if (!movie)
    return res.status(404).send(`The movie with the given ID wasn't found`);
  res.send(movie);
});

router.post("/", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(getErrorMessages(error));

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  // Adding
  let movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name
    }
  });
  await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(getErrorMessages(error));

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  // update routine
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: {
        _id: genre._id,
        name: genre.name
      }
    },
    { new: true }
  );
  // check existence
  if (!movie)
    return res.status(404).send(`The movie with the given ID wasn't found`);
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  // check existence
  if (!movie)
    return res.status(404).send(`The movie with the given ID wasn't found`);

  res.send(movie);
});

module.exports = router;
