const _ = require("lodash");
const express = require("express");
const router = express.Router();
var bcrypt = require("bcrypt");

const { auth } = require("../middleware/auth");
const { User, validate, validatePassword } = require("../models/user");
const { getErrorMessages } = require("../utilities/ErrorHandlers/utility");

router.get("/me", auth, async (req, res, next) => {
  // getting single user
  const user = await User.findById(req.user._id).select("-password");
  // check existence
  if (!user)
    return res.status(404).send(`The user with the given ID wasn't found`);
  res.send(user);
});

// register new users
router.post("/", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(getErrorMessages(error));

  const errorG = goodPassword(req);
  if (errorG) return res.status(400).send(getErrorMessages(errorG));

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist.");

  // Adding
  user = new User(_.pick(req.body, "name", "email", "password"));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, "_id", "name", "email"));
});

router.put("/:id", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(getErrorMessages(error));

  // update routine
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    },
    { new: true }
  );
  // check existence
  if (!user)
    return res.status(404).send(`The user with the given ID wasn't found`);
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  // check existence
  if (!user)
    return res.status(404).send(`The user with the given ID wasn't found`);

  res.send(user);
});

module.exports = router;
function goodPassword(req) {
  const { error } = validatePassword(req.body.password);
  return error;
}
