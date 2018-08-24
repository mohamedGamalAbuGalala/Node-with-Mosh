var express = require("express");
var router = express.Router();
const {Customer,validate} = require('../models/customer');

/* GET customers listing. */
router.get("/", async (req, res, next) => {
  // getting customers
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res, next) => {
  // getting single customer
  const customer = await Customer.findById(req.params.id);
  // check existence
  if (!customer)
    return res.status(404).send(`The customer with the given ID wasn't found`);
  res.send(customer);
});

router.post("/", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(
      error.details.reduce((ret, el) => {
        ret.push({
          message: el.message.replace(/\"/g, ``),
          context: el.context.key
        });
        return ret;
      }, [])
    );

  // Adding
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  // validate
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(
      error.details.reduce((ret, el) => {
        ret.push({
          message: el.message.replace(/\"/g, ``),
          context: el.context.key
        });
        return ret;
      }, [])
    );

  // update routine
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    },
    { new: true }
  );
  // check existence
  if (!customer)
    return res.status(404).send(`The customer with the given ID wasn't found`);
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  // check existence
  if (!customer)
    return res.status(404).send(`The customer with the given ID wasn't found`);

  res.send(customer);
});

module.exports = router;

