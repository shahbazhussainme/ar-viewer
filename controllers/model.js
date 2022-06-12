const STRINGS = require("../utils/texts");
const Model = require("../models/model");
const Customer = require("../models/customer");

const { v4: uuidv4 } = require("uuid");
// **********************
//create Model

exports.createModel = async (req, res) => {
  try {
    let body = req.body;
    //check if customer email exists
    let customerExist = await Customer.findOne({ email: body.customer_email });
    if (!customerExist) {
      return res.status(403).json({ message: STRINGS.ERRORS.CustomerNotFound });
    }

    //create new Model
    let model = await Model.create(body);
    //one customer has many models
    await Customer.findOneAndUpdate(
      {
        email: body.customer_email,
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
    res.status(200).json({ message: STRINGS.TEXTS.ModelCreated, model });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};
//update createModel

exports.updateModel = async (req, res) => {
  try {
    //params Model id
    let modelId = req.params.id;
    const { url } = req.body;
    // Check if Model exist
    let modelExist = await Model.findOne({ _id: modelId });
    if (!modelExist)
      return res.status(400).send({ message: STRINGS.ERRORS.ModelNotFound });
    //update Model
    let model = await Model.findOneAndUpdate(
      {
        _id: modelId,
      },
      {
        $set: { url: url },
      },
      {
        new: true,
      }
    );
    res.json({ message: STRINGS.TEXTS.ModelUpdated, model });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};

//get single Model

exports.getSingleModel = async (req, res) => {
  try {
    //params Model id
    let modelId = req.params.id;
    // Check if Model exist
    let model = await Model.findOne({ _id: modelId });
    if (!model)
      return res.status(400).send({ message: STRINGS.ERRORS.ModelNotFound });

    return res.json({ model });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};

//get all Models

exports.getAllModels = async (req, res) => {
  try {
    //find all Models
    let models = await Model.find();
    return res.json({ models });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};
//delete single Model

exports.deleteModel = async (req, res) => {
  try {
    //params Model id
    let modelId = req.params.id;
    // Check if Model exist
    let modelExist = await Model.findOne({ _id: modelId });
    if (!modelExist)
      return res.status(400).send({ message: STRINGS.ERRORS.ModelNotFound });
    //remove model from customer
    await Customer.findOneAndUpdate(
      {
        email: modelExist.customer_email,
      },
      {
        $pull: {
          models: modelExist._id,
        },
      },
      {
        new: true,
      }
    );
    //remove Model
    await Model.findByIdAndRemove({ _id: modelId });
    return res.json({ message: STRINGS.TEXTS.ModelDeleted });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};
//upload models for specific customer

exports.uploadModels = async (req, res) => {
  try {
    res.status(200).send({ message: "File Uploaded Successfully" });
  } catch (error) {
    console.log("Error--->", error.message);

    res.status(500).json({ message: error.message });
  }
};
