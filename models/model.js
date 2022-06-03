const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const STRINGS = require("../utils/texts");

const modelSchema = new Schema(
  {
    customer_email: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(STRINGS.MODALS.MODEL, modelSchema);
