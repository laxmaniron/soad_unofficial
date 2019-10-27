const express = require("express");
const mongoose = require("mongoose");

const app = express();

const userinfo = require("./routes/api/userinfo");
const auth = require("./routes/api/auth");
const dresses = require("./routes/api/dresses");

//DB config

//Connect to MongoDB
mongoose.set("useFindAndModify", false);

mongoose
  .connect("mongodb://localhost:27017/fashion", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) // only in development environment
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB....", err));

app.get("/", (req, res) => res.send("Hello I am starting !!"));

// Use Routes
app.use("/api/userinfo", userinfo);
app.use("/api/auth", auth);
app.use("/api/dresses", dresses);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));
