const express = require('express');
const router=express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fetchUser = require('../Middleware/FetchUser');
const User = require('../Schema/User');
const Wishlist = require('../Schema/Wishlist');
const Product = require('../Schema/Product');
const Contribution=require('../Schema/Contribution');




router.post('/createuser', async (req, res) => {
  try {
       console.log('req.body',req);
    const { name, birthday, email } = req.body;
 
    if(!name ||!birthday ){
        res.status(400).json({message:"please fill all fileds"})
    }
    
    const user = new User({ name, birthday, email });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret');
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




router.post('/wishlists', fetchUser, async (req, res) => {
  try {
    const { eventDate } = req.body;
    const wishlist = new Wishlist({
      user: req.user._id,
      eventDate
    });
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/wishlists', fetchUser, async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ user: req.user._id });
    res.json(wishlists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/products', fetchUser, async (req, res) => {
  try {
    const { name, description, price, link } = req.body;
    const product = new Product({ name, description, price, link });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/products', fetchUser, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/contributions', fetchUser, async (req, res) => {
  try {
    const { wishlistId, productId } = req.body;
    const contribution = new Contribution({
      wishlist: wishlistId,
      product: productId,
      contributor: req.user._id
    });
    await contribution.save();
    res.status(201).json(contribution);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/wishlists/:wishlistId/cotribnutions', fetchUser, async (req, res) => {
  try {
    const contributions = await Contribution.find({ wishlist: req.params.wishlistId })
      .populate('product')
      .populate('contributor', 'name');
    res.json(contributions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports=router;