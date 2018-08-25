
const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});
module.exports.genreSchema = genreSchema;

module.exports.Genre = mongoose.model("Genre", genreSchema);


module.exports.validate = genre => {
    /**
     * for more info about schema validation, visit:
     * https://www.npmjs.com/package/joi
     */
    const schema = {
      name: Joi.string()
        .min(5)
        .max(50)
        .required()
    };
    return Joi.validate(genre, schema);
  };
  