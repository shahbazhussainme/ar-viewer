// Init
const router = require("express").Router();
const {
  createCustomer,
  updateCustomer,
  getSingleCustomer,
  getAllCustomers,
  deleteCustomer,
} = require("../controllers/customer.js");
const {
  customerValidator,
  updateCustomerValidator,
  isValidated,
} = require("../middleware/validators");

// create Customer
router.post("/", customerValidator, isValidated, createCustomer);
// update Customer
router.patch("/:id", updateCustomerValidator, isValidated, updateCustomer);
// get single Customer
router.get("/:id", getSingleCustomer);
// get All Customers By User
router.get("/", getAllCustomers);
// delete Customer By User
router.delete("/:id", deleteCustomer);
// Export
module.exports = router;
