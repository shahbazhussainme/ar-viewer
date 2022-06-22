// Init
const router = require("express").Router();

// All Routes

router.use("/customers", require("./customer"));
router.use("/users", require("./user"));

// Export
module.exports = router;
