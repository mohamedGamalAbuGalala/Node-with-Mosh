const express = require("express");
const router = express.Router();

const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const { Rental, validate } = require("../models/rental");
const { getErrorMessages } = require("../utilities/ErrorHandlers/utility");

const mongoose = require("mongoose");
const Fawn = require("fawn");
Fawn.init(mongoose);

/* GET rentals listing. */
router.get("/", async (req, res, next) => {
  // getting rentals
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", async (req, res, next) => {
  // getting single rental
  const rental = await Rental.findById(req.params.id);
  // check existence
  if (!rental)
    return res.status(404).send(`The rental with the given ID wasn't found`);
  res.send(rental);
});

router.post("/", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(getErrorMessages(error));

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status("400").send("Movie not in stock.");

  // Adding
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  // we have to make a transaction here...
  // 1. Two Phase Commit //
  // https://docs.mongodb.com/v3.4/tutorial/perform-two-phase-commits/
  // 2. npm i fawn

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        {
          _id: movie._id
        },
        {
          $inc: {
            numberInStock: -1
          }
        }
      )
      .run();
    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

router.delete("/:id", async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  // check existence
  if (!rental)
    return res.status(404).send(`The rental with the given ID wasn't found`);

  res.send(rental);
});

module.exports = router;
