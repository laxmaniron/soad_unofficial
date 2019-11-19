const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const Joi = require("@hapi/joi");

const app = express();

const userinfo = require("./routes/api/userinfo");
const auth = require("./routes/api/auth");
const dresses = require("./routes/api/dresses");
const vendorportal = require("./routes/api/vendorportal");
const designerportal = require("./routes/api/designerportal");

const wishlist = require("./routes/api/wishlist");
const cart = require("./routes/api/cart");

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//file upload static
app.use(express.static("uploads"));
app.use(express.static("dressuploads"));
// app.use(express.static("vendoruploads"));

//DB config

//Connect to MongoDB
mongoose.set("useFindAndModify", false);

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/fashion", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) // only in development environment
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB....", err));

// Use Routes
app.use("/api/userinfo", userinfo);
app.use("/api/auth", auth);
app.use("/api/dresses", dresses);
app.use("/api/vendorportal", vendorportal);
app.use("/api/cart", cart);
app.use("/api/wishlist", wishlist);
app.use("/api/designerportal", designerportal);

//wishlist and cart

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));
