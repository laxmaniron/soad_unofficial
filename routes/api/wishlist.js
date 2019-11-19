const Joi = require("@hapi/joi");
const _ = require("lodash");
const { Wishlist } = require("../../models/Wishlist");
const { Cart } = require("../../models/Cart");
const { Dress } = require("../../models/Dress");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/addtowishlist", async (req, res) => {
  console.log(req.body);
  let wishlist = new Wishlist({
    dressId: req.body.dressId,
    userId: req.body.userId
  });

  const worker = await wishlist.save();
  res.send(worker);
});

router.get("/showwishlist", async (req, res) => {
  let userid = req.query.userid;

  userid = mongoose.Types.ObjectId(userid);

  const wishlistItems = await Wishlist.find({ userId: userid });

  dresses = [];

  for (var i = 0; i < wishlistItems.length; i++) {
    let dress;
    dress = await Dress.findOne({ _id: wishlistItems[i].dressId });
    dresses.push({ wishlistid: wishlistItems[i]._id, dress: dress });
  }
  res.send(dresses);
});

router.post("/movetocart", async (req, res) => {
  let wishlistid = req.body.wishlistid;

  wishlistid = mongoose.Types.ObjectId(wishlistid);

  const wishlistItems = await Wishlist.findOne({ _id: wishlistid });

  let cart = new Cart({
    dressId: wishlistItems.dressId,
    userId: wishlistItems.userId
  });

  const final_cart = await cart.save();

  await Wishlist.remove({ _id: wishlistid });
  res.send(final_cart);
});

router.post("/deletefromwishlist", async (req, res) => {
  let wishlistid = req.body.wishlistid;

  wishlistid = mongoose.Types.ObjectId(wishlistid);

  console.log(wishlistid);

  deletedelement = await Wishlist.remove({ _id: wishlistid });
  console.log(deletedelement);
  res.send(deletedelement);
});

module.exports = router;
