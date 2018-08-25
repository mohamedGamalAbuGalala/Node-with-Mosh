const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  numberInStock: {
    type: Number,
    required: true,
    get: v => Math.round(v),
    set: v => Math.round(v),
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    get: v => Math.round(v),
    set: v => Math.round(v),
    min: 0,
    max: 255
  },
  genre: { type: genreSchema, required: true }
});

module.exports.Movie = mongoose.model("Movie", movieSchema);

module.exports.validate = movie => {
  /**
   * for more info about schema validation, visit:
   * https://www.npmjs.com/package/joi
   */
  const schema = {
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    numberInStock: Joi.number()
      .min(0)
      .max(255)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(255)
      .required(),
    genreId: Joi.objectId().required()
  };
  return Joi.validate(movie, schema);
};
