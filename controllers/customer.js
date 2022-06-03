const STRINGS = require("../utils/texts");
const Customer = require("../models/customer");
const Model = require("../models/model");

const { v4: uuidv4 } = require("uuid");
// **********************
//create Customer

exports.createCustomer = async (req, res) => {
  try {
    let body = req.body;
    //check if customer email exists
    let customerExist = await Customer.findOne({ email: body.email });
    if (customerExist) {
      return res.status(403).json({ message: STRINGS.ERRORS.CustomerExists });
    }
    //generating uuid , a random string
    let uniqueId = uuidv4();
    //
    body.uniqueId = uniqueId;
    //create new Customer
    let customer = await Customer.create(body);
    res.status(200).json({ message: STRINGS.TEXTS.CustomerCreated, customer });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};
//update createCustomer

exports.updateCustomer = async (req, res) => {
  try {
    //params customer id
    let customerId = req.params.id;
    const { first_name, last_name, email } = req.body;
    // Check if Customer exist
    let customerExist = await Customer.findOne({ _id: customerId });
    if (!customerExist)
      return res.status(400).send({ message: STRINGS.ERRORS.CustomerNotFound });
    //update Customer
    let customer = await Customer.findOneAndUpdate(
      {
        _id: customerId,
      },
      {
        $set: {
          first_name: first_name,
          last_name: last_name,
          email: email,
        },
      },
      {
        new: true,
      }
    );
    res.json({ message: STRINGS.TEXTS.CustomerUpdated, customer });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};

//get single Customer

exports.getSingleCustomer = async (req, res) => {
  try {
    //params customer id
    let customerId = req.params.id;
    // Check if Customer exist
    let customer = await Customer.findOne({ _id: customerId });
    if (!customer)
      return res.status(400).send({ message: STRINGS.ERRORS.CustomerNotFound });

    return res.json({ customer });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};

//get all Customers

exports.getAllCustomers = async (req, res) => {
  try {
    //find all customers
    let customers = await Customer.find();
    return res.json({ customers });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};
//delete single Customer

exports.deleteCustomer = async (req, res) => {
  try {
    //params customer id
    let customerId = req.params.id;
    // Check if Customer exist
    let customerExist = await Customer.findOne({ _id: customerId });
    if (!customerExist)
      return res.status(400).send({ message: STRINGS.ERRORS.CustomerNotFound });
    //remove Customer
    await Model.deleteMany({
      customer_email: customerExist.email,
    });
    await Customer.findByIdAndRemove({ _id: customerId });
    return res.json({ message: STRINGS.TEXTS.CustomerDeleted });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};
