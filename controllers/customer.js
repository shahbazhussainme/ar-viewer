const STRINGS = require("../utils/texts");
const Customer = require("../models/customer");
const Model = require("../models/model");
const fs = require("fs");
const path = require("path");

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
    let customer = await Customer.findOne({ _id: customerId }).populate(
      "models"
    );
    if (!customer)
      return res.status(400).send({ message: STRINGS.ERRORS.CustomerNotFound });

    return res.json({ customer });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};

//get uniqueId Exists

exports.getUniqueId = async (req, res) => {
  try {
    //params customer id
    let uniqueId = req.params.id;
    // Check if Customer exist
    let customer = await Customer.findOne({ uniqueId: uniqueId }).populate(
      "models"
    );
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
//get all model for customer

exports.getAllModelByCustomer = async (req, res) => {
  try {
    let { uniqueId } = req.body;
    //find all model by
    let model = await Model.findOne({ uniqueId: uniqueId });
    return res.json({ model });
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
    let pathname = path.resolve("./");
    const directoryPath = path.join(
      pathname,
      `/uploads/${customerExist.uniqueId}`
    );

    fs.rmdirSync(
      directoryPath,
      { recursive: true },

      () => {
        console.log("Folder Deleted!");
      }
    );

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
//get all Models for customer

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
//upload models for specific customer

exports.uploadModels = async (req, res) => {
  try {
    const files = req.files;
    let models_url = [];
    files &&
      files.map((file) => {
        let url = process.env.BASE_URL + "/" + file.path;
        models_url.push(url);
      });
    let { id: uniqueId } = req.params;
    //check if customer email exists
    let customerExist = await Customer.findOne({ uniqueId: `${uniqueId}` });
    if (!customerExist) {
      return res.status(403).json({ message: STRINGS.ERRORS.CustomerNotFound });
    }
    // model exist
    let modelExist = await Model.findOne({ uniqueId: `${uniqueId}` });
    if (modelExist) {
      let _id = modelExist._id;
      let existModelUrls = modelExist.model_url;
      let newModelUrls = [];
      if (existModelUrls) {
        newModelUrls = [existModelUrls, ...models_url];
      } else {
        newModelUrls = models_url;
      }
      await Model.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          $set: {
            models_url: newModelUrls,
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).send({ message: "File Uploaded Successfully" });
    }
    //create new Model
    let model = await Model.create({
      uniqueId: uniqueId,
      models_url: models_url,
    });
    //one customer has many models
    await Customer.findOneAndUpdate(
      {
        uniqueId: uniqueId,
      },
      {
        $push: {
          models: model._id,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send({ message: "File Uploaded Successfully" });
  } catch (error) {
    console.log("Error--->iii", error);

    res.status(500).json({ message: error.message });
  }
};
//delete single model

exports.deleteModel = async (req, res) => {
  try {
    //params customer id
    let { model_url, uniqueId } = req.body;
    // Check if Model exist
    let modelExist = await Model.findOne({
      uniqueId: uniqueId,
    });

    if (!modelExist)
      return res.status(400).send({ message: STRINGS.ERRORS.ModelNotFound });
    let modelP = model_url.split(`${process.env.BASE_URL}/`)[1];
    let pathname = path.resolve("./");
    const directoryPath = path.join(pathname, `/uploads/${modelP}`);

    fs.unlinkSync(
      directoryPath,
      { recursive: true },

      () => {
        console.log("Folder Deleted!");
      }
    );
    let models_url = modelExist.models_url.filter(
      (model) => model !== model_url
    );
    let modelId = modelExist._id;
    //remove model url
    await Model.findOneAndUpdate(
      {
        _id: modelId,
      },
      {
        $set: {
          models_url: models_url,
        },
      },
      {
        new: true,
      }
    );
    // await Customer.findByIdAndRemove({ _id: uniqueId });
    return res.json({ message: STRINGS.TEXTS.ModelDeleted });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};
