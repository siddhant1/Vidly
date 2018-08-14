const router = require("express").Router();
const { validateCustomer, Customer } = require("../models/customer");

//! ********************GET CODE BLOCK******************

//? ALL customers
router.get("/", async (req, res) => {
  //Returns all the customers
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});

//? Required customer

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404).send("the customer with the given is is not found");
    return;
  }
  res.send(customer);
});

//! **************POST CODE BLOCK ********************

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();
  res.send(customer);
});
//! **************PUT CODE BLOCK ********************4
router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
      }
    },
    { new: true }
  );
  if (!customer) {
    res.status(404).send("The Customer with the given id is not found");
    return;
  }
  res.send(customer);
});
//! **************Delete CODE BLOCK ********************

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) {
    res.status(404).send("The customer with the given id is not found");
    return;
  }
  res.send(customer);
});
module.exports = router;
