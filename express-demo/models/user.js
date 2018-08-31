const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity"); // use later
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean,
  // roles: [],
  // operations: []
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

module.exports.User = mongoose.model("User", userSchema);

module.exports.validate = user => {
  /**
   * for more info about schema validation, visit:
   * https://www.npmjs.com/package/joi
   */
  const name = Joi.string()
    .min(5)
    .max(50)
    .trim()
    .regex(/^[\sa-zA-Z0-9]{5,30}$/)
    .required();
  const email = Joi.string()
    .min(5)
    .max(255)
    .email()
    .trim()
    .required();
  const password = Joi.string()
    .trim()
    .min(2)
    .max(255)
    .required();
  const confirmPassword = Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .options({
      language: {
        any: {
          allowOnly: "!!Passwords do not match"
        }
      }
    });
  const schema = Joi.object().keys({ name, email, password, confirmPassword });
  return Joi.validate(user, schema);
};

module.exports.validateLogin = user => {
  const email = Joi.string()
    .min(5)
    .max(255)
    .email()
    .trim()
    .required();
  const password = Joi.string()
    .trim()
    .min(2)
    .max(255)
    .required();
  const schema = Joi.object().keys({ email, password });
  return Joi.validate(user, schema);
};

module.exports.validatePassword = password => {
  const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1, // numbers
    symbol: 1, // special characters
    requirementCount: 3
  };

  const goodPass = Joi.validate(
    password,
    new PasswordComplexity(complexityOptions)
  );
  return goodPass;
};
