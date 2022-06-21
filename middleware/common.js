// Init
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// Common Middleware
module.exports = (app) => {
  app.use(cors());
  app.use(logger("dev"));
  app.use(express.json({ limit: "50mb" }));
  app.use(
    express.urlencoded({
      limit: "50mb",
      extended: true,
    })
  );
  app.use("/uploads", express.static("uploads", { maxAge: "31536000" }));
};
