const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");
const { getErrorMessages } = require("../utilities/ErrorHandlers/utility");

/* GET genres listing. */
router.get("/", async (req, res, next) => {
  // getting genres
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res, next) => {
  // getting single genre
  const genre = await Genre.findById(req.params.id);
  // check existence
  if (!genre)
    return res.status(404).send(`The genre with the given ID wasn't found`);
  res.send(genre);
});

router.post("/", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(getErrorMessages(error));

  // Adding
  let genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(getErrorMessages(error));

  // update routine
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  // check existence
  if (!genre)
    return res.status(404).send(`The genre with the given ID wasn't found`);
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  // check existence
  if (!genre)
    return res.status(404).send(`The genre with the given ID wasn't found`);

  res.send(genre);
});

module.exports = router;
