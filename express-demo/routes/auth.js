const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { User, validateLogin } = require("../models/user");
const { getErrorMessages } = require("../utilities/ErrorHandlers/utility");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  // getting users
  const users = await User.find().sort("name");
  res.send(users);
});

router.get("/:id", async (req, res, next) => {
  // getting single user
  const user = await User.findById(req.params.id);
  // check existence
  if (!user)
    return res.status(404).send(`The user with the given ID wasn't found`);
  res.send(user);
});

// login users
router.post("/", async (req, res) => {
  // validateLogin
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(getErrorMessages(error));

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.send(token);
});

router.put("/:id", async (req, res) => {
  // validateLogin
  const { error } = validateLogin(req.body);
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
