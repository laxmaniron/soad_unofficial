const express = require("express");
const router = express.Router();

// @route   GET api/dresses/test
// @descrip Tests dresses route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Dresses works" }));

module.exports = router;
