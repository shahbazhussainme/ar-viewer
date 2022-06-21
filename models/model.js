const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const STRINGS = require("../utils/texts");

const modelSchema = new Schema(
  {
    uniqueId: String,
    models_url: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(STRINGS.MODALS.MODEL, modelSchema);
