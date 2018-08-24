const Joi = require("joi");

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: { type: Boolean, default: false },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

module.exports.Customer = mongoose.model("Customer", customerSchema);

module.exports.validate = customer => {
  /**
   * for more info about schema validation, visit:
   * https://www.npmjs.com/package/joi
   */
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),

    phone: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
};
