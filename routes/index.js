// Init
const router = require("express").Router();

// All Routes

router.use("/customers", require("./customer"));

// Export
module.exports = router;
