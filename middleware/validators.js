// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

// customer Validation
exports.customerValidator = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
];
// update customer Validation
exports.updateCustomerValidator = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("first_name", "First Name is required.").notEmpty(),
  check("last_name", "First Name is required.").notEmpty(),
];
// model Validation

exports.modelValidator = [
  check("customer_email", "customer_email is required.").notEmpty().trim(),
];
// update customer Validation
exports.updateModelValidator = [
  check("url", "url is required.").notEmpty().trim(),
];
/*
======================
Result
======================
*/
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = errors.array()[0].msg;
    res.status(400).send({ message: message });
  } else {
    next();
  }
};
