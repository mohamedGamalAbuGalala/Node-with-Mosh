const Joi = require("joi");
const mongoose = require("mongoose");

const rentalMovie = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    get: v => Math.round(v),
    set: v => Math.round(v),
    min: 0,
    max: 255
  }
});
const rentalCustomer = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  }
});

const rentalSchema = new mongoose.Schema({
  customer: {
    type: rentalCustomer,
    required: true
  },
  movie: {
    type: rentalMovie,
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    min: 0
  }
});

module.exports.Rental = mongoose.model("Rental", rentalSchema);

module.exports.validate = rental => {
  /**
   * for more info about schema validation, visit:
   * https://www.npmjs.com/package/joi
   */
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
};
