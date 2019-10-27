const express = require("express");
const router = express.Router();

// @route   GET api/userinfo/test
// @descrip Tests userinfo route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "User Info works" }));

module.exports = router;
