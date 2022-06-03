// Init
const router = require("express").Router();
const {
  createModel,
  updateModel,
  getSingleModel,
  getAllModels,
  deleteModel,
} = require("../controllers/model.js");
const {
  modelValidator,
  updateModelValidator,
  isValidated,
} = require("../middleware/validators");

// create Model
router.post("/", modelValidator, isValidated, createModel);
// update Model
router.patch("/:id", updateModelValidator, isValidated, updateModel);
// get single Model
router.get("/:id", getSingleModel);
// get All Models By User
router.get("/", getAllModels);
// delete Model By User
router.delete("/:id", deleteModel);
// Export
module.exports = router;
