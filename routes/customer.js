// Init
const router = require("express").Router();
const {
  createCustomer,
  updateCustomer,
  getSingleCustomer,
  getAllCustomers,
  deleteCustomer,
  getUniqueId,
  uploadModels,
  getAllModelByCustomer,
} = require("../controllers/customer.js");
const {
  customerValidator,
  updateCustomerValidator,
  isValidated,
} = require("../middleware/validators");
const upload = require("../middleware/multer.js");

// create Customer
router.post("/", customerValidator, isValidated, createCustomer);
// update Customer
router.put("/:id", updateCustomerValidator, isValidated, updateCustomer);
// get single Customer
router.get("/:id", getSingleCustomer);
// check unique id exist
router.get("/uniqueId/:id", getUniqueId);

// get All Customers By User
router.get("/", getAllCustomers);
// delete Customer By User
router.delete("/:id", deleteCustomer);
//upload models for specific customer
router.post("/uploadModel/:id", upload("/", "models", "array"), uploadModels);
//get all model for customer
router.post("/getModel", getAllModelByCustomer);

// Export
module.exports = router;
