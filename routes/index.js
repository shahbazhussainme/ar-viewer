// Init
const router = require("express").Router();

// All Routes

router.use("/customers", require("./customer"));
router.use("/models", require("./model"));

// Export
module.exports = router;
