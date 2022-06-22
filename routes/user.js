// Init
const router = require("express").Router();
const { userLogin, userRegister } = require("../controllers/user.js");

//user register
router.post("/userRegister", userRegister);
// user login
router.post("/userLogin", userLogin);

// Export
module.exports = router;
