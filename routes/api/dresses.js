const express = require("express");
const router = express.Router();
const multer = require("multer");

// const upload = multer({ dest: "dressuploads/" }).single("dresspicparse");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./dressuploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //accept on certain types of files

  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 },
  fileFilter: fileFilter
}).single("dresspicparse");

//Load Dress Model
const { Dress, ValidateDress } = require("../../models/Dress");

// @route   GET api/dresses/test
// @descrip Tests dresses route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Dresses works" }));

// @route   GET api/dresses/get
// @descrip fetches all the dresses
// @access  Public
router.get("/get", async (req, res) => {
  await Dress.find({})
    .then(dresses => res.send(dresses))
    .catch(err => res.send({ errormessage: err }));
});

// @route   POST api/dresses/post
// @descrip end point for posting dresses
// @access  Public
router.post("/post", upload, async (req, res) => {
  const { error } = ValidateDress(req.body);

  if (error) {
    // console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  let dress = new Dress({
    name: req.body.name,
    price: req.body.price,
    cover_photo: req.file.path,
    type: req.body.type,
    cover_color: req.body.cover_color,
    brand: req.body.brand,
    discount: req.body.discount,
    tag: req.body.tag
  });

  dress
    .save()
    .then(dress => {
      res.send(dress);
    })
    .catch(error => res.send(error));
});

module.exports = router;
